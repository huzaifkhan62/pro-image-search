const imageGrid = document.getElementById('imageGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function fetchImages(query) {
    // Loader dikhao
    imageGrid.innerHTML = '<div class="loader">Loading ' + query + ' images...</div>';
    
    setTimeout(() => {
        imageGrid.innerHTML = ''; 
        
        for (let i = 0; i < 15; i++) {
            const card = document.createElement('div');
            card.classList.add('img-card');
            
            // Naya aur fast link testing ke liye
            const randomID = Math.floor(Math.random() * 500) + i;
            const imageUrl = `https://picsum.photos/400/600?random=${randomID}`;
            
            card.innerHTML = `<img src="${imageUrl}" alt="AI Image" style="width:100%; height:100%; object-fit:cover;">`;
            
            card.onclick = () => window.open(imageUrl, '_blank');
            imageGrid.appendChild(card);
        }
    }, 500);
}

searchBtn.addEventListener('click', () => {
    if (searchInput.value) fetchImages(searchInput.value);
});

function searchCategory(cat) {
    searchInput.value = cat;
    fetchImages(cat);
}

// App khulte hi dikhao
window.onload = () => fetchImages('Latest');
