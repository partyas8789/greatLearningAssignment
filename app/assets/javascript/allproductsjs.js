const herosection = document.getElementById("heroSection")
var data;

function setCookies(name, value, daysToLive) {
    const date = new Date()
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000)
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
}

function deleteCookies(name) {
    setCookies(name, null, null)
}

function getCookies(name) {
    const cDecoded = decodeURIComponent(document.cookie)
    const cArray = cDecoded.split("; ")
    let result = null
    cArray.forEach(element=>{
        if(element.indexOf(name)==0){
            result = element.substring(name.length+1)
        }
    })
    return result
}

const cartItems = {}
const handleLogout = () => {
    deleteCookies("token")
    window.location.href = "./signin"
}
const gotoSignin = () => {
    window.location.href = "http://127.0.0.1:3000/signin"
}

async function findProduct() {
    const response = await fetch("http://127.0.0.1:3000/api/product/v1/products")
    data = await response.json()
    filteredData = data
}

const userId = getCookies("userId")

const sort = () => {
    const category = document.getElementById("searchCategories").value
    const choosePrice = document.getElementById("choosePrice").value
    const chooseRating = document.getElementById("chooseRating").value
    let filteredData = data
    if (category !== "") {
        filteredData = filteredData.filter(eachData => (eachData.category.toLowerCase()).includes(category))
    }
    if (choosePrice !== "") {
        if (choosePrice === "increasing order") {
            filteredData = filteredData.sort((a, b) => a.price - b.price);
        } else {
            filteredData = filteredData.sort((a, b) => b.price - a.price);
        }
    }
    if (chooseRating !== "") {
        filteredData = filteredData.filter(eachData => eachData.rate > chooseRating)
    }
    displayCards(filteredData)
}
const displayCards = (productData) => {
    displayProduct.innerHTML = ""
    if (productData == "") {
        displayProduct.innerHTML = `<h1>Sorry, no result found !!</h1>`
    }
    productData.map((eachProduct) => {
        displayProduct.innerHTML += `
        <div class="card">
            <img src=${eachProduct.image_link} alt="" srcset="" height="40%" width="100%" />
            <section class="titleSection" >${eachProduct.title}</section>
            <section class="categorySection" >
                <h3>${eachProduct.category}</h3> 
                <h3 class="price" >$ ${eachProduct.price}</h3>          
            </section>
            <section class="buttonSection" >
                <button onclick="getDetails(${eachProduct.id})">More Details</button>
                <button id=${eachProduct.id} onclick="addCartItems(${eachProduct.id})">add to cart</button>
            </section>        
        </div>        
        `
    })
}

const getDetails = (id) => {
    setCookies("productId", id, 365)
    window.location.href = `./allproductsDetails/${id}`
}
findProduct()

const handleCart = () => {
    window.location.href = "./cart"
}

const goToNewProduct = () => {
    window.location.href = "./addnewproduct"
}

const addCartItems = (id) => {
    const product = document.getElementById(id)
    product.innerText = "items added !!"
    setTimeout(() => {
        product.innerText = "add to cart"
    }, 1000);

    const handleCart = async () => {
        const responseOfCart = await fetch("http://127.0.0.1:3000/api/cart/v1/carts")
        const responseOfProduct = await fetch(`http://127.0.0.1:3000/api/product/v1/products/${id}`)
        const dataOfCart = await responseOfCart.json()
        const dataOfProduct = await responseOfProduct.json()

        const base64 = btoa(JSON.stringify(dataOfProduct))

        let toogle = false
        if (dataOfCart !== "" && dataOfCart !== undefined && dataOfCart.length > 0) {
            dataOfCart.map((eachData) => {
                if (eachData.user_id == userId && eachData.product_id == id) {
                    toogle = true
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
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }
            })
        }
        if (!toogle) {
            const allParms = {
                quantity: 1,
                productDetails: base64,
                user_id: userId,
                product_id: id
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(allParms)
            };

            fetch(`http://127.0.0.1:3000/api/cart/v1/carts/`, options)
                .then(response => response.json())
                .then(responseData => {
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
    handleCart()
}
const token = getCookies("token")
if (token != "true") {
    herosection.innerHTML = `
    <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7879.jpg?t=st=1684915965~exp=1684916565~hmac=da240731c942ae532829c01c4211509604c565b7a3287becd5d790490c508757" alt="">
        <button class="errorPageButton" onclick="gotoSignin()" > go to login page</button>
    `
}