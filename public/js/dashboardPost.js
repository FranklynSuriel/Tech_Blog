const deletePost = document.querySelector('.deleteBtn')
const updatePost = document.querySelector('.edit-post-form')
const updateBtn = document.querySelector('.updateBtn')

const updateHandler = function (event) {
    event.preventDefault();

    // create the form elements to update a post
    const updateButton = document.querySelector('.posts')
    const container = document.createElement('div');
    const update = document.createElement('h2');
    const form = document.querySelector('.edit-post-form');
    const titleLabel = document.createElement('label')
    const titleTextArea = document.createElement('textarea');
    const contentLabel = document.createElement('label')
    const contentTextArea = document.createElement('textarea');
    const button = document.createElement('button');

    // set class to the elements
    container.classList.add('card')
    titleTextArea.classList.add('post_title', 'form-input');
    contentTextArea.classList.add('content', 'form-input');
    button.classList.add('btn', 'data-id="{{id}}', 'edit-post-form');

    // append
    updateButton.append(container);
    container.appendChild(update);
    container.appendChild(form);
    form.appendChild(titleLabel);
    form.appendChild(titleTextArea);
    form.appendChild(contentLabel);
    form.appendChild(contentTextArea);
    form.appendChild(button);

    // text content
    update.textContent = "Update Post"
    titleLabel.textContent = "Title"
    contentLabel.textContent = "Content"
    button.textContent = 'submit'

}

const deletePostHandler = async function (event) {
    event.preventDefault();
    // get the post id
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        // sent a delete request to the API endpoint
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

const updatePostHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('.post_title').value;
    const content = document.querySelector('.content').value;

    // get the post id
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');        

        // sent a put request to the API endpoint
        const response = await fetch(`/api/user/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace(`/dashboard/post/${id}`);
        } else {
            alert('Failed to create new post')
        }

    } else {
        console.log('id not working')
    }
}

deletePost.addEventListener('click', deletePostHandler)
updatePost.addEventListener('submit', updatePostHandler)
updateBtn.addEventListener('click', updateHandler)