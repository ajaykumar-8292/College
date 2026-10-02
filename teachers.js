// =====================================
// Teacher Management System
// teachers.js
// =====================================

// Elements
const teacherForm = document.getElementById("teacherForm");
const teacherTable = document.getElementById("teacherTable");
const searchTeacher = document.getElementById("searchTeacher");

// Teacher Data
let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
let editIndex = -1;

// =====================================
// Save Local Storage
// =====================================

function saveTeachers() {
    localStorage.setItem("teachers", JSON.stringify(teachers));
}

// =====================================
// Display Teachers
// =====================================

function displayTeachers(list = teachers) {

    teacherTable.innerHTML = "";

    list.forEach((teacher, index) => {

        teacherTable.innerHTML += `
        <tr>

            <td>${index + 1}</td>

            <td>${teacher.name}</td>

            <td>${teacher.id}</td>

            <td>${teacher.subject}</td>

            <td>${teacher.email}</td>

            <td>${teacher.phone}</td>

            <td>

                <button class="edit-btn"
                    onclick="editTeacher(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTeacher(${index})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

}

// =====================================
// Add / Update Teacher
// =====================================

teacherForm.addEventListener("submit", function(e){

    e.preventDefault();

    const teacher = {

        name: document.getElementById("teacherName").value.trim(),

        id: document.getElementById("teacherId").value.trim(),

        subject: document.getElementById("teacherSubject").value.trim(),

        email: document.getElementById("teacherEmail").value.trim(),

        phone: document.getElementById("teacherPhone").value.trim()

    };

    if(editIndex === -1){

        teachers.push(teacher);

    }else{

        teachers[editIndex] = teacher;

        editIndex = -1;

    }

    saveTeachers();

    displayTeachers();

    teacherForm.reset();

});

// =====================================
// Edit Teacher
// =====================================

function editTeacher(index){

    document.getElementById("teacherName").value =
        teachers[index].name;

    document.getElementById("teacherId").value =
        teachers[index].id;

    document.getElementById("teacherSubject").value =
        teachers[index].subject;

    document.getElementById("teacherEmail").value =
        teachers[index].email;

    document.getElementById("teacherPhone").value =
        teachers[index].phone;

    editIndex = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// =====================================
// Delete Teacher
// =====================================

function deleteTeacher(index){

    if(confirm("Are you sure you want to delete this teacher?")){

        teachers.splice(index,1);

        saveTeachers();

        displayTeachers();

    }

}

// =====================================
// Search Teacher
// =====================================

searchTeacher.addEventListener("keyup", function(){

    const value = this.value.toLowerCase();

    const filtered = teachers.filter(teacher =>

        teacher.name.toLowerCase().includes(value) ||

        teacher.id.toLowerCase().includes(value) ||

        teacher.subject.toLowerCase().includes(value) ||

        teacher.email.toLowerCase().includes(value)

    );

    displayTeachers(filtered);

});

// =====================================
// Initial Load
// =====================================

displayTeachers();