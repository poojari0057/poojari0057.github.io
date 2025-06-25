const form = document.getElementById("contact-form");
  const button = form.querySelector("button");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Disable button and show loading text
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Sending...";

    const formData = new FormData(form);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwEx_xFp5dy5fxaUpqBfD24zHFR8hukOaTrDhYLCWaSL9Kr0EeFs5lP9AqYiXrWWo00ug/exec", {
        method: "POST",
        body: formData
      });

      alert("Thank you! Your message has been sent.");
      form.reset();
    } catch (error) {
      alert("Oops! Something went wrong.");
      console.error(error);
    } finally {
      // Restore button after 2 seconds
      button.disabled = false;
      button.textContent = originalText;
    }
  });
