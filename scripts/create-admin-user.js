#!/usr/bin/env node
/**
 * Create Firebase Auth user using Admin SDK.
 * Loads FIREBASE_* and ADMIN_* from .env.local or .env if present.
 */
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local"), quiet: true });
require("dotenv").config({ path: path.resolve(process.cwd(), ".env"), quiet: true });

/**
 * Used to create the admin user: admin@suganartstudio.in
 *
 * Option A - Credentials from env (recommended):
 *   FIREBASE_CLIENT_EMAIL   = client_email from service account JSON
 *   FIREBASE_PRIVATE_KEY    = private_key from service account JSON (use quotes, \n is ok)
 *   FIREBASE_PROJECT_ID     = project ID (or set NEXT_PUBLIC_FIREBASE_PROJECT_ID)
 *
 * Option B - Credentials from file:
 *   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
 *
 * Run: npm run create-admin-user
 */

const admin = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const DEFAULT_EMAIL = "";
const DEFAULT_PASSWORD = "";
const FIRESTORE_DATABASE_ID = "";
const USERS_COLLECTION = "users";

const email = process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
const password = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

/** Normalize private key from env: ensure PEM has real newlines. */
function normalizePrivateKey(key) {
  if (!key || typeof key !== "string") return key;
  let k = key.trim();
  k = k.replace(/\\n/g, "\n");
  if (!k.includes("\n") && k.includes("-----BEGIN") && k.includes("-----END")) {
    k = k.replace(/-----BEGIN PRIVATE KEY-----/, "-----BEGIN PRIVATE KEY-----\n");
    k = k.replace(/-----END PRIVATE KEY-----/, "\n-----END PRIVATE KEY-----\n");
  }
  return k;
}

function getCredential() {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const rawKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = (
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  )?.trim();

  if (clientEmail && rawKey && projectId) {
    const privateKey = normalizePrivateKey(rawKey);
    return admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    });
  }

  const serviceAccountPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    "./service-account.json";
  const resolvedPath = path.resolve(process.cwd(), serviceAccountPath);
  const serviceAccount = require(resolvedPath);
  return admin.credential.cert(serviceAccount);
}

function main() {
  let app;
  try {
    if (!admin.apps.length) {
      app = admin.initializeApp({
        credential: getCredential(),
      });
    } else {
      app = admin.app();
    }
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      console.error(
        "Service account not found. Either set in env:\n" +
          "  FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID\n" +
          "or set GOOGLE_APPLICATION_CREDENTIALS to the path of your Firebase service account JSON,\n" +
          "or place the file at ./service-account.json\n\n" +
          "Get credentials: Firebase Console → Project settings → Service accounts → Generate new private key"
      );
    } else {
      console.error("Failed to initialize Firebase Admin:", e.message);
    }
    process.exit(1);
  }

  const auth = admin.auth(app);
  const db = getFirestore(app, FIRESTORE_DATABASE_ID);

  function upsertUserProfile(uid, userEmail, role = "admin") {
    const ref = db.collection(USERS_COLLECTION).doc(uid);
    return ref.set(
      {
        email: userEmail,
        role,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  auth
    .createUser({
      email,
      password,
      emailVerified: true,
    })
    .then(async (user) => {
      await upsertUserProfile(user.uid, user.email, "admin");
      console.log("Admin user created successfully:");
      console.log("  UID:  ", user.uid);
      console.log("  Email:", user.email);
      console.log("  Firestore profile: " + FIRESTORE_DATABASE_ID + "/" + USERS_COLLECTION + "/" + user.uid);
      process.exit(0);
    })
    .catch(async (err) => {
      if (err.code === "auth/email-already-exists") {
        const existing = await auth.getUserByEmail(email);
        await upsertUserProfile(existing.uid, existing.email, "admin");
        console.log("User already exists with email:", email);
        console.log("Firestore profile updated: " + FIRESTORE_DATABASE_ID + "/" + USERS_COLLECTION + "/" + existing.uid);
        console.log("You can sign in at /admin/login with this email and password.");
        process.exit(0);
      }
      if (
        err.message &&
        err.message.includes("Credential") &&
        err.message.includes("OAuth2")
      ) {
        console.error("Error creating user:", err.message);
        console.error(
          "\nTip: Check FIREBASE_PRIVATE_KEY in .env.local. It must be the full PEM key.\n" +
            "Use double quotes and literal \\n for newlines, e.g.:\n" +
            '  FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIE...\\n-----END PRIVATE KEY-----\\n"\n' +
            "Or use a JSON file: GOOGLE_APPLICATION_CREDENTIALS=./service-account.json"
        );
        process.exit(1);
      }
      console.error("Error creating user:", err.message);
      process.exit(1);
    });
}

main();
