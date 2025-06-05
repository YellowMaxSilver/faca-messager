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
//auto-start function
const userId = await (0, verifySession_1.verifySession)();
var account = null;
var accountName = "";
var userName = "";
if (userId == null) {
    console.log("not loged");
    window.location.href = '/';
}
else {
    //is logged
    console.log("already loged");
}
console.log(userId);
getQuery();
searchUserAccount(account, 'a');
searchUserAccount(userId, 'u');
function getQuery() {
    const link = window.location.search;
    const query = new URLSearchParams(link);
    const uid = query.get("c");
    account = uid;
    console.log(uid);
}
function searchUserAccount(account, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (account == null) {
            return;
        }
        try {
            const data = yield fetch("./api/searchAboutUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: account })
            });
            yield data.json().then(data => {
                if (type == 'u') {
                    userName = data.message[0].name;
                }
                else if (type == 'a') {
                    accountName = data.message[0].name;
                }
                console.log(data.message[0].name);
                setInfoPage();
            });
        }
        catch (e) {
            console.log("error to get user information: " + e);
        }
    });
}
function setInfoPage() {
    const accountTitle = document.getElementById("accountTitle");
    const userTitle = document.getElementById("accountName");
    accountTitle.innerText = accountName;
    userTitle.innerText = userName;
}
