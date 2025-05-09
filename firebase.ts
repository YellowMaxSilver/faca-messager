import admin from 'firebase-admin';
import ServiceAccount from './reacttest-ac3fe-firebase-adminsdk-fbsvc-3c5185b495.json';

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
});

export default admin;

const db = admin.firestore();
export { db };