document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#lostForm");
  const feedback = document.querySelector("#feedback");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Collect form data
    const formData = new FormData(form);
    const lostData = {
      name: formData.get("name"),
      description: formData.get("description"),
      date: formData.get("date"),
      location: formData.get("location"),
      contact: formData.get("contact"),
    };

    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      feedback.textContent = "You need to be logged in to report a lost item.";
      feedback.style.color = "red";
      console.error("Token not found in localStorage!");
      return;
    }

    try {
      // Send data to the backend API with the Authorization token
      const response = await fetch("http://localhost:3000/api/lost", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Attach JWT token
        },
      body: formData,
      });

      if (response.ok) {
        alert("Lost item reported successfully!");
        form.reset(); // Clear the form
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to report lost item.");
      }
    } catch (error) {
      console.error(error.message);
      alert("An error occurred. Please try again later.");
    }
  });
});