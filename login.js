// ---- Helpers ----
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
var PHONE_REGEX = /^0\d{1,2}-\d{7,8}$/;

function getUsers() {
  var users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function showError(id, message) {
  var el = document.getElementById(id);
  if (el) el.innerText = message;
}

// ---- Show/hide password ----
function showPassword(){
  var show = document.getElementById('Show')
  if (show.type=='password'){
    show.type='text';
  }
  else {
    show.type='password';
  }
}

// ---- Register (CreateAccount.html) ----
function Register(){
  showError('register-error', '');

  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('Show').value;
  var birthday = document.getElementById('birthday').value;
  var isMale = document.getElementById('gender').checked;
  var isFemale = document.getElementById('Female').checked;
  var gender = isMale && isFemale ? 'Male, Female' : isMale ? 'Male' : isFemale ? 'Female' : '';

  if (!EMAIL_REGEX.test(email)) {
    showError('register-error', 'Please enter a valid email address.');
    return;
  }
  if (!PASSWORD_REGEX.test(password)) {
    showError('register-error', 'Password must be at least 8 characters with letters and numbers.');
    return;
  }
  if (!birthday) {
    showError('register-error', 'Please enter your birthday.');
    return;
  }

  var users = getUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      showError('register-error', 'An account with this email already exists.');
      return;
    }
  }

  users.push({ email: email, password: password, birthday: birthday, gender: gender });
  saveUsers(users);
  window.location.href = 'login.html';
}

// ---- Login (login.html) ----
function LogIn(){
  showError('login-error', '');

  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('Show').value;

  if (!EMAIL_REGEX.test(email)) {
    showError('login-error', 'Please enter a valid email address.');
    return;
  }
  if (!password) {
    showError('login-error', 'Please enter your password.');
    return;
  }

  var users = getUsers();
  var found = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      found = users[i];
      break;
    }
  }

  if (!found) {
    showError('login-error', 'No account found with this email.');
    return;
  }
  if (found.password !== password) {
    showError('login-error', 'Incorrect password.');
    return;
  }

  localStorage.setItem('currentUser', email);
  window.location.href = 'index.html';
}

// ---- Feedback (support.html) ----
function SubmitFunction(){
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var phone = document.getElementById('phone').value.trim();
  var message = document.getElementById('message').value.trim();

  if (!name) {
    alert("Please enter your name.");
    return;
  }
  if (!EMAIL_REGEX.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!PHONE_REGEX.test(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }
  if (!message) {
    alert("Please enter your message.");
    return;
  }

  alert("Your feedback has been submitted!");
}

// ---- Session guard ----
function checkSession(){
  var page = window.location.pathname.split('/').pop();
  var currentUser = localStorage.getItem('currentUser');
  if (page === 'index.html' && !currentUser) {
    window.location.href = 'login.html';
  }
}
document.addEventListener('DOMContentLoaded', checkSession);
