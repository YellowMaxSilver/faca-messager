"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const authmiddleware_1 = __importDefault(require("./authmiddleware"));
const firebase_1 = __importStar(require("./firebase"));
const fs_1 = __importDefault(require("fs"));
const vite_1 = require("vite");
//import cookieParse from 'cookie-parser';
const isProd = process.env.NODE_ENV === 'production';
function createServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const port = 5000;
        const cookieParse = require('cookie-parser');
        app.use(cookieParse());
        app.use(express_1.default.json());
        app.use(express_1.default.static(path_1.default.join(__dirname, './dist')));
        const vite = yield (0, vite_1.createServer)({
            server: { middlewareMode: true },
            root: path_1.default.resolve(__dirname, './client'),
            appType: 'custom'
        });
        app.get('', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const url = req.originalUrl;
            try {
                const templatePath = path_1.default.resolve(__dirname, './client/index.html');
                let template = fs_1.default.readFileSync(templatePath, 'utf-8');
                template = yield vite.transformIndexHtml(url, template);
                res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
            }
            catch (e) {
                res.send('not found');
            }
        }));
        app.get('/:page', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = req.params.page;
            const url = req.originalUrl;
            try {
                const templatePath = path_1.default.resolve(__dirname, `./client/pages/${page}.html`);
                let template = fs_1.default.readFileSync(templatePath, 'utf-8');
                template = yield vite.transformIndexHtml(url, template);
                res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
            }
            catch (e) {
                res.send('not found');
            }
        }));
        app.post('/api/signIn', authmiddleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.body["idToken"];
            const expiresIn = 60 * 60 * 24 * 1000;
            try {
                const sessionCookie = yield firebase_1.default.auth().createSessionCookie(token, { expiresIn });
                res.cookie('session', sessionCookie, {
                    maxAge: expiresIn,
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict'
                });
                res.status(200).json({ message: `login sucesciful` });
            }
            catch (erro) {
                console.error("Error to create Cookie");
                res.status(401).json({ message: "Unathorized" });
            }
        }));
        app.post('/api/readCookie', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionCookie = req.cookies.session;
                const decodedClains = yield firebase_1.default.auth().verifySessionCookie(sessionCookie, true);
                res.status(200).json({ message: decodedClains.uid });
            }
            catch (error) {
                res.status(401).json({ message: null });
            }
        }));
        app.post('/api/signUp', authmiddleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.body["idToken"];
            try {
                const { name, email, password, description } = req.body;
                const user = yield firebase_1.default.auth().getUserByEmail(email);
                const uid = yield user.uid;
                const docRef = yield firebase_1.db.collection('usersInfo').add({ description, email, name, uid });
                res.status(200).json({ message: `suces to create account ${token} && the firestore: ${docRef.id}` });
            }
            catch (error) {
                res.status(500).json({ message: `error to create user: ${error}` });
            }
        }));
        app.post('/api/searchAboutUser', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId;
            try {
                const userRef = firebase_1.default.firestore().collection('usersInfo');
                const querySnapshot = yield userRef.where('uid', '==', userId).get();
                if (querySnapshot.empty) {
                    res.status(404).json({ message: "error: not found" });
                }
                else {
                    const results = [];
                    querySnapshot.forEach(doc => {
                        results.push(Object.assign({ id: doc.id }, doc.data()));
                    });
                    res.status(200).json({ message: results });
                }
            }
            catch (e) {
                res.status(500).json({ message: "error in the server" });
            }
        }));
        function verifyUserExistence(req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const email = req.body.email;
                try {
                    const userRef = firebase_1.default.firestore().collection('usersInfo');
                    const querySnapshot = yield userRef.where('email', '==', email).get();
                    if (querySnapshot.empty) {
                        res.status(401).json({ message: `user with email ${email} not found.` });
                    }
                    else {
                        const result = [];
                        querySnapshot.forEach(doc => {
                            result.push(Object.assign({ id: doc.id }, doc.data()));
                        });
                        req.body["contactUid"] = result[0].uid;
                        req.body["contactName"] = result[0].name;
                        next();
                    }
                }
                catch (e) {
                    res.status(500).json({ message: "Network error: error to search user" });
                }
            });
        }
        app.post('/api/addContactbyEmail', verifyUserExistence, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ownId = req.body.ownId;
            const email = req.body.email;
            const contactUid = req.body["contactUid"];
            const contactName = req.body["contactName"];
            try {
                const userRef = firebase_1.default.firestore().collection('contacts');
                const querySnapshot = yield userRef.where('MainUid', '==', ownId).get();
                if (querySnapshot.empty) {
                    //nothing found
                    //res.status(500).json({message:`your user were not found`});
                    let MainUid = ownId;
                    let contact = contactUid;
                    const docRef = yield firebase_1.db.collection('contacts').add({ MainUid, [email]: contact });
                    res.status(200).json({ message: `We found the contact id: ${contact}` });
                    //const teste = await db.collection('contacts').doc('1cWXnhtu8wlgSKuHu7ag').update({});
                }
                else {
                    //something found
                    res.status(200).json({ message: `your contact was found...` });
                }
            }
            catch (e) {
                res.status(500).json({ message: "Network Error: error to found you our account" });
            }
        }));
        app.use(vite.middlewares);
        app.listen(port, () => {
            console.log(`Server running in the port ${port}`);
        });
    });
}
createServer();
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//app.use(express.static(path.join(__dirname,'public')));
// app.post('/api/signIn',verifyFireToken,(req,res)=>{
//     const token = req.body["idToken"];
//     res.status(200).json({message:`login sucesciful${token}`});
// })
// app.post('/api/signUp',verifyFireToken,async (req,res)=>{
//     const token = req.body["idToken"];
//     try{
//         const {name, email, password, description} = req.body;
//         const user = await admin.auth().getUserByEmail(email);
//         const uid= await user.uid;
//         const docRef = await db.collection('usersInfo').add({ description, email, name, uid})
//         res.status(200).json({message:`suces to create account ${token} && the firestore: ${docRef.id}`});
//     }catch(error){
//         res.status(500).json({message:`error to create user: ${error}`});
//     }
// });
/*app.get('/usuarios', async (req, res) => {
    try {
      const snapshot = await db.collection('usuarios').get();
      const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
  });*/ 
