
const getDetails = async()=>{
    const container = document.getElementById("productDetailContainer")
    container.innerHTML=`<h1>Loading...</h1>`
    
    const response = await fetch(`http://127.0.0.1:3000/api/product/v1/products/${+localStorage.productId}`)
    const productDetails = await response.json()
    
    container.innerHTML=`
        <div class="product-details-img">
                <img src=${productDetails.image_link} style="max-height: 100%;" alt="" srcset=""  width="100%" />
            </div>
            <div class="product-alldetails">
                <section class="section">${productDetails.title}</section>
                <section class="sections">${productDetails.category}</section>
                <section class="sections">
                    <div><i class="fa fa-star" aria-hidden="true"></i> ${productDetails.rate}</div>
                    <div><i class="fa fa-user" aria-hidden="true"></i> ${productDetails.total_person}</div>
                </section>
                <div class="description">
                    ${productDetails.description}
                </div>
            </div>

    `
}



const handleBack = () =>{
    window.location.href="./allproducts"
}

const handleLogout = () =>{
    localStorage.token = false
    window.location.href="./signin"
}

const handleCart = () =>{
    window.location.href="./cart"
}

if (localStorage.token == "false") {
    const herosection = document.getElementById("heroSection")
    herosection.innerHTML = `
    <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7879.jpg?t=st=1684915965~exp=1684916565~hmac=da240731c942ae532829c01c4211509604c565b7a3287becd5d790490c508757" alt="">
        <button class="errorPageButton" onclick="gotoSignin()" > go to login page</button>
    `
}
if (localStorage.token == "true") {
    getDetails()
}

const gotoSignin = ()=>{
    window.location.href="./signin"
}