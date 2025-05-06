"use strict";
//  import { auth, firestore } from "./firebase";
//  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('iniciado');
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        const emailInput = document.getElementById('emailInput');
        const passwordInput = document.getElementById('passwordInput');
        //const user;
        if (emailInput && passwordInput) {
            const email = emailInput.value;
            const password = passwordInput.value;
            //console.log(email+"///"+password);
            try {
                //await signInWithEmailAndPassword(auth, email, password);
                console.log("usuário logado com sucesso");
            }
            catch (error) {
                console.log("falha ao logar: " + error);
            }
        }
    });
}
