# app.py
import base64
import cv2
import numpy as np
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from flask_socketio import emit, SocketIO
from routes.routes import routes, init_face_recognition_app
from database.db_connector import db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://localhost:1433/UniversityDB?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'
socketio = SocketIO(app)

db.init_app(app)

app.register_blueprint(routes)

if __name__ == '__main__':
    init_face_recognition_app(app)
    app.run(debug=True, host='0.0.0.0')
