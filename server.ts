import { error } from 'console';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import verifyFireToken from './authmiddleware';
import admin, { db } from './firebase'
import fs from 'fs'

import { createServer as createViteServer } from 'vite';
import { messaging } from 'firebase-admin';

//import cookieParse from 'cookie-parser';

const isProd = process.env.NODE_ENV === 'production';


async function createServer(){
    const app = express();
    const port = 5000;
    const cookieParse = require('cookie-parser');

    app.use(cookieParse());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, './dist')));

    const vite = await createViteServer({
        server: {middlewareMode: true},
        root: path.resolve(__dirname,'./client'),
        appType: 'custom'
    });

    app.get('',async (req,res)=>{
        const url = req.originalUrl;
        try{
            const templatePath = path.resolve(__dirname,'./client/index.html');
            let template = fs.readFileSync(templatePath, 'utf-8');

            template = await vite.transformIndexHtml(url, template);

            res.status(200).set({ 'Content-Type':'text/html'}).end(template);
        }catch(e){
            res.send('not found')
        }
    })

    app.get('/:page',async (req,res)=>{
        const page = req.params.page;
        const url = req.originalUrl;
        try{
            const templatePath = path.resolve(__dirname,`./client/pages/${page}.html`);
            let template = fs.readFileSync(templatePath, 'utf-8');

            template = await vite.transformIndexHtml(url, template);

            res.status(200).set({ 'Content-Type':'text/html'}).end(template);
        }catch(e){
            res.send('not found')
        }
    })

    app.post('/api/signIn',verifyFireToken,async (req,res)=>{
        const token = req.body["idToken"];

        const expiresIn = 60*60*24*1000;

        try{
            const sessionCookie = await admin.auth().createSessionCookie(token,{ expiresIn });

            res.cookie('session',sessionCookie, {
                maxAge: expiresIn,
                httpOnly: true,
                secure:false,
                sameSite: 'strict'
            });

            res.status(200).json({message:`login sucesciful`});
        }catch(erro){
            console.error("Error to create Cookie");
            res.status(401).json({message:"Unathorized"});
        }

    })

    app.post('/api/readCookie',async (req,res)=>{
        try{
            const sessionCookie = req.cookies.session;
            const decodedClains = await admin.auth().verifySessionCookie(sessionCookie, true);
            res.status(200).json({message:decodedClains.uid});
        }catch(error){
            res.status(401).json({message:null});
        }
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

    app.use(vite.middlewares);

    app.listen(port,()=>{
    console.log(`Server running in the port ${port}`);
    })

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