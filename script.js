const form = document.getElementById("contact-form");
const button = form.querySelector("button");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = "Sending...";

  const formData = new FormData(form);
  formData.append("deviceType", /Mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop");


  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwEx_xFp5dy5fxaUpqBfD24zHFR8hukOaTrDhYLCWaSL9Kr0EeFs5lP9AqYiXrWWo00ug/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alert("Thank you! Your message has been sent.");
      form.reset();
    } else {
      alert("Failed to send. Please try again later.");
    }
  } catch (error) {
    alert("Oops! Something went wrong.");
    console.error(error);
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});
