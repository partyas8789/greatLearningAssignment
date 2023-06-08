const gotoRatingPage = () =>{
    window.location.href="./giverate"
}

if (localStorage.token == "false") {
    const herosection = document.getElementById("heroSection")
    herosection.innerHTML = `
    <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7879.jpg?t=st=1684915965~exp=1684916565~hmac=da240731c942ae532829c01c4211509604c565b7a3287becd5d790490c508757" alt="">
        <button class="errorPageButton" onclick="gotoSignin()" > go to login page</button>
    `
}
const gotoHome = () => {
    window.location.href = 'http://127.0.0.1:3000/allproducts'
}

const gotoSignin = () => {
    window.location.href = "http://127.0.0.1:3000/signin"
}