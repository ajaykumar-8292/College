// =============================
// College Management System
// login.js
// =============================

// Elements
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const form = document.querySelector("form");

// =============================
// Show / Hide Password
// =============================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});

// =============================
// Login Validation
// Demo Login
// =============================

form.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
        document.querySelector("input[type='text']").value.trim();

    const userPassword =
        document.getElementById("password").value.trim();

    const role =
        document.querySelector("select").value;

    if(username === "" || userPassword === "" || role === ""){

        alert("Please fill all fields.");
        return;

    }

    // =============================
    // Demo Credentials
    // =============================

    if(role === "Admin"){

        if(username === "admin" && userPassword === "admin123"){

            alert("Admin Login Successful");

            window.location.href = "dashboard.html";

        }else{

            alert("Invalid Admin Username or Password");

        }

    }

    else if(role === "Teacher"){

        if(username === "teacher" && userPassword === "teacher123"){

            alert("Teacher Login Successful");

            window.location.href = "teacher-dashboard.html";

        }else{

            alert("Invalid Teacher Username or Password");

        }

    }

    else if(role === "Student"){

        if(username === "student" && userPassword === "student123"){

            alert("Student Login Successful");

            window.location.href = "student-dashboard.html";

        }else{

            alert("Invalid Student Username or Password");

        }

    }

});

// =============================
// Auto Focus
// =============================

window.onload = () => {

    document.querySelector("input[type='text']").focus();

};