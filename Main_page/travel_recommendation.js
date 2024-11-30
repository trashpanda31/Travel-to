const searchButton = document.getElementById('searchButton');

function searchTravel() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    // Загружаем JSON данные
    fetch('travel_recommendation_api.json') // Замените на правильный путь к JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            const country = data.countries.find(country => country.name.toLowerCase() === input);

            if (country) {
                country.cities.forEach(city => {
                    const cityCard = document.createElement('div');
                    cityCard.classList.add('result-card');

                    cityCard.innerHTML = `
                        <img src="${city.imageUrl}" alt="${city.name}">
                        <h3>${city.name}</h3>
                        <p>${city.description}</p>
                        <button>Visit</button>
                    `;

                    searchResults.appendChild(cityCard);
                });
            } else {
                searchResults.innerHTML = '<p>No results found for your search.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            searchResults.innerHTML = '<p>An error occurred while fetching the data.</p>';
        });
}

// Добавляем обработчик события
searchButton.addEventListener('click', searchTravel);
