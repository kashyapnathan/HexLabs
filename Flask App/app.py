from flask import Flask, jsonify
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load the model
try:
    model = joblib.load('knn_classifier.joblib')
except FileNotFoundError:
    model = None
    print("Model not found. Please ensure the model file is available.")

# Load test data and initialize counter
try:
    test_data = pd.read_csv('fraudTest.csv')
    transaction_counter = 0
except FileNotFoundError:
    test_data = pd.DataFrame()
    transaction_counter = 0

@app.route('/api/get-detection-score', methods=['GET'])
def get_detection_score():
    global transaction_counter

    if transaction_counter < len(test_data):
        transaction = test_data.iloc[transaction_counter].to_dict()
        transaction_counter += 1  # Increment the counter to get the next transaction next time

        # Specify the feature columns that your model expects
        model_features = ['cc_num', 'amt', 'oldbalanceOrg', 'newbalanceOrig', 'oldbalanceDest', 'newbalanceDest']
        features = np.array([transaction[key] for key in model_features]).reshape(1, -1)
        risk_score = model.predict_proba(features)[0][1] * 100

        response = {
            'transaction_id': transaction['trans_num'],
            'score': risk_score,
            'name': f"{transaction['first']} {transaction['last']}"
        }
        return jsonify(response)
    else:
        return jsonify({'message': 'No more transactions'}), 404

# Run the app
if __name__ == "__main__":
    app.run(port=5000)
