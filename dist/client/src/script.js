var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
console.log('iniciado');
function signIn(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        //const user;
        if (email && password) {
            console.log(email + "///" + password);
            try {
                const userCredentials = yield signInWithEmailAndPassword(auth, email, password);
                const token = yield userCredentials.user.getIdToken();
                const res = yield fetch("http://localhost:5000/api/signIn", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "appication/json"
                    },
                    body: JSON.stringify({})
                });
                console.log(token);
                console.log("backend awswers: ", yield res.json());
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
