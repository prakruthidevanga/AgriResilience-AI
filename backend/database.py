import os

from pymongo import MongoClient

_client = None


def save_simulation(result):
    global _client
    if _client is None:
        _client = MongoClient(
            os.getenv('MONGODB_URI', 'mongodb://localhost:27017'),
            serverSelectionTimeoutMS=2500,
        )
    database_name = os.getenv('MONGODB_DATABASE', 'agriresilience_ai')
    _client[database_name]['simulations'].insert_one(dict(result))