import React, { useState } from 'react';
import './App.css';
import DetectionScoreViewer from './components/DetectionScoreViewer';
import Slider from './components/Slider';

function App() {
  const [threshold, setThreshold] = useState(50);
  const [transactionId, setTransactionId] = useState('');
  const [score, setScore] = useState(null);

  const handleSliderChange = (event) => {
    setThreshold(Number(event.target.value));
  };

  const handleTransactionIdChange = (event) => {
    setTransactionId(event.target.value);
  };

  const handleDetectFraud = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/get-detection-score/${transactionId}`);
      const data = await response.json();

      if (response.ok) {
        setScore(data.score);
      } else {
        console.error('Error fetching detection score:', data.error);
        setScore(null);
      }
    } catch (error) {
      console.error('Error fetching detection score:', error);
      setScore(null);
    }
  };

  return (
    <div className="App">
      <h1 className="title"> Fraud Dashboard </h1>
      <Slider threshold={threshold} onSliderChange={handleSliderChange} />
      <input
        type="text"
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChange={handleTransactionIdChange}
      />
      <button onClick={handleDetectFraud}>Detect Fraud</button>
      <DetectionScoreViewer transactionId={transactionId} threshold={threshold} score={score} />
    </div>
  );
}

export default App;
