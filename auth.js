const changePage =()=>{
    window.location.href = "./openaccount.html"
}

const changePage2 =()=>{
    window.location.href = "./login.html";
}

const openAccount =async(event)=>{
    event.preventDefault()
    const parent = document.getElementById("openAccout");
    
    const form_data = new FormData(parent);

    const username = form_data.get("user-name")
    const email = form_data.get("email")
    const password = form_data.get("password")
    const confirm_password = form_data.get("confirm-password")
    const randomNum = Math.floor(1000 + Math.random() * 9000); 

    const AccountData = {
        username : username,
        first_name : form_data.get("first-name"),
        last_name : form_data.get("last-name"),
        email : email,
        password : password,
        confirm_password : confirm_password,
        account_no : randomNum,
        account_balance : 0.00,
        date_of_birth : form_data.get("Birthdate"),
        nid_no : form_data.get("nid_no"),
        account_type : form_data.get("account-type"),
        district : form_data.get("district"),
        city : form_data.get("cityState"),
        country : form_data.get("country"),
        street_address : form_data.get("street_address"),

    }

    if(password!= confirm_password){
       await notifyReg("pass");
       return;
    }

    // fetch("http://127.0.0.1:8000/accounts/GetAllUser/")
    //     .then((res)=>res.json())
    //     .then(async(data)=>{
    //         for((element) of data) {
    //             if(element.email === email)
    //             {
    //                 await notifyReg("tct")
    //                 return
    //             }
    //             console.log(element.username," ", username)
    //             if(element.username === username)
    //             {
    //                 await notifyReg("user")
    //                 return
    //             }

    //         };
    //         console.log(AccountData)
    //         fetch("http://127.0.0.1:8000/accounts/register/",{
    //             method : "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //               },
    //               body: JSON.stringify(AccountData),
    //         })
    //             .then((tes) => tes.json())
    //             .then(async(test) => {
    //             await notifyRegister ()
    //             window.location.href = "./login.html";
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             });

    //     })

    fetch("https://mb-bank-b.onrender.com/openaccount/",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(AccountData)
    })
        .then((tes)=>tes.json())
        .then(async(test)=>{
            await notifyRegister ()
        })
        .catch((error) => {
                console.log(error)
        });


}

const handleLogin = async (event) => {
    event.preventDefault();
    
    const parent = document.getElementById("handle-login");
    const form_data = new FormData(parent);
    
    const loginFormData = {
      username: form_data.get("username"),
      password: form_data.get("password")
    };


    fetch("https://mb-bank-b.onrender.com/login/",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(loginFormData),
    })
      .then((res)=>res.json())
      .then((data)=>{
        localStorage.setItem("token",data.token)
        localStorage.setItem("id",data.user_id)
        console.log(data)
        window.location.href ='./Dashboard.html'
      })
      .catch((error)=>{
        console.log(error)
      })

  };

const handleLogout = () => {
  const token = localStorage.getItem('token');
  fetch("https://mb-bank-b.onrender.com/logout/",{
    method : "GET",
    headers : {
      "Content-Type" : "application/json",
      "Authorization" : `Token ${token}`
    }
  })
    .then((res)=>{
      localStorage.removeItem("token")
      localStorage.removeItem("id")
      window.location.href = './login.html'
    })
    .catch((error)=>{
      console.log(error)
    })
}
