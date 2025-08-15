let priceStore={};
let cart = JSON.parse(localStorage.getItem("cart"))|| [];

function displayCart() {
    let main = document.querySelector(".main");
    let totalEl = document.querySelector(".showPrice");
    let checkoutBtn=document.querySelector(".checkoutBtn");
    let emptyCart=document.querySelector(".emptyCart");

    main.innerHTML = "";

    let totalPrice = 0;
    let totalDiscount=0;


    cart.forEach((item, index) => {
       let pricePerProduct = (item.price * item.quantity);
       let discountAmount=pricePerProduct*(item.discountPercentage/100);
       

totalDiscount+=discountAmount;
totalPrice+=pricePerProduct;
       
        

        main.innerHTML += `
        <div class="card">
            <img src="${item.thumbnail}" alt="">
            <div class="name">${item.title}</div>
            <div class="comp">
                <div class="price">
                    <span>$${pricePerProduct.toFixed(2)}</span>
                    <span class="discount">Discount Price: ${discountAmount.toFixed(2)}%</span>
                </div>
                <div class="rating">Rating:${item.rating}</div>

                <div class="quantity">
                    
                    <span>Quantity:${item.quantity}</span>
             
                </div>

                <button class="removebtn" onclick="removeItem(${index})">Remove</button>
            </div>
        </div>`;
    });

    totalEl.innerHTML = `<div class="prices" >
                          <p class="totalPrices" >Total: $${totalPrice.toFixed(2)}<p/>
                          <p class="totalDiscount" >Total Discount:${totalDiscount.toFixed(2)}<p/>
                          <p class="totalFinal" >Final Total:${(totalPrice-totalDiscount).toFixed(2)}<p/>
                          </div>
                       `;

                  priceStore.tPrice=totalPrice;
                  priceStore.tDiscount=totalDiscount;
                  priceStore.tFinal=totalPrice-totalDiscount;
                  store();
      if(cart.length===0){
        checkoutBtn.style.display="none";
        emptyCart.innerText="Your Cart is Empty";
      }
}

function store(){
    localStorage.setItem("price",JSON.stringify(priceStore));
}



function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}



function migrate(){
    window.location.href="checkOut.html"
}

displayCart();
