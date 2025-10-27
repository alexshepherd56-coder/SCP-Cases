// Sign up new users
async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection("users").doc(userCred.user.uid).set({
      email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById("status").innerText = "Account created and logged in!";
  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
}

// Log in existing users
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCred = await auth.signInWithEmailAndPassword(email, password);
    await db.collection("users").doc(userCred.user.uid).update({
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById("status").innerText = "Logged in!";
  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
}
