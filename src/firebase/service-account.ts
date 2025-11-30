// This file is gitignored. You can obtain the service account key from the
// Firebase console.
import { firebaseConfig } from "./config";

/**
 * Returns the service account object.
 * This function reads from process.env at runtime, ensuring that the variables
 * are available in the serverless function environment.
 */
export function getServiceAccount() {
  const serviceAccount = {
    "type": "service_account",
    "project_id": firebaseConfig.projectId,
    "private_key_id": "YOUR_PRIVATE_KEY_ID_HERE",
    // This MUST be read from process.env to correctly handle newline characters.
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": "YOUR_CLIENT_EMAIL_HERE",
    "client_id": "YOUR_CLIENT_ID_HERE",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "YOUR_CLIENT_X509_CERT_URL_HERE",
    "universe_domain": "googleapis.com",
  } as const;

  if (!serviceAccount.project_id) {
    throw new Error('Firebase service account "project_id" is not defined in environment variables.');
  }
   if (!serviceAccount.private_key) {
    console.warn("\n\n⚠️  WARNING: Firebase Admin private key is not set. Please set FIREBASE_PRIVATE_KEY in your environment variables.  ⚠️\n\n");
    throw new Error('Firebase service account "private_key" is not defined in environment variables.');
  }


  return serviceAccount;
}
