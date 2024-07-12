'use client';

import { useEffect } from 'react';
import apiRequest from '../api/api.js'; 

export default function RedirectPage({ params }) {
  const { shortUrl } = params;

  useEffect(() => {
    const fetchFullUrl = async () => {
      try {
        const response = await apiRequest.get(`/${shortUrl}`);
        if (response.data && response.data.full) {
          window.location.href = response.data.full;
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching full URL:', error);
      }
    };

    if (shortUrl) {
      fetchFullUrl();
    }
  }, [shortUrl]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
