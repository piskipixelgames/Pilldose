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
           showToast(
  "There is an issue creating your account, Try again",
  "error"
);
      alert(data.error);
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", data.token);

    console.log("User registered successfully:", data.user);

               showToast(
  "Success",
  "success"
);
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

