import React, { useState, useEffect } from "react";
import Plot from 'react-plotly.js';
import axios from 'axios';

function TrialGraph({ averageAmount }) {

//   useEffect(() => {
//     const fetchGraphData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/get-fraud-graph-data');
//         setXaxis(response.data);
//       } catch (error) {
//         console.error('Error fetching graph data:', error);
//       }
//     };
//     fetchGraphData();
//   }, []);

  return (
    <Plot 
      data={[
        {
          x: ["Non Fraud", "Fraud"],
          y: averageAmount,
          type: 'bar',
          marker: {color: 'blues'},
        },
      ]}
      layout={ { width: 400, height: 300, title: 'Average Transaction Value'} }
    />
  );
}

export default TrialGraph;