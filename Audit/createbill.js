let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];



let searchbtn = document.querySelector(".search")
let cardbill = document.querySelector(".cardbillbody")

searchbtn.addEventListener("click", () => {
    let barcodesearch = document.querySelector("#barcodesearch").value.trim();
    let found = false;






    products.forEach((product) => {
        if (barcodesearch === product.barcode) {
            found = true;
            console.log(product.barcode)
            cardbill.insertAdjacentHTML("beforeend", `
                     <div class="cardbilladd">
                        <div class="cardbilladd1">
                            <span>${product.prodcutname} -</span>
                            <span>₹${product.selling}</span>
                        </div>
                        <div>
                            <button class="addcardbill1" data-name="${product.prodcutname}"
                                data-price="${product.selling}">
                                + Add
                            </button>
                        </div>
                    </div>`
            );


        }







    });

    if (!found) {
        alert("Product not found");
    }

    document.querySelector("#barcodesearch").value = ""
});


let itemshow = document.querySelector(".itemshow");


let carts = [];
function displayproduct() {
    itemshow.innerHTML = "";


    carts.forEach((cart, index) => {

        itemshow.insertAdjacentHTML("beforeend", `
        <div class="itemshowlist">
            <div>
                <span>${cart.name}</span><br>
                <span>₹${cart.price}*${cart.quantity}</span>
            </div>
            <div>
                <span style="color:green;">₹${cart.price*cart.quantity}</span>
            </div>
            <div>
                <button class="remove" data-index="${index}">Remove</button>
            </div>
        </div>
    `)

    });
    updateSummary();

}




let total = 0
function updateSummary() {
    let subtotal = 0;
    

    carts.forEach(cart => {
        subtotal = subtotal + parseFloat(cart.price*cart.quantity);
    })

    let tax = parseFloat(subtotal * 0.18)
     total = parseFloat(subtotal + tax)
    document.querySelector("#subtotalprice").textContent = `₹${subtotal.toFixed(2)}`;
    document.querySelector("#tax").textContent = `₹${tax.toFixed(2)}`;
    document.querySelector("#total").textContent = `₹${total.toFixed(2)}`
    
    
}



   let paymentmethod1 = "cash"
 

    document.querySelector(".paymentmethod").addEventListener("click" , (e)=>{
        
        if(e.target.classList.contains("cash")){
            paymentmethod1 = "cash"
            document.querySelector(".upi").style.backgroundColor = "white"
            document.querySelector(".cash").style.backgroundColor = "#007BFF"
            document.querySelector(".upi").style.color = "black";
            document.querySelector(".cash").style.color = "white"
        }
        if(e.target.classList.contains("upi")){
            paymentmethod1 = "upi"
            document.querySelector(".upi").style.backgroundColor = "#007BFF"
            document.querySelector(".cash").style.backgroundColor = "white"
            document.querySelector(".upi").style.color = "white";
            document.querySelector(".cash").style.color = "black";
            document.querySelector(".cash").style.borderColor = "black";
            document.querySelector(".cash").style.border = "2px solid black";

            
        }
        

    })

  let savesale = document.querySelector(".addsale1");

  savesale.addEventListener("click" , ()=>{

        if (carts.length === 0) {
        alert("Please add at least one product before saving the sale.");
        return; // Stop the function here
    }

      sales.push({
        id: "BILL-" + Date.now(),
        date: new Date().toLocaleDateString(),
        amount: total,
        paymentmethod: paymentmethod1,
        items : carts.length,
    })

    alert("save sale successful!")
    
    localStorage.setItem("sales" , JSON.stringify(sales));
    

    window.location.reload();

  })
  
//   let cartstotal = 0;
//      for(i=0 ; i<carts.length ; i++){
//         cartstotal = cartstotal + carts[i].length

//      }

//      console.log(cartstotal)

cardbill.addEventListener("click", (e) => {
    if (e.target.classList.contains("addcardbill1")) {
        const name = e.target.dataset.name;
        const price = e.target.dataset.price;
        let quantity;

        let existingProduct = carts.find(cart => cart.name === name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            carts.push({
                name,
                price: Number(price),
                quantity: 1
                
            });
        }
        displayproduct();


    }
});


function generateBill() {
    let subtotal = 0;
    if (carts.length === 0) {
        alert("Cart is empty!");
        return;
    }

     carts.forEach(cart => {
        subtotal = subtotal + parseFloat(cart.price*cart.quantity);
    })

    const tax = subtotal * 0.18;
    const grandTotal = subtotal + tax;

    let billWindow = window.open("", "_blank");

    billWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<title>Invoice</title>

<style>

body{
    font-family:Arial,sans-serif;
    padding:30px;
}

h1{
    text-align:center;
}

table{
    width:100%;
    border-collapse:collapse;
    margin-top:20px;
}

th,td{
    border:1px solid #ddd;
    padding:10px;
}

th{
    background:#f3f3f3;
}

.summary{
    margin-top:20px;
    width:300px;
    margin-left:auto;
}

.summary p{
    display:flex;
    justify-content:space-between;
    font-size:18px;
}

button{
    display:none;
}

@media print{
    button{
        display:none;
    }
}

</style>

</head>

<body>

<h1>My Grocery Store</h1>

<p><b>Date:</b> ${new Date().toLocaleString()}</p>

<p><b>Bill No:</b> BILL-${Date.now()}</p>

<table>

<tr>
<th>Product</th>
<th>Qty</th>
<th>Price</th>
<th>Total</th>
</tr>

${carts.map(item=>`
<tr>
<td>${item.name}</td>
<td>${item.quantity}</td>
<td>₹${item.price}</td>
<td>₹${item.price * item.quantity}</td>
</tr>
`).join("")}

</table>

<div class="summary">

<p><span>Subtotal</span><span>₹${subtotal.toFixed(2)}</span></p>

<p><span>GST (18%)</span><span>₹${tax.toFixed(2)}</span></p>

<hr>

<p style="font-size:22px;font-weight:bold;">
<span>Grand Total</span>
<span>₹${grandTotal.toFixed(2)}</span>
</p>

<p><span>Payment</span><span>${paymentmethod1.toUpperCase()}</span></p>

</div>

<script>
window.onload = function(){
    window.print();
}
</script>

</body>
</html>
`);

    billWindow.document.close();
}
let billg = document.querySelector(".billg")

billg.addEventListener("click" , generateBill)


itemshow.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
        const index = e.target.dataset.index;
        carts.splice(index, 1);
        console.log(e)
        displayproduct();

    }
})