function postTweet() {
    const tweetInput = document.getElementById('tweetInput');
    const tweetsContainer = document.getElementById('tweetsContainer');
    
    const tweetText = tweetInput.value.trim();
    if (tweetText === '') {
        alert('Please enter a tweet.');
        return;
    }

    const tweetElement = document.createElement('div');
    tweetElement.classList.add('tweet');
    tweetElement.textContent = tweetText;

    tweetsContainer.prepend(tweetElement);

    tweetInput.value = ''; // Clear the input
}
