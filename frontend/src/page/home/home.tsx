import { motion } from 'framer-motion'
import { lazy } from 'react'
import { Link } from 'react-router-dom'
import { IconList } from '../../components/ui/IconList'
import Reviews from './Reviews'
import './StyleHome.scss'
const Services = lazy(() => import('./Services'))
const Advantages = lazy(() => import('./Advantages'))
const FeedBack = lazy(() => import('./Feedback'))

const Home = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.1 } }}
		>
			<div className='header_home'>
				<h1 className='header_home_h1'>Cleaning</h1>
				<div className='header_home_center'>
					<div className='header_home_center_text'>
						<h1>Клининговые услуги для дома и офиса</h1>

						<h2>Профессиональные стандарты</h2>
						<h3>Ваш комфорт</h3>
						<p>Персональный подход к чистоте</p>
					</div>
					<img
						className='header_home_center_img'
						src='./img/foto1.png'
						alt=''
					/>
				</div>
				<div className='header_home_Btn'>
					<Link
						to={'/Calculator/CleaningApartment/Order'}
						className='header_home_Btn--Order'
					>
						Заказать
					</Link>
					<Link
						to={'/Calculator/CleaningApartment/Calculation'}
						className='header_home_Btn--Calculator'
					>
						<span>{IconList.Calculator}</span> Рассчитать
					</Link>
				</div>
			</div>
			<Services />
			<Advantages />
			<Reviews />
			<FeedBack />
		</motion.div>
	)
}

export default Home
