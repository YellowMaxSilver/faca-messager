import { verifySession } from "./verifySession";

console.log('iniciado');


var userId = await verifySession();
if(userId == null){
    console.log("not loged");
    window.location.href = '/';
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

(document.getElementById('newContactButton') as HTMLDivElement).addEventListener('click',openAddContactWindow);

function openAddContactWindow(){
    let contactWindow = document.getElementById('addContactWindow') as HTMLDivElement;

    contactWindow.style = "display:flex";

    const addContactEmail = document.getElementById('addContactEmail') as HTMLInputElement;
    const addContactButton = document.getElementById('addContactButton') as HTMLButtonElement;

    addContactButton.addEventListener('click',async ()=>{
        console.log(addContactEmail.value);

        //sear if exist some one with email in userInfo
        const res = await fetch('api/addContactByEmail',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ownId:userId,email:addContactEmail.value})
        })

        console.log("backend response",await res.json())
    })
}