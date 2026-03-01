import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router'
import { IconList } from '../../components/ui/IconList'
import { UseClickOut } from '../../components/ui/UseClickOut/UseClickOut'
import { ROUTES } from '../../model/routes'
import './AdminStyle.scss'

const AdminPanel = () => {
	document.title = 'Администрирование'
	axios.defaults.withCredentials = true
	const navigation = useNavigate()
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
	const [Auth, setAuth] = useState<boolean>(false)
	const [Message, setMessage] = useState<string>('')
	const [TitleName, setTitleName] = useState<string>('')
	useEffect(() => {
		async function Authorization() {
			axios
				.get(`${process.env.REACT_APP_SERVER}`)
				.then((res: any) => {
					if (res.data.Status === 'Success') {
						setAuth(true)
						setTitleName(res.data.UserName)
					} else {
						setAuth(false)
						setMessage('Вы не идентифицированы Пожалуйста пройдите авторизацию')
					}
				})
				.catch(err => console.log(err))
		}
		Authorization()
	}, [setAuth])

	const handelDelete = async () => {
		axios
			.get(`${process.env.REACT_APP_SERVER}/logout`)
			.then(res => {
				navigation(ROUTES.AdminPanel)
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			{Auth ? (
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
							<Link to={ROUTES.ContactData} className='AdminPanel_Menu_Link'>
								<li>Контакты</li>
							</Link>
							<Link to={ROUTES.ReviewsData} className='AdminPanel_Menu_Link'>
								<li>Отзывы</li>
							</Link>
						</ul>
						<div className='AdminPanel_Menu_user'>
							<div className='AdminPanel_Menu_user_icon'>
								<span>{IconList.User}</span>
								<h2>{TitleName}</h2>
							</div>
							<button onClick={() => handelDelete()}>Выход</button>
						</div>
					</div>

					<div className='AdminPanel_Content'>
						<Outlet />
					</div>
				</div>
			) : (
				<div className='ErrorAuthorization'>
					<h3>{Message}</h3>
					<Link to={ROUTES.AdminPanel} className='ErrorAuthorization_button'>
						Авторизоваться
					</Link>
				</div>
			)}
		</>
	)
}

export default AdminPanel
