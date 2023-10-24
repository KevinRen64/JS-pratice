let currentPage = 1
const productPerPage  = 20
let cleanData = []
let pages = 0
let data = []
let pageNum = ""
let categoryData = []
let para = [] 



renderCategoryDropdown()
cleanseData(rawdata)
slicePages(cleanData)
renderPage(data)









//cleanse data
function cleanseData(data) {
  for (let product of rawdata) {
    if(product.productMedia[0]) {
      cleanData.push(product)
    }
  }
}

//slice the cleanse data, each page contains 20 products
function slicePages(paginateData) {
  data = []
  pages = Math.ceil (paginateData.length / productPerPage)
  for (let i = 0; i < pages; i++) {
    data.push(paginateData.slice(i*productPerPage, 20+i*productPerPage))
  }
  renderPageNums(pages)
}

// change page number, render products, only the selected page contain the class active
function changePage(pageNum) {
  currentPage = pageNum 
  matchPage() 
  renderPage(data)
}

// remove the active class for all pages, and re-add active class to currentPage
function matchPage() {
  for (let i = 1; i<=pages; i++) {
    if (document.getElementById(`page${i}`).classList.contains("active")) {
      document.getElementById(`page${i}`).classList.remove("active")
    } 
  }
  document.getElementById(`page${currentPage}`).classList.add("active")
}

function renderPageNums(pages) {
  let pageNum = ""
  for (let i = 1; i <= pages; i++) {
    pageNum += `
    <li class="page-item"><a id=page${i}  class="page-link" onclick = "changePage(${i})">${i}</a></li>
    `
  }
  document.getElementById("pagination").innerHTML = pageNum
  document.getElementById("page1").classList.add("active")
}

//previous button
function prevButton() {
  if (currentPage === 1 ) {
    return
  } else if (currentPage > 1) {
    currentPage --
    matchPage()
    renderPage(data)
  }
}

//next button
function nextButton() {
  if (currentPage < pages) {
    currentPage ++
    matchPage()
    renderPage(data)
  } else if (currentPage === pages) {
    return
  }
}



//header
//catedory drop down list
function renderCategoryDropdown() {
  let template = `<option value="0">All Hires</option>`
  let productCategory = rawdata[0].prodType.productCategory
  for(let categoryName of productCategory) {
    template += `
    <option value="${categoryName.categoryId}">${categoryName.categoryName}</option>
    `
  }
  document.getElementById("category-dropdown-list").innerHTML += template
}

//render data one page at a time
function renderPage(renderData) {
  //console.log(renderData)
  let template = ""

  for(let product of renderData[currentPage - 1]) {
    template  +=  `
    <div class = "col-12 col-md-6 col-xl-3 mb-3 ">
      <a href="./product.html?prodId=${product.prodId}">
        <img src="https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}">
        <p id="card-title">${product.title}</p>
        <p id="card-price">$ ${product.price}</p>
      </a>
    </div>
  `
  }
  document.getElementById("card-container").innerHTML = template
}

//category
function selectCategory() {
  categoryData = []
  let category = document.getElementById("category-dropdown-list").value
    for (let product of cleanData) {
      if (category == product.categoryId){
        categoryData.push(product)
      } 
    }

    if (category == 0) {
      currentPage = 1
      slicePages(cleanData)
      renderPage(data)
    } else {
        currentPage = 1
        slicePages(categoryData)
        renderPage(data)
    }
}

//price dropdown menu
function selectPrice() {
  let category = document.getElementById("category-dropdown-list").value
  let price = document.getElementById("price-dropdown-list").value
  let priceData = []
  
  if (category == 0) {
    categoryData = cleanData
  }

  if (price === '0') {
    for (let product of categoryData) {
      priceData.push(product)
    }
  } else if (price === "1000+") {
    for (let product of categoryData) {
      if (product.price > 1000){
        priceData.push(product)
      }
    }
  } else {
    const range = price.split('-');
    const minPrice = parseInt(range[0]);
    const maxPrice = parseInt(range[1]);
    for (let product of categoryData) {
      if (product.price >= minPrice && product.price <= maxPrice) {
        priceData.push(product)
      }
    }
  }

    currentPage = 1
    slicePages(priceData)
    renderPage(data)
  } 

function ascButton() {
  let category = document.getElementById("category-dropdown-list").value

  if(category == 0) {
    slicePages(cleanData)
  }

  const combinedData = [...data.flat()];
  combinedData.sort((a, b) => a.price - b.price)
  slicePages(combinedData)
  renderPage(data)

}

function decButton() {
  let category = document.getElementById("category-dropdown-list").value

  if(category == 0) {
    slicePages(cleanData)
  }

  const combinedData = [...data.flat()];
  combinedData.sort((a, b) => b.price - a.price)
  slicePages(combinedData)
  renderPage(data)
}

function resetButton() {
  location.reload();
}

