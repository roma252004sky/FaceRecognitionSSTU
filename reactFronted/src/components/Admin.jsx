import '../assets/css/Admin.css';
import { Link } from "react-router-dom";
import Header from './Header';


function Admin() {

	return (
		<>
			<Header text="Вернуться к камерам" src="/start" />
			<div className='page'>
				<main className="main page-admin">
					<h1 className='page-admin__title'>Админ панель</h1>
					<div className="page-admin__body">
						<Link to={"institutes"}>
							<div className="page-admin__item">Институты</div>
						</Link>
						<Link to={""}>
							<div className="page-admin__item">Ограничения</div>
						</Link>
						<Link to={"notification"}>
							<div className="page-admin__item">Уведомления</div>
						</Link>
					</div>
				</main>
			</div>
		</>
	);
}

export default Admin
