from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # enabling CORS
socketio = SocketIO(app, cors_allowed_origins="*")

# Load the model
model = joblib.load('boosting.joblib')

# Load test data and initialize counter
try:
    test_data = pd.read_csv('testdata.csv')
    transaction_counter = 0
except FileNotFoundError:
    print("testdata.csv not found. Please ensure the file is available.")
    test_data = pd.DataFrame()
    transaction_counter = 0

# Sample Data
recent_frauds = []
graph_data = []
user_transactions = []

# Risk threshold
risk_threshold = 75  # Example initial value

@app.route('/api/get-detection-score/<string:transaction_id>', methods=['GET'])
def get_detection_score(transaction_id):
    dummy_score = {'transaction_id': transaction_id, 'score': 87.5}
    return jsonify(dummy_score)

@app.route('/api/get-recent-frauds', methods=['GET'])
def get_recent_frauds():
    return jsonify(recent_frauds)

@app.route('/api/get-fraud-graph-data', methods=['GET'])
def get_fraud_graph_data():
    return jsonify(graph_data)

@app.route('/api/get-user-transactions/<string:user_id>', methods=['GET'])
def get_user_transactions(user_id):
    transactions = [tx for tx in user_transactions if tx['user_id'] == user_id]
    return jsonify(transactions)

@app.route('/api/fraud-check', methods=['POST'])
def fraud_check():
    transaction_data = request.json.get('transactionData')
    features = np.array([transaction_data[key] for key in transaction_data]).reshape(1, -1)
    prediction = model.predict(features)
    is_fraudulent = prediction[0] == 1  
    return jsonify({'is_fraudulent': is_fraudulent})

@socketio.on('get_next_transaction')
def get_next_transaction():
    global transaction_counter

    if transaction_counter < len(test_data):
        transaction = test_data.iloc[transaction_counter].to_dict()
        transaction_counter += 1

        features = np.array([transaction[key] for key in transaction]).reshape(1, -1)
        risk_score = model.predict_proba(features)[0][1] * 100

        if risk_score > risk_threshold:
            recent_frauds.append({'transaction_id': transaction['transaction_id'], 'risk_score': risk_score})
            emit('new_fraud', {'transaction': transaction, 'risk_score': risk_score}, broadcast=True)
            emit('risk_alert', {'transaction': transaction, 'risk_score': risk_score}, broadcast=True)
        
        graph_data.append({'time': transaction['time'], 'fraud_count': len(recent_frauds)})
        emit('update_graph', graph_data[-1], broadcast=True)
    else:
        emit('no_more_transactions', broadcast=True)

@socketio.on('update_risk_threshold')
def update_risk_threshold(new_threshold):
    global risk_threshold
    risk_threshold = new_threshold

# Run the app
if __name__ == "__main__":
    socketio.run(app, port=5000)
