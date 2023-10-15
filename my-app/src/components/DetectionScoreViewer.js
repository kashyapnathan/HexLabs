import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DetectionScoreViewer({ transactionId, threshold }) {
  const [score, setScore] = useState(70);
  const [transID, setID] = useState("XXXXXXXXXXX");
  const [name, setName] = useState("Jeffrey Dahmer");
  const [circleColor, setCircleColor] = useState('gray'); // Initialize with gray

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

  // Calculate the circle color based on the threshold and score
  useEffect(() => {
    if (score !== null) {
      setCircleColor(score >= threshold ? '#913831' : 'green');
    }
  }, [score, threshold]);



  return (
    <div className="userInfo">
      <div className = "userPart">
      <div className="circle" style={{ backgroundColor: circleColor }}>
        {score !== null ? (
          <p className="score">{score}</p>
        ) : (
          <p className="loading">Loading score...</p>
        )}
      </div>
      <h2 className="fraudScoreText"> Fraud Score </h2>
      </div>
      <div className="infoPart">
        <p> Transaction ID: {transID} </p>
        <p> Name: {name} </p>
        {score > threshold ? (
          <div class = "alert">
            {/* HTML to insert if the score is greater than the threshold */}
            <p>Your score is greater than the threshold!</p>
            <p>Check the customers ID</p>
          </div>
        ) : 
        (<div> 
        <br></br>
        <br></br>
        <br></br>
        </div>) }
        <button className="Next">
          Next
        </button>
      </div>
      </div>
      
  );
}

export default DetectionScoreViewer;
