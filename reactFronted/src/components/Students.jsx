import '../assets/css/Institutes.css';
import { Link } from "react-router-dom";
import Header from './Header';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { host } from '../App'
import { useParams } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function Students() {
	const [students, setStudents] = useState();
	const { groupId, instituteId } = useParams();


	useEffect(() => {
		const apiUrl = host + '/groups/' + groupId + '/students';
		axios.get(apiUrl).then((resp) => {
			const allStudents = resp.data;
			setStudents(allStudents);
		});
	}, [setStudents]);

	return (
		<>
			<Header text="Вернуться к камерам" src="/start" />
			<div className='page'>
				<main className="main page-admin">
					<h1 className='page-admin__title'>Студенты</h1>
					<Link to={"../" + instituteId + "/groups"}>
						<div className='page-admin__button button'>Назад</div>
					</Link>
					<Link to={"addStudent"}>
						<div className='page-admin__button button'>Добавить студента</div>
					</Link>
					<div className="page-admin__body">
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell align="right">Номер студенческого билета</TableCell>
										<TableCell align="right">Имя</TableCell>
										<TableCell align="right">Фамилия</TableCell>
										<TableCell align="right">Отчество</TableCell>
										<TableCell align="right">Институт</TableCell>
										<TableCell align="right">Группа</TableCell>
										<TableCell align="right">Телефон</TableCell>
										<TableCell align="right">Форма обучения</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{students && students.map((row, index) => (
										<TableRow
											key={row.id + row.name}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{index+1}
											</TableCell>
											<TableCell align="right">{row.card_id}</TableCell>
											<TableCell align="right">{row.first_name}</TableCell>
											<TableCell align="right">{row.last_name}</TableCell>
											<TableCell align="right">{row.patronymic}</TableCell>
											<TableCell align="right">{row.institute}</TableCell>
											<TableCell align="right">{row.group_id}</TableCell>
											<TableCell align="right">{row.phone}</TableCell>
											<TableCell align="right">{row.learning_form}</TableCell>
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

export default Students
