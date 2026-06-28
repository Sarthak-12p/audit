let products = JSON.parse(localStorage.getItem("products")) || [];



let searchbtn = document.querySelector(".search")
let cardbill = document.querySelector(".cardbilladd")

searchbtn.addEventListener("click", () => {
    let barcodesearch = document.querySelector("#barcodesearch").value.trim();
    let found = false;





    products.filter(function (product) {
        if (barcodesearch === product.barcode) {
            found = true;
            console.log(product.barcode)
             return cardbill.insertAdjacentHTML("beforeend", `
         <h1>${product.barcode}</h1>`
            )
        };
    });

    if (!found) {
        alert("Product not found");
    }

    document.querySelector("#barcodesearch").value = "";


});


