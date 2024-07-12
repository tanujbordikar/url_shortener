"use client";
import { useState, useEffect } from "react";
import apiRequest from "./api/api.js";
const BASE_URL = 'http://localhost:3000';

export default function Home() {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest.get('/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLink('');
    setError('');
    try {
      const res = await apiRequest.post("/shorturl", { link });
      setData(prevData => [...prevData, res.data]);
    } catch (error) {
      setError('Failed to shorten the URL. Please try again.');
    }
  };

  const handleCopy = (shortUrl) => {
    const fullShortUrl = `${BASE_URL}/${shortUrl}`;
    navigator.clipboard.writeText(fullShortUrl)
      .then(() => {
        console.log('Copied to clipboard');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter URL"
          style={{ padding: '10px', width: '300px', marginBottom: '10px', color: "black" }}
          required
        />
        {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'white', color: 'black', borderRadius: '10px' }}>Shorten</button>
      </form>
      <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Full Link</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Short Link</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Clicks</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Copy</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.full}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <a href={item.short} target="_blank" rel="noopener noreferrer">{item.short}</a>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.clicks}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleCopy(item.short)}>Copy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
