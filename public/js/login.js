const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');

async function handleSignup(event) {
  event.preventDefault();
  

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/');
      console.log('signed in');
    } else {
      alert('failed to log in. Please try again.');
      console.log('it did not work');
    }
  } 
}
async function handleLogin(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {'content-type': 'application/json'},
    });
    
    if (response.ok) {
      document.location.replace('/');
      console.log('logged in')
    } else {
      alert('failed to log in. Please try again.');
    }
  }
}

signupForm.addEventListener('submit', handleSignup);
loginForm.addEventListener('submit', handleLogin);
