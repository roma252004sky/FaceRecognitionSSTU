from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Institute(db.Model):
    __tablename__ = 'Institutes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Institute {self.name}>'

class Group(db.Model):
    __tablename__ = 'Groups'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10), nullable=False)
    institute_id = db.Column(db.Integer, db.ForeignKey('Institutes.id'), nullable=False)
    institute = db.relationship('Institute', backref=db.backref('groups', lazy=True))

    def __repr__(self):
        return f'<Group {self.name}>'

class Student(db.Model):
    __tablename__ = 'Students'
    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    patronymic = db.Column(db.String(100), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('Groups.id'), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    card_id = db.Column(db.String(6),nullable=True)
    institute_id = db.Column(db.Integer, db.ForeignKey('Institutes.id'))
    learning_form = db.Column(db.String(20), nullable=True)
    face_embedding = db.Column(db.PickleType, nullable=True)
    def __repr__(self):
        return f'<Student {self.last_name} {self.first_name} {self.patronymic}>'
