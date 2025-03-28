console.log('✅ JavaScript is running!');

function toggleNav() {
  document.getElementById('navbar').classList.toggle('open');
  console.log('toggle nav is happening');
}

function closeNav() {
  document.getElementById('navbar').classList.remove('open');
}
