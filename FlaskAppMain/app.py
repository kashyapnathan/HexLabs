from flask import Flask, jsonify, request
import joblib
import pandas as pd
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}) 
CORS(app)

# Load the model
try:
    model = joblib.load('knn_classifier.joblib')
except FileNotFoundError:
    model = None
    print("Model not found. Please ensure the model file is available.")

# Load test data and initialize counter
try:
    test_data = pd.read_csv('FraudTest.csv')
except FileNotFoundError:
    test_data = pd.DataFrame()

try:
    graph_data = pd.read_csv('withproba.csv')
except FileNotFoundError:
    test_data = pd.DataFrame()

@app.route('/api/get-graph-info/', methods=['GET'])
def getGraphInfo():
    try:
        average_amt = graph_data.groupby('is_fraud')['amt'].mean().reset_index()

        response = {
            'averageAmount': list(average_amt['amt'])
        }
        print(average_amt)

        return jsonify(response), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
        

@app.route('/api/get-detection-score/<transactionId>', methods=['GET'])
def get_detection_score(transactionId):
    try:
        # Find the transaction with the matching transactionId in your dataset
        transaction = test_data[test_data['trans_num'] == transactionId].iloc[0].to_dict()

        model_features = ['amt', 'AmountDeviation', 'TransactionHour', 'CategoryPopularity']

        features = np.array([transaction[key] for key in model_features]).reshape(1, -1)
        risk_score = model.predict_proba(features)[0][1] * 100

        response = {
            'transaction_id': transaction['trans_num'],
            'score': risk_score,
            'name': f"{transaction['first']} {transaction['last']}",
            'transID': transactionId,  # Adding transID to the response
        }
        return jsonify(response), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(port=5001)
