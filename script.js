let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];
const following = new Set();

const authTitle = document.getElementById('form-title');
const authBtn = document.getElementById('auth-btn');
const authError = document.getElementById('auth-error');
const authToggleText = document.getElementById('auth-toggle-text');
const toggleLink = document.getElementById('toggle-link');
const confirmPasswordInput = document.getElementById('auth-confirm-password');
const emojiPicker = document.getElementById('emoji-picker');
const postContent = document.getElementById('post-content');

// Toggle between Login and Register
let isLogin = true;

toggleLink.addEventListener('click', function () {
    if (isLogin) {
        authTitle.textContent = 'Register';
        authBtn.textContent = 'Register';
        confirmPasswordInput.classList.remove('hidden');
        authToggleText.innerHTML = 'Already have an account? <a href="#">Login here</a>';
        isLogin = false;
    } else {
        authTitle.textContent = 'Login';
        authBtn.textContent = 'Login';
        confirmPasswordInput.classList.add('hidden');
        authToggleText.innerHTML = 'New user? <a href="#">Register here</a>';
        isLogin = true;
    }
});

// Registration and Login functionality
authBtn.addEventListener('click', function () {
    const username = document.getElementById('auth-username').value.trim();
    const password = document.getElementById('auth-password').value.trim();
    const confirmPassword = document.getElementById('auth-confirm-password').value.trim();

    if (!username || !password) {
        authError.textContent = 'Username and Password are required.';
        authError.classList.remove('hidden');
        return;
    }

    if (isLogin) {
        // Login logic
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            currentUser = username;
            loadFollowing();
            document.getElementById('user-username').textContent = username;
            document.getElementById('auth-form').classList.add('hidden');
            document.getElementById('user-dashboard').classList.remove('hidden');
            document.getElementById('feed').classList.remove('hidden');
            document.getElementById('logout-btn').classList.remove('hidden');
            displayPosts();
            authError.classList.add('hidden');
        } else {
            authError.textContent = 'Invalid username or password';
            authError.classList.remove('hidden');
        }
    } else {
        // Registration logic
        if (users.some(user => user.username === username)) {
            authError.textContent = 'Username already exists';
            authError.classList.remove('hidden');
            return;
        }

        if (password !== confirmPassword) {
            authError.textContent = 'Passwords do not match';
            authError.classList.remove('hidden');
            return;
        }

        // Save the new user
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));

        // Automatically switch to login after registration
        authTitle.textContent = 'Login';
        authBtn.textContent = 'Login';
        confirmPasswordInput.classList.add('hidden');
        authToggleText.innerHTML = 'New user? <a href="#">Register here</a>';
        isLogin = true;

        authError.textContent = 'Registration successful! Please log in.';
        authError.classList.remove('hidden');
    }
});

// Load following for the current user
function loadFollowing() {
    const userFollowing = JSON.parse(localStorage.getItem(`following_${currentUser}`)) || [];
    userFollowing.forEach(user => following.add(user));
    displayFollowing();
}

// Display Following List
function displayFollowing() {
    const followingList = document.getElementById('following-list');
    followingList.innerHTML = '';
    following.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        followingList.appendChild(li);
    });
}

// Post functionality
document.getElementById('post-btn').addEventListener('click', function () {
    const postContentValue = postContent.value.trim();
    const mediaInput = document.getElementById('media-input');
    const mediaFile = mediaInput.files[0];

    if (postContentValue || mediaFile) {
        const post = {
            content: postContentValue,
            user: currentUser,
            media: mediaFile ? URL.createObjectURL(mediaFile) : null,
            mediaType: mediaFile ? mediaFile.type : null,
            reactions: {
                likes: [],
                dislikes: [],
                laughs: [],
                cries: []
            },
            comments: [] // Initialize comments
        };
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts(); // Update the displayed posts after adding a new post

        postContent.value = ''; // Clear textarea
        mediaInput.value = ''; // Clear file input
        emojiPicker.classList.add('hidden'); // Hide emoji picker after posting
    } else {
        document.getElementById('post-error').classList.remove('hidden');
    }
});

// Display posts in the feed
function displayPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${post.user}</strong>: ${post.content}<br>`;
        if (post.media) {
            li.innerHTML += `<img src="${post.media}" alt="Post Media" style="max-width: 100%;">`;
        }
        li.innerHTML += `<div class="reaction-buttons">
            <button class="react-btn" data-reaction="like">👍</button>
            <button class="react-btn" data-reaction="dislike">👎</button>
            <button class="react-btn" data-reaction="laugh">😂</button>
            <button class="react-btn" data-reaction="cry">😢</button>
        </div>
        <div class="comment-section">
            <h4>Comments:</h4>
            <ul class="comments-list"></ul>
            <textarea class="comment-input" placeholder="Add a comment..."></textarea>
            <button class="add-comment-btn">Comment</button>
        </div>`;
        postList.appendChild(li);
    });
}

// Emoji picker functionality
postContent.addEventListener('focus', function() {
    emojiPicker.classList.remove('hidden');
});

postContent.addEventListener('blur', function() {
    setTimeout(() => emojiPicker.classList.add('hidden'), 200);
});

// Insert emoji into post content
emojiPicker.addEventListener('click', function(event) {
    if (event.target.classList.contains('emoji')) {
        const emoji = event.target.getAttribute('data-emoji');
        postContent.value += emoji; // Append emoji to post content
        postContent.focus(); // Keep the focus on the textarea
    }
});

// Follow User Functionality
document.getElementById('follow-btn').addEventListener('click', function () {
    const followUsername = document.getElementById('follow-username').value.trim();
    if (!followUsername || following.has(followUsername)) {
        document.getElementById('follow-error').classList.remove('hidden');
        return;
    }

    following.add(followUsername);
    localStorage.setItem(`following_${currentUser}`, JSON.stringify(Array.from(following)));
    displayFollowing();
    document.getElementById('follow-username').value = ''; // Clear input
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function () {
    currentUser = null;
    document.getElementById('auth-form').classList.remove('hidden');
    document.getElementById('user-dashboard').classList.add('hidden');
    document.getElementById('feed').classList.add('hidden');
    document.getElementById('logout-btn').classList.add('hidden');
});

// Adding comments to posts (This is simplified)
document.getElementById('post-list').addEventListener('click', function (event) {
    if (event.target.classList.contains('add-comment-btn')) {
        const commentInput = event.target.previousElementSibling;
        const commentValue = commentInput.value.trim();
        const postIndex = Array.from(document.getElementById('post-list').children).indexOf(event.target.closest('li'));
        
        if (commentValue) {
            posts[postIndex].comments.push(commentValue);
            localStorage.setItem('posts', JSON.stringify(posts));
            commentInput.value = ''; // Clear the input
            displayPosts(); // Re-display posts to show new comment
        }
    }
});
