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
const verifySession_1 = require("./verifySession");
console.log('iniciado');
var userId = await (0, verifySession_1.verifySession)();
if (userId == null) {
    console.log("not loged");
    window.location.href = '/';
}
else {
    console.log("already loged");
    searchUsersInfo(userId);
}
console.log(userId);
var name;
function searchUsersInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("./api/searchAboutUser", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ userId: id })
            });
            yield res.json().then(data => {
                name = data.message[0].name;
                console.log(name);
                setInfosOnPage();
            });
        }
        catch (e) {
            console.log("error to found your informations: " + e);
        }
    });
}
function setInfosOnPage() {
    const accountNameText = document.getElementById('accountName');
    accountNameText.innerText = name;
}
document.getElementById('newContactButton').addEventListener('click', openAddContactWindow);
function openAddContactWindow() {
    let contactWindow = document.getElementById('addContactWindow');
    contactWindow.style = "display:flex";
    const addContactEmail = document.getElementById('addContactEmail');
    const addContactButton = document.getElementById('addContactButton');
    addContactButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        console.log(addContactEmail.value);
        //sear if exist some one with email in userInfo
        const res = yield fetch('api/addContactByEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ownId: userId, email: addContactEmail.value })
        });
        console.log("backend response", yield res.json());
    }));
}
