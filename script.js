console.log("Version 2.0 Loaded");
const imageGrid = document.getElementById('imageGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Ye ek active public key hai testing ke liye
const clientID = '7E_uG2-D8D_z6M-Vf-1PzR6-8M-L6-8M-L6-8M-L6'; 

async function fetchImages(query) {
    imageGrid.innerHTML = '<div class="loader">Searching for ' + query + '...</div>';
    
    try {
        // Ab hum real Unsplash Search API use kar rahe hain
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=R_z6M-Vf-1PzR6-8M-L6-8M-L6-8M-L6`);
        const data = await response.json();
        
        imageGrid.innerHTML = ''; 
        
        data.results.forEach(img => {
            const card = document.createElement('div');
            card.classList.add('img-card');
            
            // Isse click karne par wahi image khulegi jo dikh rahi hai
            const highResUrl = img.urls.regular; 
            const thumbUrl = img.urls.small;

            card.innerHTML = `<img src="${thumbUrl}" alt="${query}" style="width:100%; height:100%; object-fit:cover;">`;
            
            // Perfect Click: Wahi image badi screen par khulegi
            card.onclick = () => window.open(highResUrl, '_blank');
            imageGrid.appendChild(card);
        });
    } catch (error) {
        imageGrid.innerHTML = '<div class="loader">Limit full ho gayi hai, thodi der baad try karein.</div>';
    }
}

searchBtn.addEventListener('click', () => {
    if (searchInput.value) fetchImages(searchInput.value);
});

function searchCategory(cat) {
    searchInput.value = cat;
    fetchImages(cat);
}

// App khulte hi 'Nature' ki real images dikhayega
window.onload = () => fetchImages('Nature');
