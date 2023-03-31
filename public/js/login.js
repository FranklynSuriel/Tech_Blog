const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');

async function handleSignup(event) {
  event.preventDefault();  
  // collect the values from the sign up form
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();

  if (username && email && password) {
    // sent a post request to the API endpoint
    const response = await fetch('api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      console.log('signed in');
      document.location.replace('/home');      
    } else {
      alert('failed to log in. Please try again.');
      console.log('it did not work');
    }
  } 
}
async function handleLogin(event) {
  event.preventDefault();
  // collect the values from the sign up form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // sent a post request to the API endpoint
    const response = await fetch('api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {'content-type': 'application/json'},
    });
    
    if (response.ok) {
      console.log('logged in')
      document.location.replace('/home');
      
    } else {
      alert('failed to log in. Please try again.');
      console.log('it did not work')
    }
  }
}

// add event listeners to manage log in or sign up
signupForm.addEventListener('submit', handleSignup);
loginForm.addEventListener('submit', handleLogin);
