import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DetectionScoreViewer({ transactionId }) {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchDetectionScore = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-detection-score/${transactionId}`);
        setScore(response.data.score);
      } catch (error) {
        console.error('Error fetching detection score:', error);
      }
    };
    fetchDetectionScore();
  }, [transactionId]);

  return (
    <div className="circle-container">
      <div className="circle">
        {score !== null ? (
          <p className="score">Detection Score: {score}</p>
        ) : (
          <p className="loading">Loading score...</p>
        )}
      </div>
      <h2 class = "fraudScoreText" align="left"> Fraud Score </h2>
    </div>
  );
}

export default DetectionScoreViewer;
