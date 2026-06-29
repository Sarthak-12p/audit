
let expensecarts = JSON.parse(localStorage.getItem("expensecarts")) || [];

let addexpense = document.querySelector(".addexpensebutton")

addexpense.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector(".maindivform1").style.display = "initial";

})

let buttonxe = document.querySelector(".buttonxe")

buttonxe.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".maindivform1").style.display = "none";
    
})





const dateInput = document.getElementById("date");

const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

let tbodye  = document.querySelector(".tbody1")
function displayexpense(){
        tbodye.innerHTML = "";

        expensecarts.forEach((cart , index) => {
            tbodye.insertAdjacentHTML("beforeend" , ` 
                        <tr class="tr2">
                            <td class="td2">${cart.expensename}</td>
                            <td class="td2"><span class="badge">${cart.category}</span></td>
                            <td class="td2">₹${cart.amount}</td>
                            <td class="td2">${cart.date}</td>
                            <td class="td2">
                    
                    <button class="delete1"  data-index="${index}">Delete</button>
                </td> 
                        </tr>`)
        });
}

let form1 = document.querySelector("#mainfromaddexpense")

form1.addEventListener("submit" , (e)=>{
    e.preventDefault();
    const expensename = document.querySelector(".textinputexpensename").value
    const amount = document.querySelector(".amount").value
    const category = document.querySelector("#category1").value
    const date = document.querySelector("#date").value

    let expensecart ={
        expensename,
        amount,
        category,
        date
    }

    expensecarts.push(expensecart);


    localStorage.setItem("expensecarts", JSON.stringify(expensecarts));
    displayexpense();
      
    form1.reset();

 


    
    document.querySelector(".maindivform1").style.display = "none";
    
})


 displayexpense();


 tbodye.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("delete1")){
       let index = e.target.dataset.index;

       expensecarts.splice(index ,1)
       localStorage.setItem("expensecarts", JSON.stringify(expensecarts));
       displayexpense();
    }
 })