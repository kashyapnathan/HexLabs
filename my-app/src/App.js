import React from 'react';
import './App.css';
import TransactionChecker from './components/TransactionChecker';
import DetectionScoreViewer from './components/DetectionScoreViewer';
import FraudGraph from './components/FraudGraph';
import RecentFrauds from './components/RecentFrauds';
import UserTransactions from './components/UserTransactions';
import Slider from './components/Slider';

function App() {
  return (
    <div className="App">
      <h1 class = "title"> Fraud Dashboard </h1>
      <Slider/>
      <TransactionChecker/>
      <DetectionScoreViewer transactionId="sample_transaction_id" />
      <div class = "history">
        <div class = "recentFrauds">
          <RecentFrauds />
        </div>
        <div class = "fraudGraph">
          <FraudGraph />
        </div>
      </div>
      <UserTransactions userId="sample_user_id" />
    </div>
  );
}

export default App;