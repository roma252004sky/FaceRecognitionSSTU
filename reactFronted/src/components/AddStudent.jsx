import '../assets/css/AddStudent.css';
import { Link } from "react-router-dom";
import Header from './Header';
import { useEffect, useState, useRef } from 'react';
import { host } from '../App'
import { useParams } from 'react-router-dom';

function search(last_name, first_name, patronymic, phone, learning_form, card_id, group_id, institute_id, frames) {
	const face = {
		"last_name": last_name,
		"first_name": first_name,
		"patronymic": patronymic,
		"phone": phone,
		"learning_form": learning_form,
		"card_id": card_id,
		"group_id": group_id,
		"institute_id": institute_id,
	}
	fetch(host + '/add_face', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify([{ face: face }, { frames: frames }])
	})
		.then(response => {
			if (response.ok) {
				console.log('Face sent successfully');
			} else {
				console.error('Failed to send face');
			}
		})
		.catch(error => {
			console.error('Error sending face:', error);
		});
}

function AddStudent() {
	const { groupId, instituteId } = useParams();
	const [videoStream, setVideoStream] = useState(null);
	const [capturedFrames, setCapturedFrames] = useState([]);
	const [faceImages, setFaceImages] = useState([]);
	const [last_name, setLast_name] = useState("");
	const [first_name, setFirst_name] = useState("");
	const [patronymic, setPatronymic] = useState("");
	const [card_id, setCard_id] = useState("");
	const [phone, setPhone] = useState("");
	const [learning_form, setLearning_form] = useState("");
	const [curFrame, setFrame] = useState(null);
	const videoRef = useRef(null);

	const startSending = () => {
		const frames = [];

		const video = document.createElement('video');
		video.autoplay = true;

		navigator.mediaDevices.getUserMedia({ video: true })
			.then((stream) => {
				video.srcObject = stream;
				setVideoStream(stream);

				const interval = setInterval(() => {
					const canvas = document.createElement('canvas');
					const context = canvas.getContext('2d');
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;
					context.drawImage(video, 0, 0, canvas.width, canvas.height);
					const imageData = canvas.toDataURL('image/jpeg');
					frames.push(imageData);
					setFrame(imageData);
					setCapturedFrames([...frames]);
				}, 100);

				setTimeout(() => {
					clearInterval(interval);
					stopVideoStream(stream);
					setFaceImages(frames);
					setFrame(null);
				}, 10000);
			})
			.catch((error) => {
				console.error('Не удалось получить доступ к веб-камере:', error);
			});
	};

	const stopVideoStream = (stream) => {
		stream.getTracks().forEach(track => track.stop());
		setVideoStream(null);
	};

	return (
		<>
			<Header text="Вернуться к камерам" src="/start" />
			<div className='page'>
				<main className="main page-admin">
					<h1 className='page-admin__title'>Добавление Студента</h1>
					<Link to={"../" + instituteId + "/groups/" + groupId + "/students"}>
						<div className='page-admin__button button'>Назад</div>
					</Link>
					<div className="page-admin__body">
						<form className='addForm'>
							<input className='input' name="last_name" placeholder='Имя' value={last_name} onChange={(newValue) => { setLast_name(newValue.target.value) }} />
							<input className='input' name="first_name" placeholder='Фамилия' value={first_name} onChange={(newValue) => { setFirst_name(newValue.target.value) }} />
							<input className='input' name="patronymic" placeholder='Отчество' value={patronymic} onChange={(newValue) => { setPatronymic(newValue.target.value) }} />
							<input className='input' name="card_id" placeholder='Номер студенческого билета' value={card_id} onChange={(newValue) => { setCard_id(newValue.target.value) }} />
							<input className='input' name="phone" placeholder='Телефон' value={phone} onChange={(newValue) => { setPhone(newValue.target.value) }} />
							<input className='input' name="learning_form" placeholder='Форма обучения' value={learning_form} onChange={(newValue) => { setLearning_form(newValue.target.value) }} />
						</form>
						<div>
							{curFrame && (
								<div className='page-admin__video'>
									<img src={curFrame} alt="video" />
								</div>
							)}
							{faceImages.length > 0 && (
								<div className='page-admin__alert'>Фото загружены</div>
							)}
							<button className='page-admin__button button' onClick={() => { startSending(); }}>Добавление фото</button>
							<button className='page-admin__button button' onClick={() => { search(last_name, first_name, patronymic, phone, learning_form, card_id, groupId, instituteId, faceImages) }}>Отправить</button>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

export default AddStudent
