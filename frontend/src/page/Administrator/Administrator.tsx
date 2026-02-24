import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router'
import { IconList } from '../../components/ui/IconList'
import { UseClickOut } from '../../components/ui/UseClickOut/UseClickOut'
import { ROUTES } from '../../model/routes'
import './AdminStyle.scss'

const AdminPanel = () => {
	document.title = 'Администрирование'

	//Настройки меню
	const [OpenBurger, setOpenBurger] = useState<boolean>(false)
	const BlockMenu = useRef<HTMLDivElement>(null)
	const CheckedBurger = () => {
		if (OpenBurger) {
			setOpenBurger(false)
			BlockMenu.current?.classList.remove('Active')
			BlockMenu.current?.classList.add('Close')
		} else {
			setOpenBurger(true)
			BlockMenu.current?.classList.add('Active')
			BlockMenu.current?.classList.remove('Close')
		}
	}
	useEffect(() => {
		if (!OpenBurger) {
			BlockMenu.current?.classList.remove('Active')
			BlockMenu.current?.classList.add('Close')
		}
	}, [OpenBurger])
	//Закрытие по тапу вне меню
	UseClickOut(BlockMenu, () => {
		if (OpenBurger) {
			setTimeout(() => setOpenBurger(false), 150)
		}
	})
	//

	return (
		<div className='AdminPanel'>
			<MantineProvider>
				<Notifications />
			</MantineProvider>
			<div className='AdminPanel_Menu' ref={BlockMenu}>
				<div className='AdminPanel_Menu_burger'>
					<input
						type='checkbox'
						id='burger-checkbox'
						className='burger-checkbox'
						onChange={() => CheckedBurger()}
						checked={OpenBurger}
					/>
					<label className='burger' htmlFor='burger-checkbox'></label>
				</div>
				<div className='AdminPanel_Menu_Logo'>
					<img src='/img/Logo.png' alt='' />
				</div>
				<ul>
					<Link to={ROUTES.AdminHome} className='AdminPanel_Menu_Link'>
						<li>Главная</li>
					</Link>

					<Link to={ROUTES.UserData} className='AdminPanel_Menu_Link'>
						<li>Клиенты</li>
					</Link>

					<Link to={ROUTES.CleaningData} className='AdminPanel_Menu_Link'>
						<li>Услуги</li>
					</Link>
				</ul>
				<div className='AdminPanel_Menu_user'>
					<div className='AdminPanel_Menu_user_icon'>
						<span>{IconList.User}</span>
						<h2>Администратор</h2>
					</div>
					<button>Выход</button>
				</div>
			</div>

			<div className='AdminPanel_Content'>
				<Outlet />
			</div>
		</div>
	)
}

export default AdminPanel
