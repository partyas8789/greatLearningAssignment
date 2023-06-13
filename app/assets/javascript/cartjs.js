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
                        <section >Quantity: ${eachData.quantity}</section>                        
                        <section >Price: $ ${productDetails.price * eachData.quantity}</section>                        
                        <section ><button onClick="handleRemove(${eachData.id})" >remove</button></section>                        
                    </div>
                <div/>
            `
        }
    })
    const subTotal = document.getElementById("subTotal")
    subTotal.innerHTML += `<h2>$ ${totalPrice}</h2>`
}
displayCart()

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