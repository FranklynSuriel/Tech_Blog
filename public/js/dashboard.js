const newPostBtn = document.querySelector('.newPostForm');

const newPostHandler =  async function (event) {
  event.preventDefault();
  
  const title = document.querySelector('#postTitle').value;
  const content = document.querySelector('#postContent').value;

  if (title && content) {
    const response = await fetch('/api/user/dashboard', {
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

newPostBtn.addEventListener('submit', newPostHandler);
