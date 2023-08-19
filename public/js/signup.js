const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#first-name").value.trim();
  const lastName = document.querySelector("#last-name").value.trim();

  const email = document.querySelector("#signup-email").value.trim();
  const password = document.querySelector("#signup-password").value.trim();

  if (firstName && lastName && email && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({
        name: firstName + " " + lastName,
        email,
        password,
        darkMode: false,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/overview");
    } else {
      alert("Failed to sign up");
    }
  }
};

document
  .querySelector("#signupForm")
  .addEventListener("submit", signupFormHandler);
