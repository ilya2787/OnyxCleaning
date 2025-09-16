import { IconList } from '../../components/ui/IconList'
import Advantages from './Advantages'
import FeedBack from './Feedback'
import Services from './Services'
import './StyleHome.scss'

const Home = () => {
	return (
		<div>
			<div className='header_home'>
				<h1 className='header_home_h1'>Cleaning</h1>
				<div className='header_home_center'>
					<div className='header_home_center_text'>
						<h2>Профессиональные стандарты</h2>
						<h3>Ваш комфорт</h3>
						<p>Персональный подход к чистоте</p>
						<p>Клининговые услуги для дома и офиса</p>
					</div>
					<img
						className='header_home_center_img'
						src='./img/foto1.png'
						alt=''
					/>
				</div>
				<div className='header_home_Btn'>
					<button>Заказать</button>
					<button>
						<span>{IconList.Calculator}</span> Рассчитать
					</button>
				</div>
			</div>
			<Services />
			<Advantages />
			<FeedBack />
		</div>
	)
}

export default Home
