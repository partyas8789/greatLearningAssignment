

let nameAlert = document.getElementById("nameAlert")
let emailAlert = document.getElementById("emailAlert")
let passwordAlert = document.getElementById("passwordAlert")

let email = "";
let password = "";
let names = "";

const error = {
    names: false,
    email: false,
    password: false
}


const nameCheck = (event) => {
    names = event.target.value
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
        const url = 'http://127.0.0.1:3000/api/user/v1/users';

        const fetchingData = async () => {
            let toogle = false
            const response = await fetch(url)
            const allUserData = await response.json()
            if (allUserData !== "" && allUserData !== undefined && allUserData.length > 0) {
                allUserData.map((eachUser) => {
                    if (eachUser["email"] == email) {
                        toogle = true
                        names = ""
                        email = "";
                        password = ""
                    }
                })
                if (!toogle) {
                    const data = {
                        name: names,
                        email: email,
                        password: password
                    };

                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    };

                    fetch(url, options)
                        .then(response => response.json())
                        .then(responseData => {
                            localStorage.token = true
                            window.location.href = "./allproducts"
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });

                } else {
                    alert("this email is already registered, please go to signin page")
                }
            }
        }
        fetchingData()
    } else {
        alert("please enter all details !!!")
    }
}

const gotoSignin = () => {
    window.location.href = "./signin"
}