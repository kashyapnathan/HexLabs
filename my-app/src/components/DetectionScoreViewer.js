import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Spinner
} from "@chakra-ui/react";

function DetectionScoreViewer({ transactionId, threshold }) {
  const [score, setScore] = useState(70);
  const [transID, setID] = useState("XXXXXXXXXXX");
  const [name, setName] = useState("First Last");
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
  );
}

export default DetectionScoreViewer;