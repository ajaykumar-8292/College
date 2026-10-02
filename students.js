// =====================================
// Student Management System
// students.js
// =====================================

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("searchStudent");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// ==========================
// Save Local Storage
// ==========================

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

// ==========================
// Display Students
// ==========================

function displayStudents(list = students) {

    table.innerHTML = "";

    list.forEach((student, index) => {

        table.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.roll}</td>

            <td>${student.course}</td>

            <td>${student.email}</td>

            <td>

                <button class="edit"
                onclick="editStudent(${index})">

                Edit

                </button>

                <button class="delete"
                onclick="deleteStudent(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================
// Add Student
// ==========================

form.addEventListener("submit", function(e){

    e.preventDefault();

    const student = {

        name: document.getElementById("name").value,

        roll: document.getElementById("roll").value,

        course: document.getElementById("course").value,

        email: document.getElementById("email").value

    };

    if(editIndex === -1){

        students.push(student);

    }else{

        students[editIndex] = student;

        editIndex = -1;

    }

    saveStudents();

    displayStudents();

    form.reset();

});

// ==========================
// Edit Student
// ==========================

function editStudent(index){

    document.getElementById("name").value =
    students[index].name;

    document.getElementById("roll").value =
    students[index].roll;

    document.getElementById("course").value =
    students[index].course;

    document.getElementById("email").value =
    students[index].email;

    editIndex = index;

}

// ==========================
// Delete Student
// ==========================

function deleteStudent(index){

    if(confirm("Delete this student?")){

        students.splice(index,1);

        saveStudents();

        displayStudents();

    }

}

// ==========================
// Search Student
// ==========================

search.addEventListener("keyup", ()=>{

    const value = search.value.toLowerCase();

    const filter = students.filter(student =>

        student.name.toLowerCase().includes(value) ||

        student.roll.toLowerCase().includes(value) ||

        student.course.toLowerCase().includes(value)

    );

    displayStudents(filter);

});

// ==========================
// First Load
// ==========================

displayStudents();