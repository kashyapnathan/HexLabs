import React, { useEffect, useState } from 'react';

function DetectionScoreViewer({ name, transactionId, threshold, score }) {
  const [circleColor, setCircleColor] = useState('gray');

  useEffect(() => {
    if (score !== null) {
      setCircleColor(score >= threshold ? '#913831' : 'green');
    }
  }, [score, threshold]);

  return (
    <div className="userInfo">
      <div className="userPart">
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
        <p> Transaction ID: {transactionId} </p>
        <p> Name : {name}</p>
        {score !== null && (
          <div>
            {score > threshold ? (
              <div className="alert">
                <p>Your score is greater than the threshold!</p>
                <p>Check the customer's ID</p>
              </div>
            ) : (
              <br />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetectionScoreViewer;
