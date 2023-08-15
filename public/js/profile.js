// JavaScript section at the end of your HTML
document.getElementById("myDropdown").addEventListener("click", function(event) {
    event.stopPropagation();
});

document.getElementById("profileLink").addEventListener("click", function() {
    // Replace with actual data from your user object
    var user = {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "john@example.com",
        profilePicture: "path_to_your_profile_picture.jpg"
    };

    document.getElementById("firstName").textContent = user.firstName;
    document.getElementById("lastName").textContent = user.lastName;
    document.getElementById("username").textContent = user.username;
    document.getElementById("email").textContent = user.email;
    document.getElementById("profilePicture").src = user.profilePicture;

    document.getElementById("profileModal").classList.remove("hidden");
});

document.getElementById("closeModalBtn").addEventListener("click", function() {
    document.getElementById("profileModal").classList.add("hidden");
});
