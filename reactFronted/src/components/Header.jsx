import '../assets/css/Header.css';
import { Link } from "react-router-dom";


function Header({ text, src }) {

	return (
		<>
			<header className='header'>
				<div className='header__logo'>
					<Link to={"/start"}>
						<img src="http://localhost:5173/public/logo.png" alt="СГТУ" />
					</Link>
				</div>
				<Link to={src}>
					<button className='header__button button'>{text}</button>
				</Link>
			</header>
		</>
	);
}

export default Header
