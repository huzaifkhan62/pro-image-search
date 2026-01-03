const imageGrid = document.getElementById('imageGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const checkbox = document.getElementById('checkbox');

let currentQuery = 'Nature';
let page = 1;
const clientID = '4YxTJUl5nDaPX6dKW3tGrXJDfLgScFgjxcwWUlNfpdM'; // Apni key yahan check karlein

// 1. Dark Mode Feature
checkbox.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
});

async function fetchImages(query, isNewSearch = true) {
    if (isNewSearch) {
        page = 1;
        imageGrid.innerHTML = '<div class="loader">Searching...</div>';
        currentQuery = query;
    }

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12&page=${page}&client_id=${clientID}`);
        const data = await response.json();

        if (isNewSearch) imageGrid.innerHTML = '';

        data.results.forEach(img => {
            const card = document.createElement('div');
            card.classList.add('img-card');
            
            // 2. Download Button Feature
            card.innerHTML = `
                <img src="${img.urls.small}" alt="${query}">
                <button class="download-btn" onclick="downloadImage('${img.links.download_location}')">
                    ⬇️
                </button>
            `;
            imageGrid.appendChild(card);
        });
        page++;
    } catch (error) {
        console.log("Error fetching images");
    }
}

// 3. Download Function (Unsplash requirement)
async function downloadImage(downloadUrl) {
    const res = await fetch(`${downloadUrl}&client_id=${clientID}`);
    const data = await res.json();
    window.open(data.url, '_blank');
}

// 4. Infinite Scroll Feature
window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        fetchImages(currentQuery, false);
    }
};

searchBtn.addEventListener('click', () => {
    if (searchInput.value) fetchImages(searchInput.value);
});

window.onload = () => fetchImages('Nature');
function searchCategory(cat) {
    searchInput.value = cat;
    fetchImages(cat, true);
}

