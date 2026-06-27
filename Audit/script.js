
let addproduct = document.querySelector(".buttonaddprodcut")

addproduct.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector(".maindivform").style.display = "initial";
    document.querySelector(".tablemain").style.display = "none";
})

let buttonx = document.querySelector(".buttonx")

buttonx.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".maindivform").style.display = "none";
    document.querySelector(".tablemain").style.display = "initial";
})





let form = document.querySelector("#mainfromaddproduct")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const prodcutname = document.querySelector(".textinputproductname").value
    const barcode = document.querySelector(".barcode1").value;
    const category = document.querySelector("#category").value;
    const selling = document.querySelector(".sellingprice1").value;
    const quantity = document.querySelector(".quantity1").value;
    const tbody = document.querySelector(".tbody")
  tbody.insertAdjacentHTML("beforeend", `  <tr class="tr1">
                        <td class="td1">${prodcutname}</td>
                        <td class="td1">${barcode}</td>
                        <td class="td1"><span class="badge">${category}</span></td>
                        <td class="td1">${selling}</td>
                        <td class="td1">${quantity}</td>
                        <td class="td1"><span class="badge status">In Stock</span></td>
                        <td class="td1">
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                        </td>
                    </tr>`);


    document.querySelector(".maindivform").style.display = "none";
    document.querySelector(".tablemain").style.display = "initial";

    form.reset();


});



