fetch('navbar.html')
    .then((res)=>res.text())
    .then((data)=>{
        document.getElementById("navigation-bar").innerHTML=data
    })