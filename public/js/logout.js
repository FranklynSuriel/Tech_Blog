const logoutUser = document.querySelector('#logout');

function handleLogout() {
  fetch('/api/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(() => {
      document.location.replace('/');
    })
    .catch((err) => console.log(err));
}

logoutUser.addEventListener('click', handleLogout);
