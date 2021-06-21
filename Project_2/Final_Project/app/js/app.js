const auth = firebase.auth();
const db = firebase.firestore();
const bucket = firebase.storage().ref();
window.user = undefined;
window.sessionList = [];
activeIndex = 0;

var toolbarOptions = [
  [{'font': []}, {'size': ['small', false, 'large', 'huge']}],
  ['bold', 'italic', 'underline', 'strike', 'code'],
  [{'color': []}, { 'background': []}],
  [{'align': []}, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  ['link']
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
    appContent();
  }
  else {
    user = undefined;
    appContent();
  }
});

function signOut() {
  auth.signOut();
}

function appContent() {
  if (!auth.currentUser) {
    $('#welcome').html(`Welcome, guest. Sign in to access the full features of Code-laborate. <a class="btn btn-success" href="login.html">Sign In</a>`);
    document.getElementById("newPostBtn").style.display = "none"
  } else {
    $('#welcome').html(`Welcome, ${auth.currentUser.email.split('@').shift()}. <button class="btn btn-danger" onclick="signOut()">Sign Out</button>`);
    document.getElementById("newPostBtn").style.display = "block"
  }

  getProjects()
}

async function post() {
  var title = $('#title').val();
  var files = $('#formFileMultiple').get(0).files;

  if (!files.length) {
    // No files
    alert('You must add a file.');
    return;
  }

  var random = Math.floor(Math.random() * 696969);
  var newFiles = [];
  for (let i = 0; i < files.length; i++) {
    newFiles.push(files[i].name)    ;
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
  });
  console.log('Text Succesfully Uploaded');
  for (let i = 0; i < files.length; i++) {
    await bucket.child(`userData/${auth.currentUser.uid}/${random}${files[i].name}`).put(files[i]);
  }
  console.log('Images Succesfully Uploaded');

  alert('Your post is uploaded! :D');
  window.location.reload();
}

async function getProjects() {
  var data = await db.collection("posts").get();
  // data.docs is a list of documents. Get a random one:
  sessionList = shuffle(data.docs);
  console.log(sessionList);
  NextPost();
}

function NextPost() {
  // sessionList[activeIndex]
  var imageComponent = ""
  for (let i = 0; i < sessionList[activeIndex].data().files.length; i++) {
    const img = sessionList[activeIndex].data().files[i];
    // https://firebasestorage.googleapis.com/v0/b/project-2-db659.appspot.com/o/userData%2Fyk7mzJzXD7OaHTvpzy7ka8Cx9e42%2F320024Screen%20Shot%202021-02-22%20at%2013.08.02.png?alt=media&token=eabea021-775a-4b5b-a89c-88003a938070
    const pathToImage = `https://firebasestorage.googleapis.com/v0/b/project-2-db659.appspot.com/o/userData%2F${sessionList[activeIndex].data().author.uid}%2F${sessionList[activeIndex].data().random}${img}?alt=media`
    var imageComponent = imageComponent + `<img src="${pathToImage}" />`
  }
  $('#activeProjectShowcase').html(`
    <p>Project by ${sessionList[activeIndex].data().author.name} called "${sessionList[activeIndex].data().title}" of INDEX ${activeIndex}.</p>
    <p>${sessionList[activeIndex].data().content}</p>
    ${imageComponent}
  `)
  $('#nextPost').removeClass('disabled')
  if (activeIndex == (sessionList.length - 1)) {
    // There is no next post, disable the button
    $('#nextPost').addClass('disabled')
  }
  $('#prevPost').removeClass('disabled')
  if (activeIndex < 1) {
    // There is no previous post, disable the button
    $('#prevPost').addClass('disabled')
  }
  activeIndex++;
}

function PreviousPost() {
  activeIndex = activeIndex - 2;
  NextPost();
}

// shuffle function copied from stack overflow
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}