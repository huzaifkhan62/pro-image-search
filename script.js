const imageGrid = document.getElementById('imageGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Function: Images dikhane ke liye (Source tarika)
function fetchImages(query) {
    imageGrid.innerHTML = '<div class="loader">Searching for ' + query + '...</div>';
    
    // Purani images saaf karo
    setTimeout(() => {
        imageGrid.innerHTML = '';
        
        // Hum 12 random images generate karenge query ke basis par
        for (let i = 0; i < 12; i++) {
            const card = document.createElement('div');
            card.classList.add('img-card');
            
            // Random number taaki har image alag dikhe
            const randomNum = Math.floor(Math.random() * 1000) + i;
            const imageUrl = `https://source.unsplash.com/featured/?${query}&sig=${randomNum}`;
            
            card.innerHTML = `
                <img src="${imageUrl}" alt="${query}" onerror="this.src='https://via.placeholder.com/300?text=Error+Loading'">
            `;
            
            // Click karne par image badi dikhegi
            card.onclick = () => window.open(imageUrl, '_blank');
            imageGrid.appendChild(card);
        }
    }, 500);
}

// Button click par search
searchBtn.addEventListener('click', () => {
    if (searchInput.value) fetchImages(searchInput.value);
});

// Enter dabane par search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value) fetchImages(searchInput.value);
});

// Category buttons ke liye
function searchCategory(cat) {
    searchInput.value = cat;
    fetchImages(cat);
}

// App khulte hi 'Nature' load ho
window.onload = () => fetchImages('Nature');
