const deletePost = document.querySelector('.deleteBtn')
const updatePost = document.querySelector('.edit-post-form')
const updateBtn = document.querySelector('.updateBtn')

const updateHandler = function (event) {
    event.preventDefault();

    console.log('I have been clicked')   
    const updateButton = document.querySelector('.posts')
    const container = document.createElement('div');
    const update = document.createElement('h2');
    const form = document.querySelector('.edit-post-form');
    const titleLabel = document.createElement('label')
    const titleTextArea = document.createElement('textarea');
    const contentLabel = document.createElement('label')
    const contentTextArea = document.createElement('textarea');
    const button = document.createElement('button');

    console.log(button)

    
    titleTextArea.classList.add('post_title');
    contentTextArea.classList.add('content');
    button.classList.add('btn','data-id="{{id}}', 'edit-post-form');

    
    updateButton.append(container);
    container.appendChild(update);
    container.appendChild(form);
    form.appendChild(titleLabel);
    form.appendChild(titleTextArea);
    form.appendChild(contentLabel);
    form.appendChild(contentTextArea);
    form.appendChild(button);

    update.textContent = "Update Post"
    titleLabel.textContent = "Title"    
    contentLabel.textContent = "Content"    
    button.textContent = 'submit'

}

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

const updatePostHandler = async function (event) {
    event.preventDefault();
    
    const title = document.querySelector('.post_title').value;
    console.log(title)
    const content = document.querySelector('.content').value;
    console.log(event.target)
    
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id)

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