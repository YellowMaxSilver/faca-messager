import { verifySession } from "./verifySession";

console.log('iniciado');


var userId = await verifySession();
if(userId == null){
    console.log("not loged");
}else{
    console.log("already loged");
    searchUsersInfo(userId);
}
console.log(userId);

var name:string;

async function searchUsersInfo(id:string){
    try{
        const res = await fetch("./api/searchAboutUser",{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({userId:id})
        })
        
        await res.json().then(data => {
            name = data.message[0].name;
            console.log(name);
            setInfosOnPage();
        })
    }catch(e){
        console.log("error to found your informations: "+e);
    }
}

function setInfosOnPage(){
    const accountNameText = document.getElementById('accountName') as HTMLElement;
    accountNameText.innerText = name;
}
