const url = new URL(window.location.href)
const prodId = parseInt(url.searchParams.get('prodId'))
let currentProduct = getProduct(prodId)
renderText(currentProduct)
renderImage(currentProduct)






function getProduct(id) {
  let product
  for (let item of rawdata) {
    if (item.prodId == id) {
      product = item
    }
  }
  return product
} 

function renderText(product) {
let template = ``
template += `
  <h1>${product.title}</h1>
  <h2>$${product.price}</h2>
  <p id="product-description">${product.description}</p>
`
document.getElementById("product").innerHTML += template
}

function renderImage(product) {
  let template = ``
  if(product.productMedia.length == 1) {
    template = `
      <img src="https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}">
    `
    document.getElementById("image").innerHTML += template
  } else if (product.productMedia.length > 1) {
    template = `
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner" id="carousel-js">
      </div>

      <button class="carousel-control-prev" type="button"     data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>

      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `
    document.getElementById("image").innerHTML += template
    template = ""
    for (let i= 0; i < product.productMedia.length; i++) {
      template += `
      <div class="carousel-item " id="carousel-item-${i}">
        <img src="https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[i].url}" class="d-block w-100" alt="...">
      </div>
      `
    }
    console.log(template)
    document.getElementById("carousel-js").innerHTML += template
    document.getElementById(`carousel-item-0`).classList.add("active")
  

  }
  
  //document.getElementById("image").innerHTML += template
}