document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const role = document.querySelector('input[name="role"]:checked')?.value;
  const terms = document.getElementById("terms").checked;

  if (!terms) {
    alert("Please accept terms");
    return;
  }

  if (!role) {
    alert("Please select a role");
    return;
  }

  const payload = {
    name,
    email,
    password,
    role
  };

  // ✅ Log outgoing request data
  console.log("Sending signup data:", payload);

  try {
    const res = await fetch(" https://pilldose.onrender.com/auth/register", { // 👈 replace PORT
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    // ✅ Log response from backend
    console.log("Response from server:", data);

    if (data.error) {
      alert(data.error);
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", data.token);

    console.log("User registered successfully:", data.user);

    // ✅ Redirect based on role
    if (data.user.role === "PATIENT") {
      window.location.href = "index.html";
    } else {
      window.location.href = "index.html";
    }

  } catch (err) {
    console.error("Signup error:", err);
    alert("Something went wrong. Please try again.");
  }
});

