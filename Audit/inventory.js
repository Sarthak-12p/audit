let products = JSON.parse(localStorage.getItem("products")) || [];






let tbody = document.querySelector(".tbody")


function displayinventory() {
    tbody.innerHTML = "";
    products.forEach((product, index) => {


        let status = product.quantity;
        let quantity1 = status;   // or whatever variable stores the stock quantity

        if (quantity1 >= 30) {
            status = "In Stock";
        }
        else if (quantity1 >= 15) {
            status = "medium";
        }
        else {
            status = "Low Stock";
        }


        let className;

        if (status === "Low Stock") {
            className = "low"
        }
        else if (status === "medium") {
            className = "medium"
        }
        else {
            className = "in"
        }
        tbody.insertAdjacentHTML("beforeend", `
        <tr class="tr1">
                <td class="td1">${product.prodcutname}</td>
              
                <td class="td1"><span class="badge">${product.category}</span></td>
                <td class="td1">${product.quantity}</td>
                <td class="td1">
               
                <div class="progress-container">
         <div class="progressbar">
            <div class="progressfill ${className}" style="width:${product.quantity}%"></div>
        </div>
        <span class="percent">${product.quantity}%</span>
              </div>

                </td>
                
                
                <td class="td1"><span class="badge status ${className}" id="stock">${status}</span></td>
               
            </tr>` )
    });
}

displayinventory();


