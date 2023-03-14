const dashboard = document.querySelector('#dashboard');
const newPostBtn = document.querySelector('.newPostBtn');

async function handleDashboard(event) {
  event.preventDefault();

  const response = await fetch('api/dashboard');

  if (response.ok) {
    console.log('hello from dashboard');
  } else {
    console.log('dashboard did not work');
  }
}

async function newPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#postTitle').value;
  const content = document.querySelector('#postContent').value;

  if (title && content) {
    const response = await fetch('api/dashboard', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('post created');
    } else {
      console.log('post not created');
    }
  }
}

dashboard.addEventListener('click', handleDashboard);
newPostBtn.addEventListener('submit', newPostHandler);
