import base64
import json
import imutils
from database.db_connector import db, Student
import cv2
import face_recognition
import numpy as np


class FaceRecognitionApp:
    def __init__(self, app):
        self.app = app
        self.known_faces = []
        self.known_names = []
        self.load_known_faces()

    def save_known_faces(self):
        with self.app.app_context():
            for student_id, face_encoding in zip(self.known_names, self.known_faces):
                student = Student.query.get(student_id)
                if student:
                    student.face_embedding = face_encoding.tobytes()
                db.session.commit()

    def load_known_faces(self):
        with self.app.app_context():
            students = Student.query.all()
            self.known_names = [student.card_id for student in students]
            self.known_faces = [student.face_embedding for student in students]

    def add_face_from_images(self, image_list, data):
        face_encodings = []

        for image_data in image_list:
            base64_str = image_data.split(',')[1]
            image_bytes = base64.b64decode(base64_str)
            np_arr = np.frombuffer(image_bytes, np.uint8)
            frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            face_encoding = face_recognition.face_encodings(rgb_frame)
            if face_encoding:
                face_encodings.extend(face_encoding)

        if face_encodings:
            average_encoding = np.mean(face_encodings, axis=0).tolist()
            self.known_faces.append(average_encoding)
            self.known_names.append(data["card_id"])
            print(data['card_id'])
            print(average_encoding)

            with self.app.app_context():
                new_student = Student(
                    card_id=data['card_id'],
                    last_name=data['last_name'],
                    first_name=data['first_name'],
                    patronymic=data['patronymic'],
                    institute_id=int(data['institute_id']),
                    group_id=int(data['group_id']),
                    phone=data['phone'],
                    face_embedding=average_encoding,
                    learning_form=data['learning_form'],
                )
                db.session.add(new_student)
                db.session.commit()
            self.save_known_faces()

    def start_monitoring(self, camera):
        gun_cascade = cv2.CascadeClassifier('cascade.xml')
        first_frame = None
        while True:

            (grabbed, frame) = camera.read()

            if not grabbed:
                break

            frame = imutils.resize(frame, width=500)
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            gray = cv2.GaussianBlur(gray, (21, 21), 0)

            guns = gun_cascade.detectMultiScale(gray, 1.3, 5, minSize=(10, 10))

            for (x, y, w, h) in guns:
                frame = cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

            if first_frame is None:
                first_frame = gray
                continue

            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            face_locations = face_recognition.face_locations(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY))
            face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
            if len(face_locations) == 0:
                ret, buffer = cv2.imencode('.jpg', frame)
                img = buffer.tobytes()
                yield self.generate_frame(img)
            else:
                for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
                    name = "Unknown"
                    access = "False"
                    face_distances = face_recognition.face_distance(self.known_faces, face_encoding)
                    best_match_index = np.argmin(face_distances)
                    if face_distances[best_match_index] < 0.45:
                        name = self.known_names[best_match_index]
                        access = "True"
                    cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
                    cv2.rectangle(frame, (left, bottom + 30), (right, bottom), (0, 0, 255), cv2.FILLED)
                    font = cv2.FONT_HERSHEY_DUPLEX
                    cv2.putText(frame, name, (left + 6, bottom - 6), font, 0.5, (255, 255, 255), 1)
                    ret, buffer = cv2.imencode('.jpg', frame)
                    img = buffer.tobytes()

                    yield self.generate_face(img, access, name)

        camera.release()

    def generate_face(self, img, access, name):
        img_base64 = base64.b64encode(img).decode('utf-8')
        metadata = {'Access': access, 'User': name, 'Image': img_base64}
        return json.dumps(metadata) + "\n"

    def generate_frame(self, img):
        img_base64 = base64.b64encode(img).decode('utf-8')
        metadata = {'Access': "", 'User': "", 'Image': img_base64}
        return json.dumps(metadata) + "\n"
