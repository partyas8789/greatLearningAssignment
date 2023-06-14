const herosection = document.getElementById("heroSection")

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
    cArray.forEach(element => {
        if (element.indexOf(name) == 0) {
            result = element.substring(name.length + 1)
        }
    })
    return result
}

const cartItems = {}
const handleLogout = () => {
    deleteCookies("token")
    deleteCookies("role")
    window.location.href = "http://127.0.0.1:3000/allproducts"
}

const userId = getCookies("userId")

const searchCategories = document.getElementById("searchCategories")
const choosePrice = document.getElementById("choosePrice")
const chooseRating = document.getElementById("chooseRating")
const productDetailContainer = document.getElementById("displayProduct")

let category
let price
let rating

function debounced(cb, delay) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay);
    }
}

const updatedDebounceText = debounced(() => {
    getUpdatedData()
}, 1500)

const getUpdatedData = () => {
    fetch(`http://127.0.0.1:3000/allproducts/filtered_products?category=${category}&price=${price}&rating=${rating}`)
        .then(response => response.json())
        .then(responseData => {
            productDetailContainer.innerHTML = responseData.cards            
            const grandchildElement = productDetailContainer.querySelector('.card');
            if (!grandchildElement) {
                productDetailContainer.innerHTML = `<h1> Sorry, no result found !!!</h1>`
            } 
        })
        .catch(error => {
            console.error('Error:', error);
            console.error('Error:', error.message);
        });
}

searchCategories.addEventListener("input", e => {
    category = e.target.value
    updatedDebounceText(category, price, rating)
})
choosePrice.addEventListener("click", e => {
    price = e.target.value
    getUpdatedData()
})
chooseRating.addEventListener("click", e => {
    rating = e.target.value
    getUpdatedData()
})
const getDetails = (id) => {
    setCookies("productId", id, 365)
    window.location.href = `http://127.0.0.1:3000/allproductsDetails/${id}`
}

const handleCart = () => {
    window.location.href = "http://127.0.0.1:3000/cart"
}

const goToNewProduct = () => {
    window.location.href = "http://127.0.0.1:3000/addnewproduct"
}

const addCartItems = (id) => {
    const tokenCheck = getCookies("token")
    if (tokenCheck !== "true") {
        window.location.href = "http://127.0.0.1:3000/signin"
    } else {
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
}

const handleLogin = () => {
    window.location.href = "http://127.0.0.1:3000/signin"
}