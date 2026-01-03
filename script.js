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
                <button class="download-btn" onclick="event.stopPropagation(); downloadImage('${img.links.download_location}')">
                    ⬇️
                </button>
            `;
            card.querySelector('img').onclick = () => window.open(img.urls.regular, '_blank');
            
            imageGrid.appendChild(card);
        });
        page++;
    } catch (error) {
        console.log("Error fetching images");
    }
}

// 3. Download Function (Unsplash requirement)
async function downloadImage(downloadUrl) {
    try {
        // 1. Pehle Unsplash ko batate hain ki hum download kar rahe hain (Zaruri hai)
        const res = await fetch(`${downloadUrl}&client_id=${clientID}`);
        const data = await res.json();
        
        // 2. Ab asli image file ko fetch karte hain
        const imageRes = await fetch(data.url);
        const imageBlob = await imageRes.blob();
        
        // 3. Ek temporary link banakar download trigger karte hain
        const url = window.URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ProVision_${Math.floor(Math.random() * 1000)}.jpg`;
        document.body.appendChild(a);
        a.click();
        
        // 4. Safai (Cleanup)
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        alert("Download fail ho gaya, dobara try karein!");
    }
}


