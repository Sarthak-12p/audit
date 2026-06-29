let products = JSON.parse(localStorage.getItem("products")) || [];


const updateproduct = document.querySelector(".updateproduct");

updateproduct.textContent = `${products.length}`;