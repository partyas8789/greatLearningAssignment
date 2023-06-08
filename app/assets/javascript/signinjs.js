let emailAlert = document.getElementById("emailAlert")
let passwordAlert = document.getElementById("passwordAlert")

let email = "";
let password = ""

const error = {
    email: false,
    password: false
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

const handleSignin = () => {
    if (error.email && error.password) {
        const url = 'http://127.0.0.1:3000/api/user/v1/users';

        const fetchingData = async () => {
            let toogle = false
            const response = await fetch(url)
            const allUserData = await response.json()
            if (allUserData !== "" && allUserData !== undefined && allUserData.length > 0) {
                allUserData.map((eachUser) => {
                    if (eachUser["email"] == email && eachUser["password"] == password) {
                        toogle = true
                        email = "";
                        password = ""
                        localStorage.userId = eachUser.id
                    }
                })
            }

            if (toogle) {
                localStorage.token = true
                window.location.href = "./allproducts"
            } else {
                alert("please enter correct email & password !!!")
            }
        }
        fetchingData()
    } else {
        alert("please enter email & password !!!")
    }
}

const gotoSignup = () => {
    window.location.href = "./signup"
}