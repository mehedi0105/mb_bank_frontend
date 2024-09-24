const notifyReg = (type) => {
    let val ="";
    if(type=="pass"){
        val = "Passwords do not match. Please try again.";
    }
    else if (type == "user") {
        val = "this username already exits pleace use diffarent username adress!";
    } else {
        val = "this email already exits pleace use diffarent email adress!";
    }
    Toastify({
        text: val,
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#800000",
        close: true
    }).showToast();
}

const notifyRegister = () =>{
    Toastify({
        text: "pleace check your email and click email varification link",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#059212",
        close: true
    }).showToast();
}

const notifyLogin = ()=> {
    Toastify({
        text: "Login Successfull",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#800000",
        close: true
    }).showToast();
}

const notifyDeposit = ()=> {
    Toastify({
        text: "Deposit Successfull",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#059212",
        close: true
    }).showToast();
}