from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # enabling CORS
socketio = SocketIO(app, cors_allowed_origins="*")

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
    dummy_response = {'is_fraudulent': False}
    return jsonify(dummy_response)

@app.route('/api/submit-transaction', methods=['POST'])
def submit_transaction():
    transaction_data = request.json.get('transactionData')
    
    # Logic to process and validate the transaction data
    # For example, check for fraud and save the transaction to the database

    # Example: Update recent frauds and notify clients
    if random.choice([True, False]):  # Simulate a fraud detection
        recent_frauds.append(transaction_data)
        socketio.emit('new_fraud', transaction_data)
    
    # Example: Update user transactions and notify clients
    user_transactions.append(transaction_data)
    socketio.emit('new_user_transaction', transaction_data)
    
    # Example: Update fraud graph data and notify clients
    new_fraud_count = random.randint(0, 10)  # Simulate fraud count data
    graph_data.append({'time': '2022-01-02', 'fraud_count': new_fraud_count})
    socketio.emit('update_graph', graph_data[-1])
    
    return jsonify({'status': 'Transaction submitted successfully'})

# Run the app
if __name__ == "__main__":
    socketio.run(app, port=5000)
