document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');

    // Load posts from local storage
    const loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <strong>${post.username}</strong>: ${post.message}
            </div>
        `).join('');
    };

    // Save post to local storage
    const savePost = (username, message) => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ username, message });
        localStorage.setItem('posts', JSON.stringify(posts));
    };

    // Handle form submission
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const message = document.getElementById('message').value;

        if (username && message) {
            savePost(username, message);
            document.getElementById('username').value = '';
            document.getElementById('message').value = '';
            loadPosts();
        }
    });

    // Initial load of posts
    loadPosts();
});
