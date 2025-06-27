


const form = document.querySelector("#contact-form");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formBtnText = formBtn.querySelector("span");

// Your Google Apps Script deployment URL
const scriptURL = "https://script.google.com/macros/s/AKfycbzHITq_P1evXm9iWR-sbEEOFbzSwvYaHVACSKDGsezyQVRP2ogiQDhsKa-VZnhrcqc3Mw/exec";

// Enable/disable submit button
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Device detection
function getDeviceType() {
  return /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
}

// Submit handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // UI feedback
  formBtn.disabled = true;
  const originalText = formBtnText.textContent;
  formBtnText.textContent = "Sending...";

  // Prepare data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
    deviceType: getDeviceType()
  };

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Message sent successfully!");
      form.reset();
      formBtn.disabled = true;
    } else {
      alert("Something went wrong. Please try again.");
    }

  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred while sending the message.");
  } finally {
    formBtnText.textContent = originalText;
  }
});

