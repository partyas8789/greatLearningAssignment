const error = {
    rate: false
}
let rate
const addImage = async () => {
    const productId = getCookies("productId")
    const response = await fetch(`http://127.0.0.1:3000/api/product/v1/products/${+productId}`)
    const productDetails = await response.json()
    const imgContainer = document.getElementById("imgContainer")
    imgContainer.innerHTML += `<img src=${productDetails.image_link} alt="">`
}
addImage()
const rateCheck = (event) => {
    rate = event.target.value
    const siblinng = event.target.nextElementSibling
    if (rate.length > 5 || /^(?:[0-4](?:\.\d{1,2})?|5(?:\.0{1,2})?)$/.test(rate) == false) {
        error.rate = false
        siblinng.innerText = "rate must be in number & less than 5"
    }
    else {
        error.rate = true
        siblinng.innerText = ""
    }
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

const handleSubmit = () => {
    const tokens = getCookies("token")

    if (tokens != "true") {
        window.location.href = "http://127.0.0.1:3000/signin"
    }
    else {
        if (error.rate) {
            const productId = getCookies("productId")
            const userId = getCookies("userId")

            const findData = async () => {
                const response = await fetch("http://127.0.0.1:3000/api/productrate/v1/productrates")
                const productratesData = await response.json()

                let toogle = false

                productratesData.map((eachData) => {
                    if (eachData.user_id == userId && eachData.product_id == productId) {
                        toogle = true
                        alert("you have already given a feedback for this product. Thank you!!")
                        window.location.href = 'http://127.0.0.1:3000/allproducts'
                    }
                })

                if (!toogle) {
                    const rateAllParms = {
                        "rate_of_product": rate,
                        "user_id": userId,
                        "product_id": productId
                    };

                    const rateOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(rateAllParms)
                    };

                    fetch("http://127.0.0.1:3000/api/productrate/v1/productrates", rateOptions)
                        .then(response => response.json())
                        .then(responseData => {
                            updateProduct()
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });


                    const updateProduct = async () => {
                        const productResponse = await fetch(`http://127.0.0.1:3000/api/product/v1/products/${productId}`)
                        const productData = await productResponse.json()

                        const totalPerson = +productData.total_person
                        const productDataRating = +productData.rate
                        const updatedRate = (((productDataRating * totalPerson) + (+rate)) / (totalPerson + 1)).toFixed(2)

                        const productParms = {
                            "rate": updatedRate,
                            "total_person": totalPerson + 1
                        };
                        const productOptions = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(productParms)
                        };

                        fetch(`http://127.0.0.1:3000/api/product/v1/products/${productId}`, productOptions)
                            .then(response => response.json())
                            .then(responseData => {
                                alert("thank you for your feedback !!!")
                                window.location.href = 'http://127.0.0.1:3000/allproducts'
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }
                }
            }
            findData()
        } else {
            const errorMessage = document.getElementsByClassName("error")[0]
            errorMessage.innerText = "please enter valid rating of this product!!"
        }
    }
}
const token = getCookies("token")

if (token != "true") {
    window.location.href = "http://127.0.0.1:3000/signin"
}
const gotoHome = () => {
    window.location.href = 'http://127.0.0.1:3000/allproducts'
}