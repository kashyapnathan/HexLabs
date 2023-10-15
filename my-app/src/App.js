import React, { useState, useEffect } from 'react';
import './App.css';
import DetectionScoreViewer from './components/DetectionScoreViewer';
import Slider from './components/Slider';
import axios from 'axios';
import TrialGraph from './components/TrialGraph';
import FraudAnaltyics from './components/FraudAnaltyics'

function App() {
  const [threshold, setThreshold] = useState(50);
  const [transactionId, setTransactionId] = useState('');
  const [score, setScore] = useState(null);
  const[name, setName] = useState('');
  const [averageAmount, setAverageAmount] = useState([3, 4]);


  const handleSliderChange = (event) => {
    setThreshold(Number(event.target.value));
  };

  const handleTransactionIdChange = (event) => {
    setTransactionId(event.target.value);
  };

  const handleDetectFraud = async () => {
    try {
      const apiUrl = `http://localhost:5001/api/get-detection-score/${transactionId}`;
      console.log('Fetching from:', apiUrl); // Log the URL you are fetching from
      const response = await axios.get(apiUrl);
      // const response = await fetch(apiUrl);
      console.log(response)
      debugger
      const responseData = response.data;
      console.log('Response data:', responseData); // Log the response data for debugging

      // Ensure that the score is a number and update the state
      if (!isNaN(responseData.score)) {
        setScore(Math.round(responseData.score));
        setName(responseData.name);
      } else {
        console.error('Invalid score received:', responseData.score);
      }
    } catch (error) {
      console.error('Error fetching detection score:', error);
    }
  };

  const getGraphData = async () => {
    try {
      const apiURL = 'http://localhost:5001/api/get-graph-info/';
      const response = await axios.get(apiURL);
      debugger
      const responseData = response.data;

      if (!isNaN(responseData)) {
        setAverageAmount(responseData.averageAmount);
      } else {
        console.error('Invalid score received:', responseData.averageAmount);
      }
    } catch (error) {
      console.error('Error fetching detection score:', error);
    }
    };

  useEffect(() => {
    // Reset the score when the transaction ID changes
    setScore(null);
  }, [transactionId]);

  return (
    <div className="App">
      <h1 className="title"> Fraud Genie </h1>
      <Slider class = "slider" threshold={threshold} onSliderChange={handleSliderChange} />
      <input
        type="text"
        class = "input"
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChange={handleTransactionIdChange}
      />
      <button onClick={handleDetectFraud}>Detect Fraud</button>
      <DetectionScoreViewer name = {name} transactionId={transactionId} threshold={threshold} score={score} />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgb(38, 40, 78)" fill-opacity="1" d="M0,288L12,245.3C24,203,48,117,72,90.7C96,64,120,96,144,112C168,128,192,128,216,138.7C240,149,264,171,288,149.3C312,128,336,64,360,64C384,64,408,128,432,138.7C456,149,480,107,504,90.7C528,75,552,85,576,101.3C600,117,624,139,648,144C672,149,696,139,720,133.3C744,128,768,128,792,144C816,160,840,192,864,176C888,160,912,96,936,106.7C960,117,984,203,1008,234.7C1032,267,1056,245,1080,213.3C1104,181,1128,139,1152,128C1176,117,1200,139,1224,133.3C1248,128,1272,96,1296,74.7C1320,53,1344,43,1368,53.3C1392,64,1416,96,1428,112L1440,128L1440,320L1428,320C1416,320,1392,320,1368,320C1344,320,1320,320,1296,320C1272,320,1248,320,1224,320C1200,320,1176,320,1152,320C1128,320,1104,320,1080,320C1056,320,1032,320,1008,320C984,320,960,320,936,320C912,320,888,320,864,320C840,320,816,320,792,320C768,320,744,320,720,320C696,320,672,320,648,320C624,320,600,320,576,320C552,320,528,320,504,320C480,320,456,320,432,320C408,320,384,320,360,320C336,320,312,320,288,320C264,320,240,320,216,320C192,320,168,320,144,320C120,320,96,320,72,320C48,320,24,320,12,320L0,320Z"></path></svg>
      <div className="history">
        <h3 class = "anal"> Fraud Analytics </h3>
        <div class = "graphs">
        <TrialGraph averageAmount = {averageAmount} />
        </div>
      </div>
    </div>

  );
}

export default App;
