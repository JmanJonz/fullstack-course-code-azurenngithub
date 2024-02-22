// @ts-nocheck

function isAuth(){
    const jwt = localStorage.getItem("loggedInJWT")
    if(jwt !== null || jwt !== ""){
        return true;
    }else{
        return false;
    }
}

export default isAuth;