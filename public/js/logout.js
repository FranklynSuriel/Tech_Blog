const logoutUser = document.querySelector('#logout');

const logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    console.log(response);
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

logoutUser.addEventListener('click', logout);
