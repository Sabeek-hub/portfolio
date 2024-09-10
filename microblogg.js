document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');

    // Load posts from local storage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <div class="username">${post.username}</div>
                <div class="message">${post.message}</div>
                <div class="timestamp">${new Date(post.timestamp).toLocaleString()}</div>
            </div>
        `).join('');
    }

    // Save post to local storage
    function savePost(username, message) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ username, message, timestamp: Date.now() });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Handle form submission
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const message = document.getElementById('message').value.trim();

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
