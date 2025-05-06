import { auth, firestore } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

console.log('iniciado');


async function signIn(email:string, password:string){
    //const user;
    if(email && password){
        console.log(email+"///"+password);
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredentials.user.getIdToken();

            const res = await fetch("http://localhost:5000/api/signIn",{
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type":"appication/json"
                },
                body: JSON.stringify({})
            });

            console.log(token);
            console.log("backend awswers: ",await res.json());
        }catch(error){
            console.log("falha ao logar: "+error);
        }
    }
}

const form = document.getElementById('loginSection') as HTMLFormElement;
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const password = (document.getElementById('passwordInput') as HTMLInputElement).value;

    signIn(email,password);
})