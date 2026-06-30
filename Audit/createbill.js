let products = JSON.parse(localStorage.getItem("products")) || [];



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

let sales = []
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
      sales.push({
        id: "BILL-" + Date.now(),
        date: new Date().toLocaleDateString(),
        amount: total,
        paymentmethod: paymentmethod1,
        items : carts.length,
    })
    
    localStorage.setItem("sales" , JSON.stringify(sales));
    console.log(sales)

  })
  


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



itemshow.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
        const index = e.target.dataset.index;
        carts.splice(index, 1);
        console.log(e)
        displayproduct();

    }
})