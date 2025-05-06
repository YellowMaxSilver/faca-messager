import { error } from 'console';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import admin from 'firebase-admin'

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'public')));
app.use(cors());

app.get('/:page',(req,res)=>{
    const page = req.params.page;
    if(page == null || page == ''){
        res.sendFile(path.join(__dirname,'/public/index.html'),(error)=>{
            res.send("page not found");
        })
    }else{
        res.sendFile(path.join(__dirname,`/public/${page}.html`),(error)=>{
            res.send("page not found")
        })
    }
})

app.post('/api/signIn',(req,res)=>{
    //res.json({message:"everything ok"});
})

app.listen(port,()=>{
    console.log(`Server running in the port ${port}`);
})