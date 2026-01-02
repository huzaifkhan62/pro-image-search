// Testing API Key (Ise baad mein hum apni personal key se badlenge)
const apiKey = "Client-ID 1U0X-6H-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6-6"; // Ye sirf demo hai
const imageGrid = document.getElementById('imageGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Function: Images fetch karne ke liye
async function fetchImages(query) {
    imageGrid.innerHTML = '<div class="loader">Searching for "' + query + '"...</div>';
    
    try {
        // Unsplash API URL
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=7E_uG2-D8D_z6M-Vf-1PzR6-8M-L6-8M-L6-8M-L6`); 
        // Note: Upar wala URL testing ke liye ek temporary public key use kar raha hai
        
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        imageGrid.innerHTML = '<div class="loader">Oh no! Limit khatam ho gayi ya internet nahi hai.</div>';
    }
}

// Function: Images ko screen par dikhane ke liye
function displayImages(images) {
    imageGrid.innerHTML = '';
    if (images.length === 0) {
        imageGrid.innerHTML = '<div class="loader">No images found. Try something else!</div>';
        return;
    }

    images.forEach(img => {
        const card = document.createElement('div');
        card.classList.add('img-card');
        card.innerHTML = `
            <img src="${img.urls.small}" alt="${img.alt_description}" loading="lazy">
        `;
        // Photo par click karne par badi photo khulegi
        card.onclick = () => window.open(img.links.html, '_blank');
        imageGrid.appendChild(card);
    });
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    if (searchInput.value) fetchImages(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value) fetchImages(searchInput.value);
});

// Category buttons ke liye function
function searchCategory(cat) {
    searchInput.value = cat;
    fetchImages(cat);
}

// Default search jab app khule
fetchImages('Wallpaper');
    border: none;
    padding: 12px;
    color: white;
    outline: none;
    font-size: 16px;
}

#searchBtn { background: transparent; border: none; cursor: pointer; font-size: 18px; }

.categories {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    overflow-x: auto;
    padding: 10px;
}

.categories button {
    background: #1e293b;
    color: #94a3b8;
    border: 1px solid #334155;
    padding: 8px 18px;
    border-radius: 20px;
    white-space: nowrap;
    cursor: pointer;
    transition: 0.3s;
}

.categories button:hover { background: #38bdf8; color: #0f172a; }

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
    margin-top: 30px;
}

.img-card {
    border-radius: 15px;
    overflow: hidden;
    background: #1e293b;
    height: 250px;
    animation: fadeIn 0.5s ease;
}

.img-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
}

.img-card:hover img { transform: scale(1.1); }

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
      }
      
