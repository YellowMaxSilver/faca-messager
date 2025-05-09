import { auth} from "./firebase";
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
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email:email,password:password})
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

//signUp

async function signUp(email:string, password:string, name:string, description:string){
    const errorText = document.getElementById('signUpErrorMessage') as HTMLInputElement;

    if(email == '' || password == '' || name == ''){
        errorText.innerText = "attribute null";
        errorText.style = "display:flex;color:red;";
        return;
    }

    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredentials.user.getIdToken();
        const res = await fetch('http://localhost:5000/api/signUp',{
            method:'POST',
            headers: {
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email:email,password:password,name:name,description:description})
        })
        console.log("backend answers:",await res.json());
    }catch(error){
        console.log("error to create an account: "+error);
        errorText.innerText = "error to create account. try again later";
        errorText.style = "display:flex;color:red;";
    }
}

const signUpform = document.getElementById("signUpSection") as HTMLFormElement;
signUpform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email = (document.getElementById('emailInputSignUp') as HTMLInputElement).value;
    const password = (document.getElementById('passwordInputSignUp') as HTMLInputElement).value;
    const name = (document.getElementById('nameInputSignUp') as HTMLInputElement).value;
    const description = (document.getElementById('descriptionInputSignUp') as HTMLInputElement).value;

    signUp(email,password,name,description)
})