let products = JSON.parse(localStorage.getItem("products")) || [];
let addproduct = document.querySelector(".buttonaddprodcut")

addproduct.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector(".maindivform").style.display = "initial";

})

let buttonx = document.querySelector(".buttonx")

buttonx.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".maindivform").style.display = "none";

})



function displayProducts() {

    const tbody = document.querySelector(".tbody");

    tbody.innerHTML = "";

    products.forEach((product, index) => {

        let status = product.quantity;

        if (status >= 10) {
            status = " In Stock"
        }
        else {
            status = "Low Stock";

        }


        let className;

        if (status === "Low Stock") {
            className = "low"
        }
        else {
            className = "in"
        }

        tbody.insertAdjacentHTML("beforeend", `
            <tr class="tr1">
                <td class="td1">${product.prodcutname}</td>
                <td class="td1">${product.barcode}</td>
                <td class="td1"><span class="badge">${product.category}</span></td>
                <td class="td1">₹${product.selling}</td>
                <td class="td1">${product.quantity}</td>
                
                <td class="td1"><span class="badge status ${className}" id="stock">${status}</span></td>
                <td class="td1">
                    <button class="edit" data-index="${index}" >Edit</button>
                    <button class="delete"  data-index="${index}">Delete</button>
                </td>
            </tr>
        `);





    });




}







let form = document.querySelector("#mainfromaddproduct")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const prodcutname = document.querySelector(".textinputproductname").value
    const barcode = document.querySelector(".barcode1").value;
    const category = document.querySelector("#category").value;
    const selling = document.querySelector(".sellingprice1").value;
    const quantity = document.querySelector(".quantity1").value;


    // const tbody = document.querySelector(".tbody")
    //  tbody.insertAdjacentHTML("beforeend", `  <tr class="tr1">
    //                     <td class="td1">${prodcutname}</td>
    //                     <td class="td1">${barcode}</td>
    //                     <td class="td1"><span class="badge">${category}</span></td>
    //                     <td class="td1">${selling}</td>
    //                     <td class="td1">${quantity}</td>
    //                     <td class="td1"><span class="badge status">In Stock</span></td>
    //                     <td class="td1">
    //                         <button class="edit">Edit</button>
    //                         <button class="delete">Delete</button>
    //                     </td>
    //                 </tr>`);



    //modern appoarch :-
    //    let alreadyExists = products.some(product => product.barcode === barcode);
    //  if (alreadyExists) {
    //     alert("Barcode already exists!");
    //     return;
    // }






    for (let i = 0; i < products.length; i++) {
        if (products[i].barcode === barcode) {
            alert("Barcode already exists!");
            form.reset();
            return;
        }
    }


    let product = {
        prodcutname,
        barcode,
        category,
        selling,
        quantity,

    };

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
    form.reset();

    dateInput.value = today;



    document.querySelector(".maindivform").style.display = "none";






});

displayProducts();

const tbody = document.querySelector(".tbody");

tbody.addEventListener("click", (e) => {

    if (e.target.classList.contains("delete")) {

        let index = e.target.dataset.index;

        products.splice(index, 1);

        localStorage.setItem("products", JSON.stringify(products));

        displayProducts();
    }

    if (e.target.classList.contains("edit")) {
        alert("coming soon")
    }

});


