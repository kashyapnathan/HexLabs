from flask import Flask, jsonify, request
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__)

# Load the model
try:
    model = joblib.load('knn_classifier.joblib')
except FileNotFoundError:
    model = None
    print("Model not found. Please ensure the model file is available.")

# Load test data and initialize counter
try:
    test_data = pd.read_csv('FraudTest.csv')
    transaction_counter = 0
except FileNotFoundError:
    test_data = pd.DataFrame()
    transaction_counter = 0

@app.route('/api/get-detection-score/<transactionId>', methods=['GET'])
def get_detection_score(transactionId):
    global transaction_counter

    try:
        # Find the transaction with the matching transactionId in your dataset
        transaction = test_data[test_data['trans_num'] == transactionId].iloc[0].to_dict()

        model_features = ['cc_num', 'amt', 'gender', 'zip',
                          'city_pop', 'unix_time', 'age',
                          'distance_km', 'AmountDeviation', 'TimeSinceLastTransaction', 'TransactionHour', 'MerchantPopularity', 'CategoryPopularity']

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
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(port=5000)