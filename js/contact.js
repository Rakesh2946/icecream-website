/* =========================================================
   Frosty & Co. — contact page logic
   (Demo only — no backend, just validates and confirms)
   ========================================================= */

function toggleContactError(fieldId, show){
  const field = document.getElementById(fieldId);
  const err = document.getElementById("err-" + fieldId);
  if(err) err.classList.toggle("show", show);
  if(field) field.style.borderColor = show ? "var(--coral-dark)" : "var(--line)";
}

function initContactForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const message = document.getElementById("cMessage").value.trim();

    let valid = true;

    toggleContactError("cName", name.length === 0);
    if(name.length === 0) valid = false;

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    toggleContactError("cEmail", !emailValid);
    if(!emailValid) valid = false;

    toggleContactError("cMessage", message.length === 0);
    if(message.length === 0) valid = false;

    if(!valid) return;

    showToast("Message sent — we'll get back to you soon!");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", initContactForm);
