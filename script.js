const imageGrid = document.getElementById('imageGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Aapki apni personal Access Key
const clientID = '4YxTJUl5nDaPX6dKW3tGrXJDfLgScFgjxcwWUlNfpdM'; 

async function fetchImages(query) {
    imageGrid.innerHTML = '<div class="loader">Searching for ' + query + '...</div>';
    
    try {
        // Is line ko dhyan se dekho, ab ye upar wali clientID use karega
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${clientID}`);
        const data = await response.json();
        
        imageGrid.innerHTML = ''; 
        
        if(data.results.length === 0) {
            imageGrid.innerHTML = '<div class="loader">No images found. Try another word!</div>';
            return;
        }

        data.results.forEach(img => {
            const card = document.createElement('div');
            card.classList.add('img-card');
            
            const highResUrl = img.urls.regular; 
            const thumbUrl = img.urls.small;

            card.innerHTML = `<img src="${thumbUrl}" alt="${query}" style="width:100%; height:100%; object-fit:cover;">`;
            
            card.onclick = () => window.open(highResUrl, '_blank');
            imageGrid.appendChild(card);
        });
    } catch (error) {
        imageGrid.innerHTML = '<div class="loader">Something went wrong. Please check your internet.</div>';
    }
}

searchBtn.addEventListener('click', () => {
    if (searchInput.value) fetchImages(searchInput.value);
});

function searchCategory(cat) {
    searchInput.value = cat;
    fetchImages(cat);
}

window.onload = () => fetchImages('Nature');
