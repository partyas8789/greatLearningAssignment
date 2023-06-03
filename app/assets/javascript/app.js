

let nameAlert = document.getElementById("nameAlert")
let emailAlert = document.getElementById("emailAlert")
let passwordAlert = document.getElementById("passwordAlert")

let email = "";
let password = "";

const error = {
    names: false,
    email: false,
    password: false
}


const nameCheck = (event) => {
    const names = event.target.value
    const siblinng = event.target.nextElementSibling
    if (names === "" || names.length < 3 || names.length > 17 || /^[A-Za-z ]+$/.test(names) == false) {
        error.names = false
        siblinng.innerText = "Name must be contain 3-16 characters"  
    }
    else {
        error.names = true
        siblinng.innerText = ""
    }
}

const emailCheck = (event) => {
    email = event.target.value
    const siblinng = event.target.nextElementSibling

    if (email === "" || /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(email) == false) {
        error.email = false
        siblinng.innerText = "Email must be a valid address, e.g. example@example.com"
    }
    else {
        error.email = true
        siblinng.innerText = ""
    }
}

const passwordCheck = (event) => {
    password = event.target.value
    const siblinng = event.target.nextElementSibling

    if (password === "" || password.length < 6 || password.length > 20 || /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password) == false) {
        error.password = false
        siblinng.innerText = "Password must be alphanumeric (@,_and - are also allowed) and between 6-20 characters"
    }
    else {
        error.password = true
        siblinng.innerText = ""
    }
}

const handleSignup = () => {
    if (error.names && error.email && error.password) {
        let toogle = false
        for (const key in localStorage) {
            if (key == email) {
                toogle = true
                names = ""
                email = "";
                password = ""
            }
        }

        if (!toogle) {
            localStorage.token = true
            window.location.href="./allproducts"
            localStorage.setItem(email, password);
        } else {
            alert("this email is already registered, please go to signin page")
        }
    } else {
        alert("please enter all details !!!")
    }
}

const gotoSignin = ()=>{
    window.location.href="./signin"
}