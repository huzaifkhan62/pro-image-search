const imageGrid = document.getElementById('imageGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Function: Images fetch karne ke liye
function fetchImages(query) {
    // Loader dikhao
    imageGrid.innerHTML = '<div class="loader">Searching for ' + query + '...</div>';
    
    setTimeout(() => {
        imageGrid.innerHTML = ''; // Loader hatao
        
        // 15 Random images load karenge
        for (let i = 0; i < 15; i++) {
            const card = document.createElement('div');
            card.classList.add('img-card');
            
            // Lorem Picsum ka direct link (Testing ke liye best hai)
            const randomID = Math.floor(Math.random() * 1000);
            const imageUrl = `https://picsum.photos/seed/${randomID}/400/600`;
            
            card.innerHTML = `<img src="${imageUrl}" alt="Image" loading="lazy">`;
            
            // Photo badi karne ke liye
            card.onclick = () => window.open(imageUrl, '_blank');
            imageGrid.appendChild(card);
        }
    }, 800);
}

// Search Button
searchBtn.addEventListener('click', () => {
    if (searchInput.value) fetchImages(searchInput.value);
});

// Category Buttons
function searchCategory(cat) {
    searchInput.value = cat;
    fetchImages(cat);
}

// App khulte hi images load hon
window.onload = () => fetchImages('Latest');
