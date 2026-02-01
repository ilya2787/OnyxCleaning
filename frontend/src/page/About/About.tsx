import { motion } from 'framer-motion'
import { useState } from 'react'
import BackBTN from '../../components/ui/BackBTN/BackBTN'
import { IconList } from '../../components/ui/IconList'
import ModalFeedback from '../../components/ui/Modalfeedback/ModalFeedback'
import './About_style.scss'

const About = () => {
	const [OpenModal, setOpenModal] = useState<boolean>(false)

	return (
		<motion.div
			className='About'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.1 } }}
		>
			<div className='About_title'>
				<h1>Onyx Cleaning</h1>
				<span>Onyx Cleaning</span>
				<h2>профессиональный клининг, которому доверяют</h2>
			</div>
			<BackBTN />
			<div className='About_block'>
				<h1>О нас</h1>
				<div className='About_block--text'>
					<h2>Onyx Cleaning</h2>
					<p>
						Это команда профессионалов в сфере клининговых услуг, работающая в
						Калининграде и Калининградской области. <br />
						Мы специализируемся на качественной, честной и аккуратной уборке
						квартир, домов, офисов и коммерческих помещений.
					</p>
					<h2 style={{ marginTop: '30px' }}>Наша цель</h2>
					<p>
						Не просто «навести порядок», а создать чистое, безопасное и
						комфортное пространство, в которое приятно возвращаться.
					</p>
				</div>
			</div>
			<div className='About_block2'>
				<h1>Кто мы</h1>
				<div className='About_block2--text'>
					<p>
						Мы — организованная команда клинеров, где каждый специалист проходит
						отбор, обучение и работает по единым стандартам качества.
					</p>
					<h2 style={{ marginTop: '30px' }}>Мы ценим</h2>
					<div className='About_block2--text--item'>
						<div>Ответственность</div>
						<div>Пунктуальность</div>
						<div>Аккуратность</div>
						<div>Уважение к клиенту и его пространству</div>
					</div>
				</div>
			</div>
			<div className='About_block3'>
				<h1>Чем мы занимаемся</h1>
				<p>Мы предоставляем полный спектр клининговых услуг</p>
				<div className='About_block3--content'>
					<div className='About_block3--content--item-1'>
						<h2>Для квартир и домов</h2>
						<div className='About_block3--content--item-1-text'>
							<ul>
								<li>Базовая уборка</li>
								<li>Генеральная уборка</li>
								<li>Уборка после ремонта</li>
								<li>регулярная уборка по графику</li>
								<li>мытьё окон, балконов, лоджий</li>
								<li>уборка кухонь, санузлов, гардеробных</li>
								<li>работа с деликатными поверхностями</li>
							</ul>
						</div>
						<span>{IconList.House}</span>
					</div>
					<div className='About_block3--content--item-2'>
						<span>{IconList.OfficeHouse}</span>
						<div className='About_block3--content--item-2-text'>
							<ul>
								<li>уборка офисов</li>
								<li>уборка салонов, студий, коммерческих помещений</li>
								<li>поддерживающая и регулярная уборка</li>
								<li>индивидуальные графики и перечни работ</li>
							</ul>
						</div>
						<h2>Для офисов</h2>
					</div>
					<div className='About_block3--content--item-3'>
						<h2>Дополнительные услуги</h2>
						<div className='About_block3--content--item-3-text'>
							<ul>
								<li>химчистка мягкой мебели и матрасов</li>
								<li>мытьё бытовой техники изнутри</li>
								<li>мытьё люстр и труднодоступных зон</li>
								<li>удаление сложных загрязнений</li>
								<li>срочные и внеурочные заказы</li>
							</ul>
						</div>
						<span>{IconList.ServicesIcon}</span>
					</div>
				</div>
			</div>
			<div className='About_block4'>
				<h1>Как мы работаем</h1>
				<div className='About_block4--content'>
					<div className='About_block4--content-h2'>
						Мы выстроили понятный и честный процесс
						<p>Никаких скрытых доплат и сюрпризов</p>
					</div>
					<div className='About_block4--content-item'>
						<div>
							<span>1</span>
							<p>Вы оставляете заявку на сайте или в мессенджере</p>
						</div>
						<div>
							<span>2</span>
							<p>Мы уточняем детали и сразу называем стоимость</p>
						</div>
						<div>
							<span>3</span>
							<p>
								В назначенное время приезжает клинер с инвентарём и средствами
							</p>
						</div>
						<div>
							<span>4</span>
							<p>Выполняем уборку строго по чек-листу</p>
						</div>
						<div>
							<span>5</span>
							<p>
								Вы принимаете результат — мы не уезжаем, пока всё не устроит
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='About_block5'>
				<h1>Наш подход</h1>
				<h2>Мы придерживаемся принципа:</h2>
				<h3>«Лучше сделать один раз качественно, чем переделывать»</h3>
				<div className='About_block5_content'>
					<div>
						<span>{IconList.Check}</span>
						<p>Используем профессиональные моющие средства</p>
					</div>
					<div>
						<span>{IconList.Check}</span>
						<p>Работаем аккуратно и бережно к имуществу</p>
					</div>
					<div>
						<span>{IconList.Check}</span>
						<p>Соблюдаем санитарные нормы</p>
					</div>
					<div>
						<span>{IconList.Check}</span>
						<p>Учитываем пожелания клиента</p>
					</div>
					<div>
						<span>{IconList.Check}</span>
						<p>Не навязываем лишние услуги</p>
					</div>
				</div>
			</div>
			<div className='About_block6'>
				<h1>
					Почему выбирают <br /> ONYX Cleaning
				</h1>
				<div className='About_block6-content'>
					<div className='About_block6-content--item'>
						<div className='About_block6-content--item--icon'>
							{IconList.PriceTag} <span>{IconList.RUB}</span>
						</div>
						<p>Понятный и прозрачный прайс</p>
					</div>
					<div className='About_block6-content--item'>
						<div className='About_block6-content--item--icon'>
							{IconList.DocumentLock}
						</div>
						<p>Фиксированная стоимость до начала работ</p>
					</div>
					<div className='About_block6-content--item'>
						<div className='About_block6-content--item--icon'>
							{IconList.Clear}
						</div>
						<p>Профессиональный инвентарь и средства</p>
					</div>

					<div className='About_block6-content--item'>
						<div className='About_block6-content--item--icon'>
							{IconList.PersonalCheck}
						</div>
						<p>Проверенные клинеры</p>
					</div>
					<div className='About_block6-content--item'>
						<div className='About_block6-content--item--icon'>
							{IconList.UsedReviews}
						</div>
						<p>Реальные отзывы и повторные клиенты</p>
					</div>
					<div className='About_block6-content--item'>
						<div className='About_block6-content--item--icon'>
							{IconList.JobOfficially}
						</div>
						<p>Работаем официально и ответственно</p>
					</div>
				</div>
			</div>
			<div className='About_block7'>
				<h1>Нам доверяют</h1>
				<p>И с нами работают</p>
				<div className='About_block7-content'>
					<div>частные клиенты</div>
					<div>управляющие компании</div>
					<div>арендодатели и апартаменты</div>
					<div>офисы и салоны</div>
				</div>
			</div>
			<div className='About_FinishTitle'>
				Мы гордимся тем, что к нам возвращаются и рекомендуют
			</div>
			<div className='About_contact'>
				<div className='About_contact-location'>
					<h2>Где мы работаем</h2>
					<div>
						<span>{IconList.Location}</span>
						<p>Калининград</p>
					</div>
					<div>
						<span>{IconList.Location}</span>
						<p>Калининградская область</p>
					</div>
					<h3>Выезд за город возможен — условия обсуждаются заранее.</h3>
				</div>
				<div className='About_contact-connection'>
					<h2>Связь с нами</h2>
					<div>
						<span>{IconList.Mail}</span>
						<p>onyx.cleaning@yandex.com</p>
					</div>
					<div>
						<button onClick={() => setOpenModal(true)}>
							<span>{IconList.global}</span>
							<p>Через форму на нашем сайте</p>
						</button>
					</div>
				</div>
			</div>

			<ModalFeedback OpenModal={OpenModal} setOpenModal={setOpenModal} />
		</motion.div>
	)
}
export default About
