import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FraudAnaltyics() {
  const [recentFrauds, setRecentFrauds] = useState([]);
  const [fraudPercent, setFraudPercent] = useState(0);

  useEffect(() => {
    const fetchRecentFrauds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-recent-frauds');
        setRecentFrauds(response.data);
      } catch (error) {
        console.error('Error fetching recent frauds:', error);
      }
    };
    fetchRecentFrauds();
  }, []);

  return (
    <div class = "analytics">
      <p> Fraud Percentage : {fraudPercent}% </p>      
      <ul>
        {recentFrauds.map((fraud, index) => (
          <li key={index}>{fraud.transaction_id}</li>  // Adjust as per your data structure
        ))}
      </ul>
    </div>
  );
}

export default FraudAnaltyics;