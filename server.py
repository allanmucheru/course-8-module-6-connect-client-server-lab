
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample event data
events = [
    {"id": 1, "title": "Python Workshop"},
    {"id": 2, "title": "Tech Conference"}
]

# Homepage route
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Event Catalog!"})

# GET all events
@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events)

# POST a new event
@app.route("/events", methods=["POST"])
def create_event():
    data = request.get_json(silent=True)

    if not data or not isinstance(data, dict) or not data.get("title") or not isinstance(data.get("title"), str) or not data["title"].strip():
        return jsonify({"error": "Event title is required"}), 400

    new_event = {
        "id": max((event["id"] for event in events), default=0) + 1,
        "title": data["title"].strip()
    }

    events.append(new_event)

    return jsonify(new_event), 201


if __name__ == "__main__":
    app.run(debug=True)
