// const dashboard = document.querySelector('#dashboard');
const newPostBtn = document.querySelector('.newPostForm');

// async function handleDashboard(event) {
//   event.preventDefault();

//   const response = await fetch('api/user/dashboard');

//   if (response.ok) {
//     console.log('hello from dashboard');
//   } else {
//     console.log('dashboard did not work');
//   }
// }

const newPostHandler =  async function (event) {
  event.preventDefault();
  
  const title = document.querySelector('#postTitle').value;
  const content = document.querySelector('#postContent').value;

  if (title && content) {
    const response = await fetch('/api/post/dashboard', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {      
      document.location.replace('/dashboard');
    } else {      
      alert('Failed to create new post')
    }
  }
};

// dashboard.addEventListener('click', handleDashboard);
newPostBtn.addEventListener('submit', newPostHandler);
