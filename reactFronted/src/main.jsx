import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Hello from './components/Hello'
import Admin from './components/Admin.jsx'
import Institutes from './components/Institutes.jsx'
import Groups from './components/Groups.jsx'
import Students from './components/Students.jsx'
import Notifications from './components/Notifications.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import "./index.css";
import MainPage from './components/MainPage.jsx'
import AddStudent from './components/AddStudent.jsx'

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Hello />
			},
			{
				path: 'start/',
				element: <MainPage />
			},
			{
				path: 'admin/',
				children: [
					{
						index: true,
						element: <Admin />
					},
					{
						path: 'institutes/',
						children: [
							{
								index: true,
								element: <Institutes />
							},
							{
								path: ':instituteId/groups/',
								element: <Groups />,
							},
							{
								path: ':instituteId/groups/:groupId/students/',
								element: <Students />
							},
							{
								path: ':instituteId/groups/:groupId/students/addStudent',
								element: <AddStudent />
							}
						],
					},
					{
						path: 'notification/',
						element: <Notifications />
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
	,
);
