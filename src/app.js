const API_URL = process.env.BACKEND_API_URL;

document.addEventListener('DOMContentLoaded', () => {
    const quotesContainer = document.getElementById('quotesContainer');

    async function fetchQuotes() {
        try {
            const response = await fetch(`${API_URL}/quotes`);
            const quotes = await response.json();
            displayQuotes(quotes);
        } catch (error) {
            console.error('Error fetching quotes:', error);
            quotesContainer.innerHTML = `
                <div class="quote-card">
                    <p class="quote-text">Error loading quotes. Please try again later.</p>
                </div>
            `;
        }
    }

    function displayQuotes(quotes) {
        quotesContainer.innerHTML = quotes.map(quote => `
            <div class="quote-card">
                <p class="quote-text">"${quote.text}"</p>
                <p class="quote-author">- ${quote.author}</p>
            </div>
        `).join('');
    }

    // Initial fetch
    fetchQuotes();

    // Refresh quotes every 5 minutes
    setInterval(fetchQuotes, 5 * 60 * 1000);
});
