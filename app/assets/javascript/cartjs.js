const cartItems = document.getElementById("cartItems")
let totalPrice =0
const displayCart = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/cart/v1/carts/")
    const data = await response.json()

    data.map((eachData) => {
        const productDetails = JSON.parse(atob(eachData.productDetails))
        if (eachData.user_id == localStorage.userId) {
            totalPrice +=(productDetails.price * eachData.quantity)
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
    subTotal.innerHTML += `<h1>$ ${totalPrice}</h1>` 
}
displayCart()

const handleTotalSum = () =>{
    alert(`Checkout - Subtotal: $ ${totalPrice}`)
}

const handleRemove = (id) => {
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

const gotoHome = () => {
    window.location.href = './allproducts'
}

if (localStorage.token == "false") {
    const herosection = document.getElementById("heroSection")
    herosection.innerHTML = `
    <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7879.jpg?t=st=1684915965~exp=1684916565~hmac=da240731c942ae532829c01c4211509604c565b7a3287becd5d790490c508757" alt="">
        <button class="errorPageButton" onclick="gotoSignin()" > go to login page</button>
    `
}

const gotoSignin = () => {
    window.location.href = "http://127.0.0.1:3000/signin"
}