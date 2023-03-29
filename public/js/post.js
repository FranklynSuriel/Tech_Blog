const newCommentBtn = document.querySelector('.newCommentForm');

const newCommentHandler = async function (event) {
  event.preventDefault();

  const comment = document.querySelector('#postComment').value;

  if (comment) {
    const response = await fetch('/api/user/comment', {
      method: 'POST',
      body: JSON.stringify({ comment, }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('post created');
      document.location.reload()
    } else {
      console.log('post not created');
      alert('Failed to create new post')
    }
  }
};

newCommentBtn.addEventListener('submit', newCommentHandler);
