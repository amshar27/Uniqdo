function logOut() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
function addToBag(btn) {
  alert("Added to bag!");
}
