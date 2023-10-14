import React, { useState } from 'react';
import './App.css';
import TransactionChecker from './components/TransactionChecker';
import DetectionScoreViewer from './components/DetectionScoreViewer';
import FraudGraph from './components/FraudGraph';
import FraudAnaltyics from './components/FraudAnaltyics';
import UserTransactions from './components/UserTransactions';
import Slider from './components/Slider';

function App() {
  const [threshold, setThreshold] = useState(50);

  const handleSliderChange = (event) => {
    setThreshold(Number(event.target.value));
  };

  return (
    <div className="App">
      <h1 className="title"> Fraud Dashboard </h1>
      <Slider threshold={threshold} onSliderChange={handleSliderChange} />
      <DetectionScoreViewer transactionId="sample_transaction_id" threshold={threshold} />
      <div className="history">
        <FraudAnaltyics />
      </div>
      <UserTransactions userId="sample_user_id" />
    </div>
  );
}

export default App;
