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
exports.verifySession = verifySession;
function verifySession() {
    return __awaiter(this, void 0, void 0, function* () {
        let value = "";
        try {
            const res = yield fetch("api/readCookie", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            yield res.json().then(data => {
                value = data.message;
            }).catch(err => console.error(err));
        }
        catch (e) {
            console.log("error to log: " + e);
        }
        return value;
    });
}
