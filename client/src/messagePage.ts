import { verifySession } from "./verifySession";

//auto-start function
const userId = await verifySession();
var account:string | null = null;

var accountName:string = "";
var userName:string = "";

if(userId == null){
    console.log("not loged");
    window.location.href = '/';
}else{
    //is logged
    console.log("already loged");
}
console.log(userId);

getQuery();
searchUserAccount(account, 'a');
searchUserAccount(userId, 'u');


function getQuery(){
    const link:string = window.location.search;
    const query = new URLSearchParams(link);
    const uid = query.get("c");

    account = uid;
    console.log(uid);
}

async function searchUserAccount(account:string | null, type:any){
    if(account == null){return;}
    try{
        const data = await fetch("./api/searchAboutUser",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({userId:account})
        })

        await data.json().then(data =>{
            if(type == 'u'){
                userName = data.message[0].name;
            }else if(type == 'a'){
                accountName = data.message[0].name;
            }
            console.log(data.message[0].name);
            setInfoPage();
        })
    }catch(e){
        console.log("error to get user information: "+e);
    }

}

function setInfoPage(){
    const accountTitle = document.getElementById("accountTitle") as HTMLElement;
    const userTitle = document.getElementById("accountName") as HTMLElement;

    accountTitle.innerText = accountName;
    userTitle.innerText = userName;
}