document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const payload = { email, password };

  console.log("Login request:", payload);

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    console.log("Login response:", data);

    if (data.error) {
      alert(data.error);
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", data.token);

    console.log("Login successful:", data.user);

 localStorage.setItem("user", JSON.stringify(data.user));
 
    if (data.user.role === "PATIENT") {
      window.location.href = "file:///Users/wajahathafeez/Desktop/Pillbox%20AR/public/pages/patient.html";
    } else {
      window.location.href = "file:///Users/wajahathafeez/Desktop/Pillbox%20AR/public/pages/caregiver.html";
    }


  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong");
  }
});