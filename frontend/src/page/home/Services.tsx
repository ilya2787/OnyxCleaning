import './StyleHome.scss'

const Services = () => {
	return (
		<div className='services-home'>
			<h1 className='services-home-h1'>Услуги</h1>
			<div className='services-home-content'>
				<div className='services-home-content-apartments'>
					<div className='services-home-content-apartments_items'>
						<h2>Уборка квартир и домов</h2>
						<ul>
							<li>Базовая уборка</li>
							<li>Генеральная уборка</li>
							<li>Уборка после ремонта</li>
						</ul>
						<button>Заказать</button>
					</div>
				</div>
				<div className='services-home-content-topLeft'>
					<div className='services-home-content-topLeft-office'>
						<div className='services-home-content-topLeft-office_items'>
							<h2>Уборка офисов</h2>
							<ul>
								<li>Базовая уборка</li>
								<li>Генеральная уборка</li>
								<li>Уборка после ремонта</li>
							</ul>
							<button>Заказать</button>
						</div>
					</div>
					<div className='services-home-content-topLeft-windows'>
						<div className='services-home-content-topLeft-windows_items'>
							<h2>Мойка окон</h2>
							<ul>
								<li>Квартир</li>
								<li>Домов</li>
								<li>Офисов</li>
							</ul>
							<button>Заказать</button>
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
						<button>Заказать</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Services
