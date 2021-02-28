const auth = firebase.auth();
const db = firebase.firestore();
const bucket = firebase.storage().ref()
window.user = undefined

var toolbarOptions = [
  [{'font': []}, {'size': ['small', false, 'large', 'huge']}],
  ['bold', 'italic', 'underline', 'strike', 'code'],
  [{'color': []}, { 'background': []}],
  [{'align': []}, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  ['link', 'image', 'video']
];
var quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
      toolbar: toolbarOptions
  }
});

auth.onAuthStateChanged((user) => {
  if (user) {
    user = auth.currentUser;
    appContent()
  }
  else {
    user = undefined;
    appContent()
  }
});

function signOut() {
  auth.signOut()
}

function appContent() {
  if (!auth.currentUser) {
    $('#welcome').html(`Welcome, guest. <a href="login.html">Sign in?</a>`)
  } else {
    $('#welcome').html(`Welcome, ${auth.currentUser.email.split('@').shift()}. <button onclick="signOut()">Sign Out</button>`)
  }
}

async function post() {
  var title = $('#title').val();
  var files = $('#formFileMultiple').get(0).files;
  var random = Math.floor(Math.random() * 696969);
  var newFiles = []
  for (let i = 0; i < files.length; i++) {
    newFiles.push(files[i].name)    
  }
  console.log(title, quill.root.innerHTML, files);
  await db.collection('posts').add({
    title: title,
    author: {
      name: auth.currentUser.email.split('@').shift(),
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
    },
    content:  quill.root.innerHTML,
    random: random,
    files: newFiles,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  console.log('Success.1')
  for (let i = 0; i < files.length; i++) {
    await bucket.child(`userData/${auth.currentUser.uid}/${random}${files[i].name}`).put(files[i])
  }
  console.log('Success.2')
}

async function getProjects() {
  data = await db.collection("posts").doc("pLZJZ3NrNIB7NLGzbqzO").get()
  console.log(data.data())
}