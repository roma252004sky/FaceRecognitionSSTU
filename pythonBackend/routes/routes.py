import cv2
from flask import Blueprint, jsonify, request, Response
from database.db_connector import db, Student, Institute, Group
from neural_network.execute import FaceRecognitionApp

routes = Blueprint('routes', __name__)

face_recognition_app = None

@routes.route('/add_face', methods=['POST'])
def receive_frames():
    data_request = request.get_json()
    frames = data_request[1]
    frames = frames["frames"]
    data = data_request[0]
    data = data["face"]

    face_recognition_app.add_face_from_images(frames, data)
    return jsonify({'message': 'Frames received successfully'}), 200

@routes.route('/institute', methods=['POST'])
def create_institute():
    data = request.json
    name = data.get('name')
    if not name:
        return jsonify({'error': 'Missing name field'}), 400

    institute = Institute(name=name)
    db.session.add(institute)
    db.session.commit()

    return jsonify({'message': 'Institute created successfully'}), 201

@routes.route('/institutes', methods=['GET'])
def get_institutes():
    institutes = Institute.query.all()
    result = [{'id': institute.id, 'name': institute.name} for institute in institutes]
    return jsonify(result), 200

@routes.route('/institutes/<int:institute_id>/groups', methods=['GET'])
def get_groups_by_institute_id(institute_id):
    institute = Institute.query.get(institute_id)
    if institute is None:
        return jsonify({'error': 'Institute not found'}), 404

    groups = Group.query.filter_by(institute_id=institute_id).all()
    result = [{'id': group.id, 'name': group.name} for group in groups]

    return jsonify(result), 200

@routes.route('/groups/<int:group_id>/students', methods=['GET'])
def get_students_by_group_id(group_id):
    group = Group.query.get(group_id)
    if group is None:
        return jsonify({'error': 'Group not found'}), 404
    students = Student.query.filter_by(group_id=group_id).all()
    result = [
        {
            'id': student.id,
            'card_id': student.card_id,
            'last_name': student.last_name,
            'first_name': student.first_name,
            'patronymic': student.patronymic,
            'group_id': student.group_id,
            "institute": student.institute_id,
            'phone': student.phone,
            'learning_form': student.learning_form,
        }
        for student in students
    ]

    return jsonify(result), 200

def webcam():
    camera = cv2.VideoCapture(0)

    for frame in face_recognition_app.start_monitoring(camera):
        yield frame

    camera.release()

@routes.route('/webcam')
def webcam_display():
    return Response(webcam(), mimetype='application/json')

def init_face_recognition_app(app):
    global face_recognition_app
    face_recognition_app = FaceRecognitionApp(app)
