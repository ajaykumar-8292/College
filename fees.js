// =====================================
// Fees Management System
// fees.js
// =====================================

// Elements
const feeForm = document.getElementById("feeForm");
const feeTable = document.getElementById("feeTable");
const searchFee = document.getElementById("searchFee");

const totalFees = document.getElementById("totalFees");
const paidFees = document.getElementById("paidFees");
const pendingFees = document.getElementById("pendingFees");

// Data
let fees = JSON.parse(localStorage.getItem("fees")) || [];
let editIndex = -1;

// =====================================
// Save Local Storage
// =====================================

function saveFees() {
    localStorage.setItem("fees", JSON.stringify(fees));
}

// =====================================
// Summary Cards
// =====================================

function updateSummary() {

    let total = 0;
    let paid = 0;

    fees.forEach(item => {

        total += Number(item.total);

        paid += Number(item.paid);

    });

    const pending = total - paid;

    totalFees.innerText = "₹" + total.toLocaleString();

    paidFees.innerText = "₹" + paid.toLocaleString();

    pendingFees.innerText = "₹" + pending.toLocaleString();

}

// =====================================
// Display Records
// =====================================

function displayFees(list = fees){

    feeTable.innerHTML = "";

    list.forEach((item,index)=>{

        feeTable.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${item.name}</td>

            <td>${item.roll}</td>

            <td>₹${Number(item.total).toLocaleString()}</td>

            <td>₹${Number(item.paid).toLocaleString()}</td>

            <td>

                <span class="${item.status=="Paid" ? "paid":"pending"}">

                ${item.status}

                </span>

            </td>

            <td>

                <button
                class="edit-btn"
                onclick="editFee(${index})">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteFee(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateSummary();

}

// =====================================
// Add / Update
// =====================================

feeForm.addEventListener("submit",function(e){

    e.preventDefault();

    const total = Number(document.getElementById("totalAmount").value);
    const paid = Number(document.getElementById("paidAmount").value);

    const fee={

        name:document.getElementById("studentName").value,

        roll:document.getElementById("rollNumber").value,

        total:total,

        paid:paid,

        status:document.getElementById("feeStatus").value

    };

    if(editIndex==-1){

        fees.push(fee);

    }else{

        fees[editIndex]=fee;

        editIndex=-1;

    }

    saveFees();

    displayFees();

    feeForm.reset();

});

// =====================================
// Edit
// =====================================

function editFee(index){

    const item = fees[index];

    document.getElementById("studentName").value=item.name;

    document.getElementById("rollNumber").value=item.roll;

    document.getElementById("totalAmount").value=item.total;

    document.getElementById("paidAmount").value=item.paid;

    document.getElementById("feeStatus").value=item.status;

    editIndex=index;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// =====================================
// Delete
// =====================================

function deleteFee(index){

    if(confirm("Delete this fee record?")){

        fees.splice(index,1);

        saveFees();

        displayFees();

    }

}

// =====================================
// Search
// =====================================

searchFee.addEventListener("keyup",()=>{

    const value = searchFee.value.toLowerCase();

    const filter = fees.filter(item=>

        item.name.toLowerCase().includes(value) ||

        item.roll.toLowerCase().includes(value)

    );

    displayFees(filter);

});

// =====================================
// First Load
// =====================================

displayFees();