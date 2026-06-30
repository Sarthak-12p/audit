let products = JSON.parse(localStorage.getItem("products")) || [];
let expensecarts = JSON.parse(localStorage.getItem("expensecarts")) || [];


const updateproduct = document.querySelector(".updateproduct");

updateproduct.textContent = `${products.length}`;

let expensetotal = document.querySelector("#expensetotal");

function updateexpensetotal(){
    let totalexpense = 0;

    expensecarts.forEach(cart => {
        totalexpense = totalexpense + parseFloat(cart.amount)
        
    });

    expensetotal.textContent = `₹${totalexpense.toFixed(2)}`
}

updateexpensetotal();