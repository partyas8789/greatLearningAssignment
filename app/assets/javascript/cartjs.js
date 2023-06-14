const cartItems = document.getElementById("cartItems")

function getCookies(name) {
    const cDecoded = decodeURIComponent(document.cookie)
    const cArray = cDecoded.split("; ")
    let result = null
    cArray.forEach(element => {
        if (element.indexOf(name) == 0) {
            result = element.substring(name.length + 1)
        }
    })
    return result
}

const userId = getCookies("userId")

const cart = document.querySelector(".cart_items_container")
if(!cart){     
    const cartContainer = document.getElementById("cartContainer")
    const heroSection = document.getElementById("heroSection")
    heroSection.style.backgroundColor = "white"
    cartContainer.innerHTML = `
    <div class="emapty_cart" >
        <img alt="" srcSet="https://static.vecteezy.com/system/resources/previews/004/964/514/large_2x/young-man-shopping-push-empty-shopping-trolley-free-vector.jpg" width="50%" />
        <h1>Cart is empty</h1>
        <button onClick="goToHome()" > Shop now</button>      
    </div> `
}

const goToHome = () =>{
    window.location.href ="http://127.0.0.1:3000/allproducts"
}

const handleDecrease = (id) => {
    const tokenCheck = getCookies("token")
    if (tokenCheck !== "true") {
        window.location.href = "http://127.0.0.1:3000/signin"
    } else {
        const handleCart = async () => {
            const responseOfCart = await fetch("http://127.0.0.1:3000/api/cart/v1/carts")
            const dataOfCart = await responseOfCart.json()

            if (dataOfCart !== "" && dataOfCart !== undefined && dataOfCart.length > 0) {
                dataOfCart.map((eachData) => {
                    if (eachData.user_id == userId && eachData.product_id == id) {
                        toogle = true
                        const allParms = {
                            quantity: eachData.quantity - 1
                        };

                        const options = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(allParms)
                        };

                        fetch(`http://127.0.0.1:3000/api/cart/v1/carts/${eachData.id}`, options)
                            .then(response => response.json())
                            .then(responseData => {
                                fetch(`http://127.0.0.1:3000/cart/updatedCart/?userId=${userId}`)
                                    .then(response1 => response1.json())
                                    .then(responseData1 => {
                                        const cartContainer = document.getElementById("cartContainer")
                                        cartContainer.innerHTML = responseData1.cards
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                    });
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }
                })
            }
        }
        handleCart()
    }
}

const handleIncrease = (id) => {
    const tokenCheck = getCookies("token")
    if (tokenCheck !== "true") {
        window.location.href = "http://127.0.0.1:3000/signin"
    } else {
        const handleCart = async () => {
            const responseOfCart = await fetch("http://127.0.0.1:3000/api/cart/v1/carts")
            const dataOfCart = await responseOfCart.json()

            if (dataOfCart !== "" && dataOfCart !== undefined && dataOfCart.length > 0) {
                dataOfCart.map((eachData) => {
                    if (eachData.user_id == userId && eachData.product_id == id) {

                        const allParms = {
                            quantity: eachData.quantity + 1
                        };

                        const options = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(allParms)
                        };

                        fetch(`http://127.0.0.1:3000/api/cart/v1/carts/${eachData.id}`, options)
                            .then(response => response.json())
                            .then(responseData => {
                                fetch(`http://127.0.0.1:3000/cart/updatedCart/?userId=${userId}`)
                                    .then(response1 => response1.json())
                                    .then(responseData1 => {
                                        const cartContainer = document.getElementById("cartContainer")
                                        cartContainer.innerHTML = responseData1.cards
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                    });
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }
                })
            }
        }
        handleCart()
    }
}

const checkAccess = () => {
    const token = getCookies("token")
    if (token != "true") {
        window.location.href = "http://127.0.0.1:3000/signin"
    }
}

const handleTotalSum = () => {
    checkAccess()
    const token = getCookies("token")
    if (token == "true") {
        alert("Order Sucessful !!")
        window.location.href ="http://127.0.0.1:3000/allproducts"
    }
}

const gotoHome = () => {
    window.location.href = 'http://127.0.0.1:3000/allproducts'
}

const handleRemove = (id) => {
    const tokens = getCookies("token")
    if (tokens == "true") {
        const url = `http://127.0.0.1:3000/api/cart/v1/carts/${id}`
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, options)
            .then(responseData => {
                window.location.href = "http://127.0.0.1:3000/cart"
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    else {
        window.location.href = "http://127.0.0.1:3000/signin"
    }
}
checkAccess()