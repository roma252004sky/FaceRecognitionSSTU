import { Outlet } from 'react-router-dom';
import './App.css';
import { createContext, useState } from 'react';

export const NotificationContext = createContext(null);

export const host = 'http://localhost:5000'

function App() {
	const [notificationList, setNotificationList] = useState([{
		"id": 1,
		"name": "denis",
		"card_id": "220783",
		"text": "Внимание",
	}]);

	return (
		<NotificationContext.Provider value={{ notificationList, setNotificationList }}>
			<Outlet />
		</NotificationContext.Provider>
	);
}

export default App
