const newPostBtn = document.querySelector('.newPostBtn');

const newPostHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('#postTitle').value;
  const content = document.querySelector('#postContent').value;

  if (title && content) {
    const response = await fetch('api/user/post', {
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
};

newPostBtn.addEventListener('submit', newPostHandler);
