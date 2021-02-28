const auth = firebase.auth();
const db = firebase.firestore();

function signUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
    window.location.replace('index.html');
  }).catch((error) => {
    alert(`Error: ${error.message}`);
  })
}

function login() {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    window.location.replace('index.html');
  })
  .catch((error) => {
    alert(`Error: ${error.message}`);
  });
}