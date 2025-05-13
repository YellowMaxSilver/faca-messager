
export async function verifySession(){
    let value = "";
    try{
        const res = await fetch("api/readCookie",{
            method:"POST",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            },
        });
        await res.json().then(data => {
            value = data.message;
        }).catch(err => console.error(err));
        }catch(e){
            console.log("error to log: "+ e);
        }
    return value;    
}
