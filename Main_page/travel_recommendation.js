const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');
const searchResults = document.getElementById('searchResults');

function searchTravel() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    searchResults.innerHTML = '';

    fetch('travel_recommendation_api.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Data fetch error');
            }
            return response.json();
        })
        .then(data => {
            let results = [];
            if (input.includes('beach') || input.includes('beaches')) {
                results = data.beaches;
            } else if (input.includes('temple') || input.includes('temples')) {
                results = data.temples;
            } else {
                const country = data.countries.find(c => c.name.toLowerCase() === input);
                if (country) {
                    results = country.cities;
                }
            }

            if (results.length > 0) {
                results.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('result-card');

                    let localTime = "Time not available";
                    if (item.timezone) {
                        const options = { timeZone: item.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
                        localTime = new Date().toLocaleTimeString('en-US', options);
                    }

                    card.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p><strong>Local Time:</strong> ${localTime}</p>
                        <button>Visit</button>
                    `;
                    searchResults.appendChild(card);
                });
            } else {
                searchResults.innerHTML = '<p>No results found matching your request.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            searchResults.innerHTML = '<p>An error occurred while loading data.</p>';
        });
}

function resetResults() {
    searchResults.innerHTML = '';
    document.getElementById('searchInput').value = '';
}

searchButton.addEventListener('click', searchTravel);
resetButton.addEventListener('click', resetResults);
