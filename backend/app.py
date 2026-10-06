import math
from datetime import datetime, timezone

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo.errors import PyMongoError

load_dotenv()

from analysis import analyze_scenario
from database import save_simulation

app = Flask(__name__)
CORS(app)

VALID_CROPS = {'Rice', 'Wheat', 'Maize', 'Tomato'}
VALID_PERIODS = {7, 15, 30, 60}


def validate_simulation(data):
    if not isinstance(data, dict):
        return 'Send the simulation settings as JSON.'
    if data.get('crop') not in VALID_CROPS:
        return 'Choose a supported crop.'

    for name, minimum, maximum in (
        ('temperature', 20, 50),
        ('droughtDays', 0, 60),
        ('salinity', 0, 50),
    ):
        value = data.get(name)
        if isinstance(value, bool) or not isinstance(value, (int, float)):
            return f'{name} must be a number.'
        if not math.isfinite(value) or not minimum <= value <= maximum:
            return f'{name} must be between {minimum} and {maximum}.'

    period = data.get('simulationPeriod')
    if isinstance(period, bool) or not isinstance(period, int) or period not in VALID_PERIODS:
        return 'Choose a supported simulation period.'
    return None


@app.get('/api/health')
def health_check():
    return jsonify({'status': 'ok'})


@app.post('/api/simulate')
def simulate():
    data = request.get_json(silent=True)
    error = validate_simulation(data)
    if error:
        return jsonify({'message': error}), 400

    result = analyze_scenario({
        'crop': data['crop'],
        'temperature': data['temperature'],
        'droughtDays': data['droughtDays'],
        'salinity': data['salinity'],
        'simulationPeriod': data['simulationPeriod'],
    })
    result['createdAt'] = datetime.now(timezone.utc).isoformat()

    try:
        save_simulation(result)
    except PyMongoError:
        return jsonify({
            'message': 'MongoDB is unavailable. Start MongoDB and try again.',
        }), 503

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5000)