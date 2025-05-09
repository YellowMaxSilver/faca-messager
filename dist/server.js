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
const cors_1 = __importDefault(require("cors"));
const authmiddleware_1 = __importDefault(require("./authmiddleware"));
const firebase_1 = __importStar(require("./firebase"));
const app = (0, express_1.default)();
const port = 5000;
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//app.use(express.static(path.join(__dirname,'public')));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/:page', (req, res) => {
    const page = req.params.page;
});
app.post('/api/signIn', authmiddleware_1.default, (req, res) => {
    const token = req.body["idToken"];
    res.status(200).json({ message: `login sucesciful${token}` });
});
app.post('/api/signUp', authmiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.listen(port, () => {
    console.log(`Server running in the port ${port}`);
});
/*app.get('/usuarios', async (req, res) => {
    try {
      const snapshot = await db.collection('usuarios').get();
      const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
  });*/ 
