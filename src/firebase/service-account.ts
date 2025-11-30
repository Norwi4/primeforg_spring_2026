// This file is gitignored. You can obtain the service account key from the
// Firebase console.

/**
 * Returns the service account object.
 * This function reads from process.env at runtime, ensuring that the variables
 * are available in the serverless function environment.
 */
export function getServiceAccount() {
  const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    // This MUST be read from process.env to correctly handle newline characters.
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": "googleapis.com",
  } as const;

  if (!serviceAccount.project_id) {
    console.warn("\n\n⚠️  WARNING: Firebase Admin project ID is not set. Please set FIREBASE_PROJECT_ID in your environment variables.  ⚠️\n\n");
    throw new Error('Firebase service account "project_id" is not defined in environment variables.');
  }
   if (!serviceAccount.private_key) {
    console.warn("\n\n⚠️  WARNING: Firebase Admin private key is not set. Please set FIREBASE_PRIVATE_KEY in your environment variables.  ⚠️\n\n");
    throw new Error('Firebase service account "private_key" is not defined in environment variables.');
  }


  return serviceAccount;
}
