function sendMail(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    // Get form values
    let parms = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    // Validate form fields
    if (!parms.fullName || !parms.email || !parms.message) {
        alert("Please fill in all fields");
        return;
    }

    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(parms.email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Send email using EmailJS
    // Using the service ID and template ID from your screenshots
    emailjs.send("service_6iyb12z", "template_y45bo4c", parms)
        .then(function(response) {
            alert("Email Sent Successfully!");
            console.log("SUCCESS!", response.status, response.text);
            
            // Clear the form
            document.getElementById("fullName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        })
        .catch(function(error) {
            alert("Failed to send email. Please try again.");
            console.log("EmailJS Error:", error);
        });
}