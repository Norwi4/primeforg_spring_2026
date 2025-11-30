import { initializeApp, getApp, getApps, App, cert } from 'firebase-admin/app';
import { serviceAccount } from './service-account';

const appName = 'firebase-admin-app';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function getFirebaseAdminApp(): App {
  if (getApps().some(app => app.name === appName)) {
    return getApp(appName);
  }
  return initializeApp({
    credential: cert(serviceAccount),
    storageBucket: `${serviceAccount.project_id}.appspot.com`
  }, appName);
}
