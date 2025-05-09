"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.firestore = exports.auth = void 0;
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGmlk65hzEOTygeaeqQJcD56XXQ074pRY",
    authDomain: "reacttest-ac3fe.firebaseapp.com",
    projectId: "reacttest-ac3fe",
    storageBucket: "reacttest-ac3fe.firebasestorage.app",
    messagingSenderId: "391176630566",
    appId: "1:391176630566:web:73123de035a39736d8d1e7",
    measurementId: "G-GD1MWYJLRG"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
exports.auth = (0, auth_1.getAuth)();
exports.firestore = (0, firestore_1.getFirestore)();
exports.storage = (0, storage_1.getStorage)();
exports.default = app;
