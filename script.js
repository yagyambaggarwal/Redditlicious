const apiKey = '3e7cc0bc7be04630b9a222f45ba0a9a1'; 
const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;

document.addEventListener('DOMContentLoaded', () => {
    fetchNews();

    document.getElementById('search-btn').addEventListener('click', () => {
        const query = document.getElementById('search').value;
        searchNews(query);
    });

    document.getElementById('search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = document.getElementById('search').value;
            searchNews(query);
        }
    });
});

function fetchNews() {
    fetch(apiUrl)
        .then(response => {
            console.log('Fetch News Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Fetch News Data:', data);
            displayNews(data.articles);
        })
        .catch(error => console.error('Error fetching news:', error));
}

function searchNews(query) {
    const searchUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    fetch(searchUrl)
        .then(response => {
            console.log('Search News Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Search News Data:', data);
            displayNews(data.articles);
        })
        .catch(error => console.error('Error searching news:', error));
}

function displayNews(articles) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; 

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';

        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank'; 
        link.rel = 'noopener noreferrer';

        const img = document.createElement('img');
        img.src = article.urlToImage || 'https://via.placeholder.com/600x400';
        link.appendChild(img);

        const title = document.createElement('h2');
        title.textContent = article.title;
        link.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available';
        link.appendChild(description);

        articleDiv.appendChild(link);
        container.appendChild(articleDiv);
    });
}
