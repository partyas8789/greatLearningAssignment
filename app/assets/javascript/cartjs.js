const cartItems = document.getElementById("cartItems")
let totalPrice = 0

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
const displayCart = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/cart/v1/carts/")
    const data = await response.json()

    data.map((eachData) => {
        const productDetails = JSON.parse(atob(eachData.productDetails))
        if (eachData.user_id == userId) {
            totalPrice += (productDetails.price * eachData.quantity)
            cartItems.innerHTML += `
                <div class="cart_items_container" >
                    <div class="img_container" >
                        <img src=${productDetails.image_link} alt="">
                    </div>
                    <div class="details" >
                        <section >${productDetails.title}</section>                        
                        <section >Quantity: ${eachData.quantity} 
                        <div><button onClick="handleIncrease(${eachData.product_id})" ><h1>+</h1></button> <button id="decrease${eachData.id}" onClick="handleDecrease(${eachData.product_id})"><h1>-</h1></button></div></section>                        
                        <section >Price: $ ${productDetails.price * eachData.quantity}</section>                        
                        <section ><button onClick="handleRemove(${eachData.id})" >remove</button></section>                        
                    </div>
                <div/>
            `
            if (eachData.quantity == 1) {
                const decrease = document.getElementById(`decrease${eachData.id}`)
                decrease.disabled = true;
            }
        }
    })
    if (totalPrice == 0) {
        cartItems.innerHTML = `<h1>Cart is empty !!!</h1>`
    }
    const subTotal = document.getElementById("subTotal")
    subTotal.innerHTML += `<h2>$ ${totalPrice.toFixed(2)}</h2>`
}
displayCart()

const handleDecrease = (id) => {
    console.log(id);

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
                                window.location.href = "http://127.0.0.1:3000/cart"
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
                                window.location.href = "http://127.0.0.1:3000/cart"
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
    }
}

const gotoHome = () => {
    window.location.href = './allproducts'
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
                window.location.href = "./cart"
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