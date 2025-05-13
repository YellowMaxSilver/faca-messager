"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("./firebase");
const auth_1 = require("firebase/auth");
const verifySession_1 = require("./verifySession");
console.log('iniciado');
var userId = await (0, verifySession_1.verifySession)();
console.log(userId);
function signIn(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        //const user;
        if (email && password) {
            console.log(email + "///" + password);
            try {
                const userCredentials = yield (0, auth_1.signInWithEmailAndPassword)(firebase_1.auth, email, password);
                const token = yield userCredentials.user.getIdToken();
                const res = yield fetch("/api/signIn", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: email, password: password })
                });
                console.log(token);
                console.log("backend awswers: ", yield res.json());
                //window.open("/home");
            }
            catch (error) {
                console.log("falha ao logar: " + error);
            }
        }
    });
}
const form = document.getElementById('loginSection');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    signIn(email, password);
});
//signUp
function signUp(email, password, name, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const errorText = document.getElementById('signUpErrorMessage');
        if (email == '' || password == '' || name == '') {
            errorText.innerText = "attribute null";
            errorText.style = "display:flex;color:red;";
            return;
        }
        try {
            const userCredentials = yield (0, auth_1.createUserWithEmailAndPassword)(firebase_1.auth, email, password);
            const token = yield userCredentials.user.getIdToken();
            const res = yield fetch('/api/signUp', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, password: password, name: name, description: description })
            });
            console.log("backend answers:", yield res.json());
        }
        catch (error) {
            console.log("error to create an account: " + error);
            errorText.innerText = "error to create account. try again later";
            errorText.style = "display:flex;color:red;";
        }
    });
}
const signUpform = document.getElementById("signUpSection");
signUpform.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInputSignUp').value;
    const password = document.getElementById('passwordInputSignUp').value;
    const name = document.getElementById('nameInputSignUp').value;
    const description = document.getElementById('descriptionInputSignUp').value;
    signUp(email, password, name, description);
});
