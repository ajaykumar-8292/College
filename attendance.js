// =====================================
// Attendance Management System
// attendance.js
// =====================================

const attendanceForm = document.getElementById("attendanceForm");
const attendanceTable = document.getElementById("attendanceTable");
const searchAttendance = document.getElementById("searchAttendance");

let attendanceData =
JSON.parse(localStorage.getItem("attendance")) || [];

let editIndex = -1;

// =====================================
// Save Local Storage
// =====================================

function saveAttendance(){

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendanceData)
    );

}

// =====================================
// Display Attendance
// =====================================

function displayAttendance(list = attendanceData){

    attendanceTable.innerHTML = "";

    list.forEach((item,index)=>{

        attendanceTable.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${item.name}</td>

            <td>${item.roll}</td>

            <td>${item.date}</td>

            <td>

                <span class="${
                    item.status==="Present"
                    ?"present":"absent"
                }">

                ${item.status}

                </span>

            </td>

            <td>

                <button
                class="edit-btn"
                onclick="editAttendance(${index})">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteAttendance(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// =====================================
// Add Attendance
// =====================================

attendanceForm.addEventListener("submit",function(e){

    e.preventDefault();

    const attendance={

        name:
        document.getElementById("studentName").value,

        roll:
        document.getElementById("rollNumber").value,

        date:
        document.getElementById("attendanceDate").value,

        status:
        document.getElementById("attendanceStatus").value

    };

    if(editIndex===-1){

        attendanceData.push(attendance);

    }else{

        attendanceData[editIndex]=attendance;

        editIndex=-1;

    }

    saveAttendance();

    displayAttendance();

    attendanceForm.reset();

});

// =====================================
// Edit
// =====================================

function editAttendance(index){

    document.getElementById("studentName").value =
    attendanceData[index].name;

    document.getElementById("rollNumber").value =
    attendanceData[index].roll;

    document.getElementById("attendanceDate").value =
    attendanceData[index].date;

    document.getElementById("attendanceStatus").value =
    attendanceData[index].status;

    editIndex=index;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// =====================================
// Delete
// =====================================

function deleteAttendance(index){

    if(confirm("Delete Attendance Record?")){

        attendanceData.splice(index,1);

        saveAttendance();

        displayAttendance();

    }

}

// =====================================
// Search
// =====================================

searchAttendance.addEventListener("keyup",()=>{

    const value=
    searchAttendance.value.toLowerCase();

    const filter=
    attendanceData.filter(item=>

        item.name.toLowerCase().includes(value) ||

        item.roll.toLowerCase().includes(value)

    );

    displayAttendance(filter);

});

// =====================================
// First Load
// =====================================

displayAttendance();