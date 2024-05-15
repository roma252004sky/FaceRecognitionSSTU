import '../assets/css/Institutes.css';
import { Link } from "react-router-dom";
import Header from './Header';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { host } from '../App'
import { useParams } from 'react-router-dom';


function Groups() {
	const [groups, setGroups] = useState();
	const { instituteId } = useParams();

	useEffect(() => {
		const apiUrl = host + '/institutes/' + instituteId + '/groups';
		axios.get(apiUrl).then((resp) => {
			const allGroups = resp.data;
			setGroups(allGroups);
		});
	}, [setGroups]);

	return (
		<>
			<Header text="Вернуться к камерам" src="/start" />
			<div className='page'>
				<main className="main page-admin">
					<h1 className='page-admin__title'>Группы</h1>
					<Link to={"../"}>
						<div div className='page-admin__button button'>Назад</div>
					</Link>
					<div className="page-admin__body">
						{groups && groups.map(group => (
							<Link to={group.id + ("/students")} key={group.id + group.name}>
								<div className="page-admin__item">{group.name}</div>
							</Link>
						))}
					</div>
				</main>
			</div >
		</>
	);
}

export default Groups
