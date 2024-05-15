import '../assets/css/MainPage.css';
import Header from './Header';
import { useEffect, useState, useRef, useContext } from 'react';
import Alert from './Alert';
import { host } from '../App'
import { NotificationContext } from '../App'
// import WebCamCap from './WebCamCap'

function MainPage() {
	const { notificationList, setNotificationList } = useContext(NotificationContext);
	const imgRef = useRef(null);
	const [user, setUser] = useState('N/A');
	const [alertText, setAlertText] = useState('');
	const [access, setAccess] = useState('N/A');
	const [countFaces, setCountFaces] = useState(0);
	const [detectedFaces, setDetectedFaces] = useState([]);
	const [allFace, setAllFace] = useState([]);
	const [buttonStyle, setButtonStyle] = useState("aside__button button button-grey");
	const [buttonStyle2, setButtonStyle2] = useState("aside__button button button-grey active");

	useEffect(() => {
		const fetchStream = async () => {
			const response = await fetch(host + '/webcam');
			const reader = response.body.getReader();
			const decoder = new TextDecoder('utf-8');
			let buffer = '';

			const read = async () => {
				const { done, value } = await reader.read();
				if (done) {
					console.log('Stream ended');
					return;
				}

				buffer += decoder.decode(value, { stream: true });

				let newlineIndex;
				while ((newlineIndex = buffer.indexOf('\n')) > -1) {
					const frame = buffer.slice(0, newlineIndex);
					buffer = buffer.slice(newlineIndex + 1);

					const metadata = JSON.parse(frame);
					if (metadata.User && metadata.Access) {
						setUser(metadata.User);
						setAccess(metadata.Access);
						if (metadata.Access === "True") {
							setButtonStyle("aside__button button button-grey active");
							setButtonStyle2("aside__button button button-grey");
						} else {
							setButtonStyle("aside__button button button-grey");
							setButtonStyle2("aside__button button button-grey active");
						}

						// Update detected faces list
						setDetectedFaces(prevFaces => {
							const updatedFaces = [...prevFaces];
							const faceIndex = updatedFaces.findIndex(face => face.user === metadata.User);
							if (metadata.Access === 'True') {
								if (faceIndex === -1) {
									updatedFaces.push({ user: metadata.User, timestamp: Date.now() });
								} else {
									updatedFaces[faceIndex].timestamp = Date.now();
								}
							}
							setCountFaces(prev => {
								let update = prev;
								if (prevFaces.length != updatedFaces.length) {
									update = update + 1
								}
								return update;
							});
							return updatedFaces;
						});
					}

					const imageDataUrl = 'data:image/jpeg;base64,' + metadata.Image;
					imgRef.current.src = imageDataUrl;
				}

				read();
			};

			read();
		};

		fetchStream();
		const cleanupInterval = setInterval(() => {
			setDetectedFaces(prevFaces => {
				const now = Date.now();
				return prevFaces.filter(face => now - face.timestamp < 3000); // Remove faces not seen for the last 5 seconds
			});
		}, 1000);

		return () => clearInterval(cleanupInterval);
	}, []);

	useEffect(() => {
		if (notificationList) {
			notificationList.map((notification) => {
				const noText = '';
				setAlertText(noText);
				detectedFaces.map((face) => {
					if (notification.card_id == face.user) {
						const alert = notification.text
						setAlertText(alert);
					}
				})
			})
		}
	}, [alertText, detectedFaces])

	return (
		<>
			<Header text="Войти в админ панель" src="../admin" />
			<div className='page main-page'>
				<main className="main">
					<div className="stream">
						<img ref={imgRef} alt="Webcam Stream" />
						{alertText && (<Alert text={alertText} />)}
					</div>
					<div className='block-info'>
						{detectedFaces && detectedFaces.map((face) => (
							<div key={face.user}>
								<p>{face.user}</p>
							</div>
						))}
					</div>
				</main>
				<aside className='aside'>
					<button className='aside__button button'>Выберите устройство</button>
					<div className='aside__text'>Состояние турникета</div>
					<div className='aside_buttons'>

						<div className={buttonStyle}>Открыто</div>
						<div className={buttonStyle2}>Закрыто</div>
					</div>
					<div className='aside__statistic statistic'>
						<div className="statistic__item">Вошло в вуз: {countFaces}</div>
						<div className="statistic__item">Вышло из вуза: 14</div>
						<div className="statistic__item">Количество людей в вузе: 98</div>
					</div>
				</aside>
			</div>

		</>
	);
}

export default MainPage
