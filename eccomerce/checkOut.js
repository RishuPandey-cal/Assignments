let totalPrice=0;
let totalDiscount=0;
let finalPrices=0;

function load(){
    let paymentOptions = document.querySelectorAll('input');
    let cardDetailsContainer = document.getElementById("cardDetailsContainer");

    console.log(paymentOptions,cardDetailsContainer);

    paymentOptions.forEach((option, index) => {
        option.addEventListener("change", () => {
            let formHTML = "";
            if (index === 0) { 
                formHTML = `
                    <div class="card-form">
                        <label>UPI ID</label>
                        <input type="text" id="upiId" placeholder="example@upi" />
                        <button class="submit-btn" onclick="validateUpi()">Submit</button>
                    </div>
                `;
            }
            else if (index === 1 || index === 2) { 
                formHTML = `
                    <div class="card-form">
                        <label>Card Number</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="16" />

                        <label>Name on Card</label>
                        <input type="text" id="cardName" placeholder="John Doe" />

                        <label>Expiry Date</label>
                        <input type="month" id="expiryDate" />

                        <label>CVV</label>
                        <input type="password" id="cvv" placeholder="123" maxlength="3" />

                        <button class="submit-btn" onclick="validateCard()">Submit</button>
                    </div>
                `;
            }
            else if (index === 3) { 
                formHTML = `
                    <div class="card-form">
                        <label>Select Bank</label>
                        <select id="bankName">
                            <option value="">-- Select Bank --</option>
                            <option value="SBI">State Bank of India</option>
                            <option value="HDFC">HDFC Bank</option>
                            <option value="ICICI">ICICI Bank</option>
                            <option value="Axis">Axis Bank</option>
                        </select>
                        <label>User ID</label>
                        <input type="text" id="netUserId" placeholder="Enter User ID" />

                        <label>Password</label>
                        <input type="password" id="netPassword" placeholder="Enter Password" />

                        <button class="submit-btn" onclick="validateNetBanking()">Submit</button>
                    </div>
                `;
            }

            cardDetailsContainer.innerHTML = formHTML;
        });
    });
}

load();

function validateUpi() {
    const upi = document.getElementById("upiId").value.trim();
    console.log("runinig")
    
    if (!upi.includes('@')) {
        alert("Invalid UPI ID. Example: name@bank");
        return false;
    }
    alert("UPI Payment Successful!");
}

function validateCard() {
    const number = document.getElementById("cardNumber").value.trim();
    const name = document.getElementById("cardName").value.trim();
    const expiry = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value.trim();

    if (isNaN(number) || number.length<16) {
        alert("Card number must be 16 digits.");
        return false;
    }
    if (name.length < 3) {
        alert("Name must be at least 3 characters.");
        return false;
    }
    if (!expiry) {
        alert("Please select expiry date.");
        return false;
    }
    if (!cvv || isNaN(cvv) || cvv.length<3) {
        alert("CVV must be 3");
        return false;
    }
    alert("Card Payment Successful!");
}

function validateNetBanking() {
    const bank = document.getElementById("bankName").value;
    const userId = document.getElementById("netUserId").value.trim();
    const password = document.getElementById("netPassword").value.trim();

    if (!bank) {
        alert("Please select a bank.");
        return false;
    }
    if (userId.length < 4) {
        alert("User ID must be at least 4 characters.");
        return false;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return false;
    }
    alert("Net Banking Payment Successful!");
}
let obj= JSON.parse(localStorage.getItem("price"));
console.log(obj)

function showPrice(){
let obj= JSON.parse(localStorage.getItem("price"));
if(!obj){
totalPrice=0;
totalDiscount=0;
finalPrices=0;
}
totalPrice=obj.tPrice ?? 0;
totalDiscount=obj.tDiscount ?? 0;
finalPrices=obj.tFinal ?? 0;

let payBtn=document.querySelector("#payBtn");
payBtn.innerHTML=`$${finalPrices.toFixed(2)}`

let SubTotal=document.querySelector('#SubTotal');
SubTotal.innerHTML=`$${totalPrice.toFixed(2)}`

let discount=document.querySelector("#discountitem");
 discount.innerHTML=`$${totalDiscount.toFixed(2)}`

 let total=document.querySelector('#total');
 total.innerHTML=`$${finalPrices.toFixed(2)}`

}

showPrice();

function previousPage(){
    window.location.href="cart.html";
}