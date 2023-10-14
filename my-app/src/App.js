import React from 'react';
import './App.css';
import TransactionChecker from './components/TransactionChecker';
import DetectionScoreViewer from './components/DetectionScoreViewer';
import FraudGraph from './components/FraudGraph';
import FraudAnaltyics from './components/FraudAnaltyics';
import UserTransactions from './components/UserTransactions';
import Slider from './components/Slider';

function App() {
  return (
    <div className="App">
      <h1 class = "title"> Fraud Dashboard </h1>
      <Slider/>
      <DetectionScoreViewer transactionId="sample_transaction_id" />
      <div class = "history">
        <FraudAnaltyics/>
      </div>
      <UserTransactions userId="sample_user_id" />
    </div>
  );
}

export default App;