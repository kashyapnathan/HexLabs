import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Spinner
} from "@chakra-ui/react";

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
    <Box p={4} borderWidth={1} borderRadius="lg">
      <Heading size="md">Detection Score</Heading>
      {score !== null ? (
        <Text fontSize="lg">Detection Score: {score}</Text>
      ) : (
        <Box mt={2}>
          <Spinner />
          <Text mt={2}>Loading score...</Text>
        </Box>
      )}
    </Box>
  );
}

export default DetectionScoreViewer;