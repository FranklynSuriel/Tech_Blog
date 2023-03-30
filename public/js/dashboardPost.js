const deletePost = document.querySelector('.deleteBtn')
// const updatePost = document.querySelector('.updateBtn')

const deletePostHandler = async function (event) {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/user/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post')
        }
    }
}

deletePost.addEventListener('click', deletePostHandler)
// updatePost.addEventListener('click', updatePostHandler)