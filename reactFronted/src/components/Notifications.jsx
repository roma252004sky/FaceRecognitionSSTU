import '../assets/css/Institutes.css';
import { Link } from "react-router-dom";
import Header from './Header';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NotificationContext } from '../App'

function Notifications() {
	const { notificationList, setNotificationList } = useContext(NotificationContext);

	useEffect(() => {
		const new_array = [...notificationList];
		new_array.push(
			{
				"id": 1,
				"name": "denis",
				"card_id": "222222",
				"text": "Внимание",
			}
		);
	}, []);

	return (
		<>
			<Header text="Вернуться к камерам" src="/start" />
			<div className='page'>
				<main className="main page-admin">
					<h1 className='page-admin__title'>Админ панель</h1>
					<Link to={"../"}>
						<div className='page-admin__button button'>Назад</div>
					</Link>
					<div className="page-admin__body">
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell align="right">Имя</TableCell>
										<TableCell align="right">Номер студенческого билета</TableCell>
										<TableCell align="right">Текст</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{notificationList && notificationList.map((notification) => (
										<TableRow
											key={notification.id + notification.name}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{notification.id}
											</TableCell>
											<TableCell align="right">{notification.name}</TableCell>
											<TableCell align="right">{notification.card_id}</TableCell>
											<TableCell align="right">{notification.text}</TableCell>
											<TableCell align="right"><button onClick={() => { }}>Добавить</button></TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</main>
			</div>
		</>
	);
}

export default Notifications
