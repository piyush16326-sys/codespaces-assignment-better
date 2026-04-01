import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from prisma import Prisma
import requests
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

db = Prisma()

# --- Lifecycle Management ---

@app.before_request
def ensure_db_connection():
    """Ensure DB is connected before every request."""
    if not db.is_connected():
        db.connect()

@app.teardown_appcontext
def shutdown_session(exception=None):
    """
    Optional: If you want to be safe, you can disconnect here. 
    However, for high performance, keeping it open is usually better.
    """
    # db.disconnect() # Uncomment if you still face 'Engine already started' errors
    pass

# --- AI Logic Constants ---
HF_API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli"
HEADERS = {"Authorization": f"Bearer {os.getenv('HF_TOKEN')}"}

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    content = data.get('content', '')
    
    # 1. AI Logic
    category = "general"
    try:
        response = requests.post(
            HF_API_URL, 
            headers=HEADERS, 
            json={
                "inputs": content, 
                "parameters": {"candidate_labels": ["work", "home", "urgent", "coding"]}
            },
            timeout=15
        )
        result = response.json()
        if isinstance(result, dict) and 'labels' in result:
            category = result['labels'][0]
        elif isinstance(result, list) and len(result) > 0:
            category = result[0].get('label', 'general')
    except Exception as e:
        print(f"AI Service Error: {e}")

    # 2. Database Logic
    try:
        task = db.task.create(
            data={'content': content, 'category': category}
        )
        return jsonify({"id": task.id, "content": task.content, "category": task.category}), 201
    except Exception as e:
        return jsonify({"error": f"Database Error: {str(e)}"}), 500

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    try:
        tasks = db.task.find_many()
        return jsonify([{"id": t.id, "content": t.content, "category": t.category} for t in tasks])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        db.task.delete(where={'id': task_id})
        return jsonify({"message": "Deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    #use this on pc vs code via codespace