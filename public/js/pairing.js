const inputs = document.querySelectorAll('input[maxlength="1"]');
const connectBtn = document.getElementById("connectBtn");

// ✅ Auto move next
inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    if (value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    updateButtonState();
  });

  // ✅ Backspace move back
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });

  // ✅ Paste full code
  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pasteData)) return;

    pasteData.split("").forEach((char, i) => {
      if (inputs[i]) inputs[i].value = char;
    });

    inputs[5].focus();
    updateButtonState();
  });
});

// ✅ Enable button only when complete
function updateButtonState() {
  const code = getCode();
  connectBtn.disabled = code.length !== 6;
  connectBtn.classList.toggle("opacity-50", code.length !== 6);
}

// ✅ Get full code
function getCode() {
  return Array.from(inputs).map(i => i.value).join("");
}

// ✅ Connect API
connectBtn.addEventListener("click", async () => {
  const code = getCode();
  if (code.length !== 6) return;

  // UI loading
  connectBtn.innerText = "Connecting...";
  connectBtn.disabled = true;
const caregiverId = "69f1e6c45e464051447c6237";

  try {
    const res = await fetch("http://localhost:3000/api/pair", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
     body: JSON.stringify({ code, caregiverId })
    });

    const data = await res.json();

    if (res.ok) {
      showSuccess("Patient connected successfully ✅");
      clearInputs();
    } else {
      showError(data.message || "Invalid code");
    }

  } catch (err) {
    showError("Network error");
  }

  connectBtn.innerText = "Connect Patient";
  updateButtonState();
});

// ✅ Helpers
function clearInputs() {
  inputs.forEach(i => i.value = "");
  inputs[0].focus();
}

function showSuccess(msg) {
  alert(msg); // replace with toast later
}

function showError(msg) {
  alert(msg); // replace with toast later
}

// init
updateButtonState();
inputs[0].focus();