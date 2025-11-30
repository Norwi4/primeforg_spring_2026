// This file is gitignored. You can obtain the service account key from the
// Firebase console.

/**
 * Returns the service account object.
 * This function reads from process.env at runtime, ensuring that the variables
 * are available in the serverless function environment.
 */
export function getServiceAccount() {
  const serviceAccount = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN,
  } as const;

  if (!serviceAccount.project_id) {
    throw new Error('Firebase service account "project_id" is not defined in environment variables.');
  }

  return serviceAccount;
}
