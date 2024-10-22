document.getElementById('ad-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    const adList = document.getElementById('ad-list');
    const adItem = document.createElement('div');
    adItem.classList.add('ad-item');

    const imageUrl = URL.createObjectURL(imageFile);
    adItem.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Price: $${price}</p>
        <img src="${imageUrl}" alt="${title}" class="ad-image">
    `;
    
    adList.appendChild(adItem);

    // Clear form fields
    document.getElementById('ad-form').reset();
});
