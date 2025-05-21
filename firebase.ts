import admin from 'firebase-admin';
import ServiceAccount from './reacttest-ac3fe-firebase-adminsdk-fbsvc-0c6e87c5da.json';

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
});

export default admin;

const db = admin.firestore();
export { db };