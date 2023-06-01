const handleBack = () =>{
    window.location.href='./allproducts'
}

const handleLogout = () =>{
    localStorage.token = false
    window.location.href='./signin'
}

if (localStorage.token == "false") {
    const herosection = document.getElementById("heroSection")
    herosection.innerHTML = `
    <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7879.jpg?t=st=1684915965~exp=1684916565~hmac=da240731c942ae532829c01c4211509604c565b7a3287becd5d790490c508757" alt="">
        <button class="errorPageButton" onclick="gotoSignin()" > go to login page</button>
    `
}

const gotoSignin = ()=>{
    window.location.href="./signin"
}