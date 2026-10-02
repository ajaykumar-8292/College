// =====================================
// Results Management System
// Part 22A
// =====================================

// Elements
const resultForm = document.getElementById("resultForm");
const resultTable = document.getElementById("resultTable");
const searchResult = document.getElementById("searchResult");

// Data
let results = JSON.parse(localStorage.getItem("results")) || [];
let editIndex = -1;

// =====================================
// Save Local Storage
// =====================================

function saveResults() {
    localStorage.setItem("results", JSON.stringify(results));
}

// =====================================
// Grade Calculator
// =====================================

function getGrade(percentage) {

    if (percentage >= 90) {
        return {
            grade: "A+",
            className: "grade-a-plus"
        };
    }

    if (percentage >= 80) {
        return {
            grade: "A",
            className: "grade-a"
        };
    }

    if (percentage >= 70) {
        return {
            grade: "B",
            className: "grade-b"
        };
    }

    if (percentage >= 60) {
        return {
            grade: "C",
            className: "grade-c"
        };
    }

    if (percentage >= 40) {
        return {
            grade: "D",
            className: "grade-d"
        };
    }

    return {
        grade: "Fail",
        className: "grade-fail"
    };

}

// =====================================
// Display Results
// =====================================

function displayResults(list = results) {

    resultTable.innerHTML = "";

    list.forEach((student, index) => {

        const total =
            Number(student.english) +
            Number(student.math) +
            Number(student.science) +
            Number(student.computer);

        const percentage = (total / 400 * 100).toFixed(2);

        const grade = getGrade(percentage);

        resultTable.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.roll}</td>

            <td>${total}/400</td>

            <td>${percentage}%</td>

            <td>

                <span class="${grade.className}">

                    ${grade.grade}

                </span>

            </td>

            <td>

                <button
                class="edit-btn"
                onclick="editResult(${index})">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteResult(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// =====================================
// Add / Update Result
// =====================================

resultForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const student = {

        name:
        document.getElementById("studentName").value,

        roll:
        document.getElementById("rollNumber").value,

        english:
        document.getElementById("english").value,

        math:
        document.getElementById("math").value,

        science:
        document.getElementById("science").value,

        computer:
        document.getElementById("computer").value

    };

    if (editIndex === -1) {

        results.push(student);

    } else {

        results[editIndex] = student;

        editIndex = -1;

    }

    saveResults();

    displayResults();

    resultForm.reset();

});

// =====================================
// Edit Result
// =====================================

function editResult(index){

    const student = results[index];

    document.getElementById("studentName").value =
    student.name;

    document.getElementById("rollNumber").value =
    student.roll;

    document.getElementById("english").value =
    student.english;

    document.getElementById("math").value =
    student.math;

    document.getElementById("science").value =
    student.science;

    document.getElementById("computer").value =
    student.computer;

    editIndex = index;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// =====================================
// Delete Result
// =====================================

function deleteResult(index){

    if(confirm("Delete this result record?")){

        results.splice(index,1);

        saveResults();

        displayResults();

    }

}

// =====================================
// Search Result
// =====================================

searchResult.addEventListener("keyup",()=>{

    const value =
    searchResult.value.toLowerCase();

    const filtered =
    results.filter(student =>

        student.name.toLowerCase().includes(value) ||

        student.roll.toLowerCase().includes(value)

    );

    displayResults(filtered);

});

// =====================================
// Initial Load
// =====================================

displayResults();