import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/quotes');
        const data = await response.json();
        setQuotes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DevOps Wisdom</h1>
        <p>Welcome to Thabelo's DevOps Quotes</p>
      </header>
      <main>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="quotes-container">
            {quotes.map((quote, index) => (
              <div key={index} className="quote-card">
                <blockquote>{quote.text}</blockquote>
                <cite>- {quote.author}</cite>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;