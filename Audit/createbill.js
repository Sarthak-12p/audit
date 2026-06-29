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

function updateSummary() {
    let subtotal = 0;

    carts.forEach(cart => {
        subtotal = subtotal + parseFloat(cart.price*cart.quantity);
    })

    let tax = parseFloat(subtotal * 0.18)
    let total = parseFloat(subtotal + tax)
    document.querySelector("#subtotalprice").textContent = `₹${subtotal.toFixed(2)}`;
    document.querySelector("#tax").textContent = `₹${tax.toFixed(2)}`;
    document.querySelector("#total").textContent = `₹${total.toFixed(2)}`
}


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