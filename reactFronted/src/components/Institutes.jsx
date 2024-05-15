import '../assets/css/Institutes.css';
import { Link } from "react-router-dom";
import Header from './Header';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { host } from '../App'


function Institutes() {
	const [institutes, setInstitutes] = useState();

	useEffect(() => {
		const apiUrl = host + '/institutes';
		axios.get(apiUrl).then((resp) => {
			const allInstitutes = resp.data;

			setInstitutes(allInstitutes);
		});
	}, [setInstitutes]);

	return (
		<>
			<Header text="Вернуться к камерам" src="/start" />
			<div className='page'>
				<main className="main page-admin">
					<h1 className='page-admin__title'>Институты</h1>
					<Link to={"../"}>
						<div className='page-admin__button button'>Назад</div>
					</Link>
					<div className="page-admin__body">
						{institutes && institutes.map(institute => (
							<Link to={institute.id + ("/groups")} key={institute.id + institute.name}>
								<div className="page-admin__item">{institute.name}</div>
							</Link>
						))}
					</div>
				</main>
			</div>
		</>
	);
}

export default Institutes
