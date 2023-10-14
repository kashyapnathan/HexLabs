from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import joblib
import numpy as np
import random

app = Flask(__name__)
CORS(app)  
socketio = SocketIO(app, cors_allowed_origins="*")

# Load the model (replace with your model's path)
model = joblib.load('boosting.joblib')

# Sample Data
recent_frauds = [{'transaction_id': 'tx001'}, {'transaction_id': 'tx002'}]
graph_data = []
user_transactions = [{'user_id': 'sample_user_id', 'transaction_id': 'tx003'}]

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
    
    # Ensure to process the input data as per your model’s requirements
    features = np.array([transaction_data[key] for key in transaction_data]).reshape(1, -1)
    prediction = model.predict(features)
    
    is_fraudulent = prediction[0] == 1  
    return jsonify({'is_fraudulent': is_fraudulent})

@app.route('/api/submit-transaction', methods=['POST'])
def submit_transaction():
    transaction_data = request.json.get('transactionData')
    
    # Logic to process and validate the transaction data
    # Check for fraud and save the transaction to the database
    # ...

    if random.choice([True, False]):  # Simulate a fraud detection
        recent_frauds.append(transaction_data)
        socketio.emit('new_fraud', transaction_data)
    
    user_transactions.append(transaction_data)
    socketio.emit('new_user_transaction', transaction_data)
    
    new_fraud_count = random.randint(0, 10)  
    graph_data.append({'time': '2022-01-02', 'fraud_count': new_fraud_count})
    socketio.emit('update_graph', graph_data[-1])
    
    return jsonify({'status': 'Transaction submitted successfully'})

# Run the app
if __name__ == "__main__":
    socketio.run(app, port=5000)