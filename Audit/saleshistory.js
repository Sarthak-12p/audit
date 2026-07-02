let sales = JSON.parse(localStorage.getItem("sales")) || [];



let tbodys = document.querySelector(".tbodys")

function displaysales(){
    tbodys.innerHTML = "";

    sales.forEach((sale , index)=>{
        tbodys.insertAdjacentHTML("beforeend", `
             <tr class="tr3">
                <td class="td3">${sale.id}</td>
                <td class="td3">${sale.date}</td>
                <td class="td3">₹${sale.amount}</td>
                <td class="td3">${sale.paymentmethod}</td>
                <td class="td3">${sale.items}</td>
                 <td class="td3">
                    <button class="view"  data-index="${index}">View</button>
                </td>
                
                
               
            </tr>`)
    } )
}


let view = document.querySelector(".view")

view.addEventListener("click" , ()=>{
    alert("coming soon....!")
})




displaysales();