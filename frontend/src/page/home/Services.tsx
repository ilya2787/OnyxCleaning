import { Link } from 'react-router'
import { warning } from '../../components/ui/natificationMesseg/natificationMessag'
import { ROUTES } from '../../model/routes'
import './StyleHome.scss'

const Services = () => {
	return (
		<div className='services-home'>
			<h1 className='services-home-h1'>Услуги</h1>
			<div className='services-home-content'>
				<div className='services-home-content-apartments'>
					<div className='services-home-content-apartments_items'>
						<Link
							to={ROUTES.ApartmentCleaning}
							className='services-home-content-apartments_items--h2'
						>
							<h2>Уборка квартир и домов</h2>
						</Link>

						<ul>
							<li>Базовая уборка</li>
							<li>Генеральная уборка</li>
							<li>Уборка после ремонта</li>
						</ul>
						<Link
							className='services-home-content-apartments_items--BTN'
							to={'/Calculator/CleaningApartment/Order'}
						>
							Заказать
						</Link>
					</div>
				</div>
				<div className='services-home-content-topLeft'>
					<div className='services-home-content-topLeft-office'>
						<div className='services-home-content-topLeft-office_items'>
							<Link
								to={ROUTES.OfficesCleaning}
								className='services-home-content-topLeft-office_items--h2'
							>
								<h2>Уборка офисов</h2>
							</Link>
							<ul>
								<li>Базовая уборка</li>
								<li>Генеральная уборка</li>
								<li>Уборка после ремонта</li>
							</ul>
							<Link
								to={'/Calculator/CleaningOffice/Order'}
								className='services-home-content-topLeft-office_items--BTN'
							>
								Заказать
							</Link>
						</div>
					</div>
					<div className='services-home-content-topLeft-windows'>
						<div className='services-home-content-topLeft-windows_items'>
							<Link
								to={ROUTES.WindowsCleaning}
								className='services-home-content-topLeft-windows_items--h2'
							>
								<h2>Мойка окон</h2>
							</Link>
							<ul>
								<li>Квартир</li>
								<li>Домов</li>
								<li>Офисов</li>
							</ul>
							<Link
								to={'/Calculator/CleaningWindows/Order'}
								className='services-home-content-topLeft-windows_items--BTN'
							>
								Заказать
							</Link>
						</div>
					</div>
				</div>
				<div className='services-home-content-cleaning'>
					<div className='services-home-content-cleaning_items'>
						<h2>Химчистка</h2>
						<ul>
							<li>Диваны</li>
							<li>Кресла</li>
							<li>Стулья</li>
							<li>Пуфы</li>
							<li>Матрасы</li>
						</ul>
						<button
							onClick={() => {
								warning()
							}}
						>
							Заказать
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Services
