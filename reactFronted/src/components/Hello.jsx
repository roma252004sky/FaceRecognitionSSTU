import '../assets/css/Hello.css';
import '../assets/css/MainPage.css'
import Header from './Header';
import { Link } from "react-router-dom";

function MainPage() {
	return (
		<>
			<div className='hello__none'>
				<Header />
				<div className='hello'>
					<Link to={"/start"}>
						<button className='hello__button button'>Старт</button>
					</Link>
				</div>
			</div>
		</>
	);
}

export default MainPage
