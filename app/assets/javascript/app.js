let email = "";
let password = "";
let names = "";

const error = {
    names: false,
    email: false,
    password: false
}


function setCookies(name, value, daysToLive) {
    const date = new Date()
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000)
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
}

const nameCheck = (event) => {
    names = event.target.value
    const sibling = event.target.nextElementSibling
    if (names === "" || names.length < 3 || names.length > 17 || /^[A-Za-z ]+$/.test(names) == false) {
        error.names = false
        sibling.innerText = "Name must be contain 3-16 characters"
    }
    else {
        error.names = true
        sibling.innerText = ""
    }
}

const emailCheck = (event) => {
    email = event.target.value
    const sibling = event.target.nextElementSibling

    if (email === "" || /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(email) == false) {
        error.email = false
        sibling.innerText = "Email must be a valid address"
    }
    else {
        error.email = true
        sibling.innerText = ""
    }
}

const passwordCheck = (event) => {
    password = event.target.value
    const sibling = event.target.nextElementSibling

    if (password === "" || password.length < 6 || password.length > 20 || /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password) == false) {
        error.password = false
        sibling.innerText = "Password must be alphanumeric"
    }
    else {
        error.password = true
        sibling.innerText = ""
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
                            setCookies("token", "true", 365)
                            setCookies("userId", responseData.id, 365)
                            setCookies("role", responseData.role, 365)
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
        if (!names) {
            const name = document.getElementById("name")
            name.nextElementSibling.innerText = "Required*"
        }
        
        if (!email) {
            const email = document.getElementById("email")
            email.nextElementSibling.innerText = "Required*"
        }

        if (!password) {
            const password = document.getElementById("password")
            password.nextElementSibling.innerText = "Required*"
        }
    }
}

const gotoSignin = () => {
    window.location.href = "./signin"
}