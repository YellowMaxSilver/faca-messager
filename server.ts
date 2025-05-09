import { error } from 'console';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import verifyFireToken from './authmiddleware';
import admin, { db } from './firebase'

const app = express();
const port = 5000;

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(express.json());

app.get('/:page',(req,res)=>{
    const page = req.params.page;
})

app.post('/api/signIn',verifyFireToken,(req,res)=>{
    const token = req.body["idToken"];
    res.status(200).json({message:`login sucesciful${token}`});
})

app.post('/api/signUp',verifyFireToken,async (req,res)=>{
    const token = req.body["idToken"];
    
    try{
        const {name, email, password, description} = req.body;
        const user = await admin.auth().getUserByEmail(email);
        const uid= await user.uid;

        const docRef = await db.collection('usersInfo').add({ description, email, name, uid})
        res.status(200).json({message:`suces to create account ${token} && the firestore: ${docRef.id}`});
    }catch(error){
        res.status(500).json({message:`error to create user: ${error}`});
    }
});

app.listen(port,()=>{
    console.log(`Server running in the port ${port}`);
})

/*app.get('/usuarios', async (req, res) => {
    try {
      const snapshot = await db.collection('usuarios').get();
      const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
  });*/