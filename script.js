* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background: #0f172a;
    font-family: 'Inter', sans-serif;
    color: white;
}

.app-container { padding: 20px; }

header {
    text-align: center;
    position: sticky;
    top: 0;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(10px);
    z-index: 100;
    padding-bottom: 20px;
}

.logo { font-size: 24px; letter-spacing: 3px; margin-bottom: 20px; }
.logo span { color: #38bdf8; }

.search-box {
    display: flex;
    max-width: 500px;
    margin: 0 auto;
    background: #1e293b;
    border-radius: 50px;
    padding: 5px 15px;
    border: 1px solid #334155;
}

#searchInput {
    flex: 1;
    background: transparent;
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
      
