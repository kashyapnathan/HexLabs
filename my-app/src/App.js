import React from 'react';
import TransactionChecker from './components/TransactionChecker';
import DetectionScoreViewer from './components/DetectionScoreViewer';
import FraudGraph from './components/FraudGraph';
import RecentFrauds from './components/RecentFrauds';
import UserTransactions from './components/UserTransactions';

import {
  Box,
  Heading,
  VStack,
  HStack,
  Grid
} from "@chakra-ui/react";

function App() {
  return (
    <VStack spacing={5} p={5}>
      <Heading>Fraud Detection App</Heading>
      <TransactionChecker />
      <DetectionScoreViewer transactionId="sample_transaction_id" />
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6} w="full">
        <Box w="full">
          <RecentFrauds />
        </Box>
        <Box w="full">
          <FraudGraph />
        </Box>
      </Grid>
      <UserTransactions userId="sample_user_id" />
    </VStack>
  );
}

export default App;