import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { CONTACT } from '../../components/ContactData/ContactData'
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'
import TitlePage from '../../components/Title/TitlePage'
import './style.scss'

const Error404 = () => {
	return (
		<motion.div
			className='Content_404'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.3 } }}
			exit={{ opacity: 0, transition: { duration: 0.3 } }}
		>
			<TitlePage Title={'Секретная страница 404'} />
			<HeaderMenu />
			<div className='Content_404_title'>
				<h1>4</h1>
				<div className='Content_404_title--img'>
					<img src='/img/Onyx.png' alt='' />
				</div>
				<h1>4</h1>
			</div>
			<div className='Content_404_menu'>
				<h2>Упс! Похоже, эта страница отправилась на внеплановую уборку!</h2>
				<p>
					Видимо, наш робот-пылесос увлёкся и "убрал" эту страницу слишком
					тщательно. <br /> Или, возможно, она отправилась на профессиональную
					чистку и еще не вернулась на своё место.
				</p>
				<h2>Что можно сделать?</h2>
				<p>
					Не волнуйтесь! Даже когда страница прячется, наш сервис работает
					безупречно:
				</p>
				<div className='Content_404_menu--UL'>
					<div className='Content_404_menu--UL--item'>
						<span>1</span>
						<h2>Вернуться на чистую территорию</h2>
						<Link className='Content_404_menu--UL--item--Link' to={'/'}>
							Главная
						</Link>
					</div>
					<div className='Content_404_menu--UL--item'>
						<span>2</span>
						<h2>Заказать генеральную уборку</h2>
						<Link
							className='Content_404_menu--UL--item--Link'
							to={'/Calculator/CleaningApartment/Order'}
						>
							Заказать
						</Link>
					</div>
					<div className='Content_404_menu--UL--item'>
						<span>3</span>
						<h2>Воспользоваться нашим навигационным компасом</h2>
						<p>Перейти по одному из пунктов меню</p>
					</div>
					<div className='Content_404_menu--UL--item'>
						<span>4</span>
						<h2>Позвонить менеджеру для поиска</h2>
						<a href='tel:+79937730011'>{CONTACT.Telephone}</a>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default Error404
