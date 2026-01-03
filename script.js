const imageGrid = document.getElementById('imageGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const checkbox = document.getElementById('checkbox');

let currentQuery = 'Nature';
let page = 1;
// Aapki active Unsplash Access Key
const clientID = '4YxTJUl5nDaPX6dKW3tGrXJDfLgScFgjxcwWUlNfpdM'; 

// 1. Dark Mode Feature
checkbox.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
});

// 2. Main Function to Fetch Images
async function fetchImages(query, isNewSearch = true) {
    if (isNewSearch) {
        page = 1;
        imageGrid.innerHTML = '<div class="loader">Searching for ' + query + '...</div>';
        currentQuery = query;
    }

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12&page=${page}&client_id=${clientID}`);
        const data = await response.json();

        if (isNewSearch) imageGrid.innerHTML = '';

        data.results.forEach(img => {
            const card = document.createElement('div');
            card.classList.add('img-card');
            
            // Image design aur Download button ka structure
            card.innerHTML = `
                <img src="${img.urls.small}" alt="${currentQuery}" style="cursor:pointer;">
                <button class="download-btn" onclick="event.stopPropagation(); downloadImage('${img.links.download_location}')">
                    ⬇️
                </button>
            `;

            // Image click par High Quality photo khulne ke liye
            card.querySelector('img').onclick = () => window.open(img.urls.regular, '_blank');
            
            imageGrid.appendChild(card);
        });
        page++;
    } catch (error) {
        console.error("Error fetching images", error);
        imageGrid.innerHTML = '<div class="loader">Something went wrong. Check connection.</div>';
    }
}

// 3. Real Download Function
async function downloadImage(downloadUrl) {
    try {
        const res = await fetch(`${downloadUrl}&client_id=${clientID}`);
        const data = await res.json();
        
        const imageRes = await fetch(data.url);
        const imageBlob = await imageRes.blob();
        const url = window.URL.createObjectURL(imageBlob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `ProVision_${Math.floor(Math.random() * 1000)}.jpg`;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        alert("Download failed. Try again!");
    }
}

// 4. Infinite Scroll (Niche jaane par aur images load hona)
window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        fetchImages(currentQuery, false);
    }
};

// 5. Buttons aur Search functionality
searchBtn.addEventListener('click', () => {
    if (searchInput.value) fetchImages(searchInput.value);
});

function searchCategory(cat) {
    searchInput.value = cat;
    fetchImages(cat, true);
}

// Default search jab app khule
window.onload = () => fetchImages('Nature');
// Splash Screen Timer: 3 second baad screen hatane ke liye
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('hidden');
        }
    }, 3000); 
});
