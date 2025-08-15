let products=[];
let filteredProducts = [];
let cart=JSON.parse(localStorage.getItem("cart")) || [];
let currentPage=1;
let itemPerPage=10;
updateCartCount();

let show=document.querySelector(".main");
let pagination=document.querySelector(".pagination");
let emptyList=document.querySelector(".emptyList");

   async function fetchData(){
    
    let res=await fetch("https://dummyjson.com/products?limit=200");
    let data = await res.json();
     console.log(data.products[0]);
      products=data.products;
      filteredProducts=[...products];
      console.log(filteredProducts[0])
     renderProducts();
     renderPagination();

}
fetchData();

function renderProducts(){

    let start=(currentPage-1)*itemPerPage;
    let end=start+itemPerPage;

    let currentProduct=filteredProducts.slice(start,end);
   
    if(currentProduct.length===0){
     
     emptyList.innerHTML=`<h2>No product Found</h2>`;
     emptyList.style.fontSize="2rem";
     emptyList.style.textAlign="center";

    }

 show.innerHTML=currentProduct.map((item,index)=>{
    return`
    
    <div class="card">
      <div>
        <img
          src=${item.thumbnail}
          alt=""
        />
      </div>
      <div class="content" >
      <div class="name">
            ${item.title}
        </div>
      <div class="comp">
      <div class="price">
        <p>Price:$${item.price}</p>
        <p class="discount" >Discount:${item.discountPercentage}%</p>
      </div>
      <div class="rating">
      <p>Rating:
       ${
        item.rating
       }</p> 
        <button class="cartbtn" onclick="addCart(${item.id})" >Add to cart</button>
      </div>
     
      </div>
      </div>
    </div>
    
    
    `
}).join("")
}


function renderPagination(){
    let totalPage=Math.ceil(filteredProducts.length/itemPerPage);
    pagination.innerHTML="";

    for(let i=1;i<=totalPage;i++){
        pagination.innerHTML+=`<button class="${i===currentPage?"active":''}"  onclick="changePage(${i})">${i}</button>`;
    }

}

function changePage(page){
    currentPage=page;
    renderProducts();
    renderPagination();
}

 
document.querySelectorAll("#search").forEach(searchBox => {
  searchBox.addEventListener("input", (e) => {
    let val = e.target.value.toLowerCase();
    filteredProducts = products.filter(p => p.title.toLowerCase().includes(val));
    currentPage = 1;
    renderProducts();
    renderPagination();
  });
});

async function fetchCategories(){
    let res= await fetch("https://dummyjson.com/products/categories");
    let data=await res.json();

     document.querySelectorAll("#categoryFilter").forEach(select => {
        select.innerHTML = `<option value="">All Category</option>` +
            data.map(item => `<option value="${item.name}">${item.name}</option>`).join("");
    });
}  


fetchCategories();


document.querySelectorAll("#categoryFilter").forEach(dropdown => {
    dropdown.addEventListener("change", (e) => {
        let cat = e.target.value;

        if (!cat) {
            filteredProducts = [...products];
        } else {
         
            filteredProducts = products.filter(item => 
                item.category.toLowerCase() === cat.toLowerCase() ||
                item.category.toLowerCase().includes(cat.toLowerCase()) || 
                item.title.toLowerCase().includes(cat.toLowerCase()) ||
                item.description.toLowerCase().includes(cat.toLowerCase())
            );
        }

        currentPage = 1;
        renderProducts();
        renderPagination();

        
        document.querySelectorAll("#categoryFilter").forEach(select => {
            if (select !== e.target) {
                select.value = cat;
            }
        });
    });
});



document.querySelectorAll("#sort").forEach(sortEl => {
  sortEl.addEventListener("change", (e) => {
    let sort = e.target.value;

    if (!sort) {
      filteredProducts = [...products];
    } 
    else if (sort === "price-low") {
      filteredProducts = [...filteredProducts].sort((p, q) => p.price - q.price);
    } 
    else if (sort === "price-high") {
      filteredProducts = [...filteredProducts].sort((p, q) => q.price - p.price);
    } 
    else {
      filteredProducts = [...filteredProducts].sort((p, q) => q.rating - p.rating);
    }

    currentPage = 1;
    renderProducts();
    renderPagination();
  });
});


function addCart(id){
     let item = products.find(p => p.id === id);
     let existing = cart.find(p => p.id === item.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 }); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
   updateCartCount();
    alert(`${item.title} added to cart!`);
}

function redirectTocart(){
     window.location.href = "cart.html"
}


function updateCartCount(){
  let count=document.querySelector("#cartCount");
    count.innerHTML=cart.length;
}