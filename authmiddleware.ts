import { RequestHandler } from "express";
import admin from "./firebase";
import { Messaging } from "firebase-admin/lib/messaging/messaging";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const verifyFireToken:RequestHandler = async(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({message:"Token not found"});
        return;
    }

    const token = authHeader.split('Bearer ')[1];

    try{
        const decodedToken:DecodedIdToken = await admin.auth().verifyIdToken(token);
        req.body["idToken"] = token;
        next()
    }catch(error){
        res.status(401).json({message:"unknow token"})
    }
}

export default verifyFireToken;