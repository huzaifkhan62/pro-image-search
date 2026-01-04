// 1. Firebase Library Import (Latest Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. Aapka Naya Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA4EzDXRfJfmzJp5GfDeetT-JH4rfC-IAs",
  authDomain: "pro-vision-app.firebaseapp.com",
  projectId: "pro-vision-app",
  storageBucket: "pro-vision-app.firebasestorage.app",
  messagingSenderId: "446529818580",
  appId: "1:446529818580:web:fd65d26fec317779af1041"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3. UI Elements Selection
const authOverlay = document.getElementById('auth-overlay');
const mainApp = document.getElementById('main-app');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const authError = document.getElementById('authError');
const imageGrid = document.getElementById('imageGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Aapki Nayi Unsplash API Key
const clientID = '4YxTJUl5nDaPX6dKW3tGrXJDfLgScFgjxcwWUlNfpdM'; 
let currentQuery = 'Nature';
let page = 1;

// 4. Login Status Check (Firebase Magic)
onAuthStateChanged(auth, (user) => {
    if (user) {
        authOverlay.style.display = 'none'; // Login box chhupao
        mainApp.style.display = 'block';    // App dikhao
        fetchImages('Nature'); 
    } else {
        authOverlay.style.display = 'flex'; // Login box dikhao
        mainApp.style.display = 'none';
    }
});

// 5. Signup Logic (Naya Account)
document.getElementById('signupBtn').onclick = () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => { alert("Account created successfully!"); })
        .catch(err => { authError.innerText = "Signup Failed: " + err.message; });
};

// 6. Login Logic (Purana User)
document.getElementById('loginBtn').onclick = () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .catch(err => { authError.innerText = "Login Failed: Check Email/Password"; });
};

// 7. Image Fetching Logic
async function fetchImages(query, isNewSearch = true) {
    if (isNewSearch) {
        page = 1;
        imageGrid.innerHTML = '<div class="loader">Loading...</div>';
        currentQuery = query;
    }
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12&page=${page}&client_id=${clientID}`);
        const data = await response.json();
        if (isNewSearch) imageGrid.innerHTML = '';
        data.results.forEach(img => {
            const card = document.createElement('div');
            card.classList.add('img-card');
            card.innerHTML = `
                <img src="${img.urls.small}" alt="image" style="cursor:pointer;">
                <button class="download-btn" onclick="event.stopPropagation(); downloadImage('${img.links.download_location}')">⬇️</button>
            `;
            card.querySelector('img').onclick = () => window.open(img.urls.regular, '_blank');
            imageGrid.appendChild(card);
        });
        page++;
    } catch (error) { console.error("Error:", error); }
}

// 8. Real Download Feature
async function downloadImage(downloadUrl) {
    try {
        const res = await fetch(`${downloadUrl}&client_id=${clientID}`);
        const data = await res.json();
        const imageRes = await fetch(data.url);
        const imageBlob = await imageRes.blob();
        const url = window.URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ProVision_${Date.now()}.jpg`;
        a.click();
    } catch (e) { alert("Download failed!"); }
}
// 9. Splash Screen Timer (Ye alag hona chahiye, kisi function ke andar nahi)
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('hidden');
            console.log("Splash hidden now");
        }
    }, 3000);
});

// 10. Search & Categories functionality
searchBtn.addEventListener('click', () => { 
    if(searchInput.value) fetchImages(searchInput.value); 
});

window.searchCategory = (cat) => { 
    searchInput.value = cat; 
    fetchImages(cat, true); 
};
