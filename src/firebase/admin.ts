import { initializeApp, getApp, getApps, App, cert } from 'firebase-admin/app';
import { serviceAccount } from './service-account';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function getFirebaseAdminApp(): App {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp({
    credential: cert(serviceAccount)
  });
}
