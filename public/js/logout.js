const logoutUser = document.querySelector('#logout');

const logout = async () => {
  // sent a post request to the API endpoint
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  });

  if (response.ok) {    
    document.location.replace('/');    
  } else {
    alert('Failed to log out.');
  }
};

logoutUser.addEventListener('click', logout);
