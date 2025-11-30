import { Link } from 'react-router-dom'
import './style.scss'

const Error404 = () => {
	return (
		<div className='Content_404'>
			<div className='Content_404_title'>
				<h1>4</h1>
				<h2>0</h2>
				<h1>4</h1>
			</div>
			<div className='Content_404_menu'>
				<h2>
					Ой.... Что то пошло не так, <br /> Такой странице не существует
				</h2>
				<p>Но вы всегда можете вернуться на главную страницу</p>

				<Link className='Content_404_menu--Link' to={'/'}>
					Вернуться
				</Link>
			</div>
		</div>
	)
}

export default Error404
