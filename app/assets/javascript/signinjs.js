let email = "";
let password = ""

const error = {
    email: false,
    password: false
}

function setCookies(name, value, daysToLive) {
    const date = new Date()
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000)
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
}

const emailCheck = (event) => {
    email = event.target.value
    const siblinng = event.target.nextElementSibling
    if (email === "" || /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(email) == false) {
        error.email = false
        siblinng.innerText = "Email must be a valid address"
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
        siblinng.innerText = "Password must be alphanumeric"
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
                        setCookies("userId", eachUser.id, 365)
                        setCookies("role", eachUser.role, 365)
                    }
                })
            }

            if (toogle) {
                setCookies("token", true, 365)
                window.location.href = "./allproducts"
            } else {
                alert("please enter correct email & password !!!")
            }
        }
        fetchingData()
    } else {
        if (!email) {
            const email = document.getElementById("email")
            const siblingOfEmail = email.nextElementSibling
            siblingOfEmail.innerText = "Email must be a valid address"
        }

        if (!password) {
            const password = document.getElementById("password")
            const siblingOfPassword = password.nextElementSibling
            siblingOfPassword.innerText = "Password must be alphanumeric"
        }
    }
}

const gotoSignup = () => {
    window.location.href = "./signup"
}