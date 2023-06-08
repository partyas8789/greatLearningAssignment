let title;
let price;
let description;
let category;
let image_link;
let rate;
let total_person;

const error = {
    title: false,
    price: false,
    description: false,
    category: false,
    image_link: false,
    rate: false,
    total_person: false
}

const titleCheck = (event) => {
    title = event.target.value
    const siblinng = event.target.nextElementSibling
    if (title === "" || title.length < 3) {
        error.title = false
        siblinng.innerText = "title must be contain more then 3 characters"
    }
    else {
        error.title = true
        siblinng.innerText = ""
    }
}

const priceCheck = (event) => {
    price = event.target.value
    const siblinng = event.target.nextElementSibling
    if (/^(\d+(\.\d{1,2})?)$/.test(price) == false) {
        error.title = false
        siblinng.innerText = "price must be in number"
    }
    else {
        error.title = true
        siblinng.innerText = ""
    }
}
const descriptionCheck = (event) => {
    description = event.target.value
    const siblinng = event.target.nextElementSibling
    if (description === "" || description.length < 3) {
        error.description = false
        siblinng.innerText = "description must be contain more than 3 characters"
    }
    else {
        error.description = true
        siblinng.innerText = ""
    }
}
const categoryCheck = (event) => {
    category = event.target.value
    const siblinng = event.target.nextElementSibling
    if (category === "" || category.length < 3 || category.length > 50) {
        error.category = false
        siblinng.innerText = "category must be contain 3-50 characters"
    }
    else {
        error.category = true
        siblinng.innerText = ""
    }
}

const imageLinkCheck = (event) => {
    image_link = event.target.value
    const siblinng = event.target.nextElementSibling
    if (image_link === "" || image_link.length < 10) {
        error.image_link = false
        siblinng.innerText = "image_link must be contain more than 10 characters"
    }
    else {
        error.image_link = true
        siblinng.innerText = ""
    }
}

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

const totalPersonCheck = (event) => {
    total_person = event.target.value
    const siblinng = event.target.nextElementSibling
    if (/^\d+$/.test(total_person) == false) {
        error.total_person = false
        siblinng.innerText = "total_person must be in number"
    }
    else {
        error.total_person = true
        siblinng.innerText = ""
    }
}

const checkAccess = () => {
    if (localStorage.token == "false") {
        const heroSection = document.getElementById("heroSection")
        heroSection.innerHTML = `
        <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7879.jpg?t=st=1684915965~exp=1684916565~hmac=da240731c942ae532829c01c4211509604c565b7a3287becd5d790490c508757" alt="">
            <button class="errorPageButton" onclick="gotoSignin()" > go to login page</button>
        `
    }
}

const handleSubmitProduct = (event) => {
    event.preventDefault();
    checkAccess()

    if (localStorage.token == "true") {

        if (title && price && description && category && image_link && rate && total_person) {

            const data = {
                title: title,
                price: price,
                description: description,
                category: category,
                image_link: image_link,
                rate: rate,
                total_person: total_person

            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch("http://127.0.0.1:3000/api/product/v1/products/", options)
                .then(response => response.json())
                .then(responseData => {
                    console.log('Response:', responseData);
                    window.location.href = "./allproducts"
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        else {
            alert("please enter all details!!!")
        }

    }
}

const gotoHome = () => {
    window.location.href = 'http://127.0.0.1:3000/allproducts'
}

const gotoSignin = () => {
    window.location.href = "http://127.0.0.1:3000/signin"
}

checkAccess()