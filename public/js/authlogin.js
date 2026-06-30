function showToast(message, type = "success") {

const toast = document.getElementById("toast");
console.log(toast.className);

  toast.innerText = message;

  toast.classList.remove(
    "hidden",
    "bg-green-600",
    "bg-red-600",
    "bg-blue-600"
  );

  switch (type) {
    case "error":
      toast.classList.add("bg-red-600");
      break;

    case "info":
      toast.classList.add("bg-blue-600");
      break;

    default:
      toast.classList.add("bg-green-600");
  }

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}




document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const payload = { email, password };

  console.log("Login request:", payload);





  try {
    const res = await fetch("https://pilldose.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    console.log("Login response:", data);

    if (data.error) {
      showToast(
  "Enter valid credentials and try again",
  "error"
);
      alert(data.error);
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", data.token);

    console.log("Login successful:", data.user);

 localStorage.setItem("user", JSON.stringify(data.user));
 
 showToast(
  "Success",
  "success"
);
 
    if (data.user.role === "PATIENT") {
      window.location.href = "patient.html";
    } else {
      window.location.href = "caregiver.html";
    }


  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong");
  }
});