"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const reacttest_ac3fe_firebase_adminsdk_fbsvc_0c6e87c5da_json_1 = __importDefault(require("./reacttest-ac3fe-firebase-adminsdk-fbsvc-0c6e87c5da.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(reacttest_ac3fe_firebase_adminsdk_fbsvc_0c6e87c5da_json_1.default),
});
exports.default = firebase_admin_1.default;
const db = firebase_admin_1.default.firestore();
exports.db = db;
