import { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconList } from '../../components/ui/IconList'
import { ROUTES } from '../../model/routes'
import { CONTACT } from '../ContactData/ContactData'
import { warning } from '../ui/natificationMesseg/natificationMessag'
import { UseClickOut } from '../ui/UseClickOut/UseClickOut'
import './HeaderMenu.scss'
import { ItemsMenu } from './ItemsMenu'
import { TypeListMenu } from './TypeData'

const HeaderMenu: FC = () => {
	const [OpenNav, setOpenNav] = useState<boolean>(false)
	const [ListMenu, setListMenu] = useState<TypeListMenu[]>(ItemsMenu)
	const BtnNavMenu = useRef<HTMLSpanElement>(null)
	const BlockMenu = useRef<HTMLDivElement>(null)
	const BlockMenu_Burger = useRef<HTMLDivElement>(null)
	const BlockContacts = useRef<HTMLDivElement>(null)
	const [show, handleShow] = useState(false)
	const [OpenBlockContact, setOpenBlockContact] = useState<boolean>(false)
	const BtnOpenContact = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (OpenNav) {
			BlockMenu.current?.classList.add('Active')
			BtnNavMenu.current?.classList.add('Active')
			BlockMenu.current?.classList.remove('Close')
			BtnNavMenu.current?.classList.remove('Close')
		} else {
			BlockMenu.current?.classList.remove('Active')
			BtnNavMenu.current?.classList.remove('Active')
			BlockMenu.current?.classList.add('Close')
			BtnNavMenu.current?.classList.add('Close')
		}
	}, [OpenNav])

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 50) {
				handleShow(true)
			} else handleShow(false)
		})
		return () => {
			window.removeEventListener('scroll', () => {})
		}
	}, [])

	const [OpenBurger, setOpenBurger] = useState<boolean>(false)
	const CheckedBurger = () => {
		if (OpenBurger) {
			setOpenBurger(false)
			BlockMenu_Burger.current?.classList.remove('Active')
			BlockMenu_Burger.current?.classList.add('Close')
		} else {
			setOpenBurger(true)
			BlockMenu_Burger.current?.classList.add('Active')
			BlockMenu_Burger.current?.classList.remove('Close')
			setOpenBlockContact(false)
		}
	}

	useEffect(() => {
		if (!OpenBurger) {
			BlockMenu_Burger.current?.classList.remove('Active')
			BlockMenu_Burger.current?.classList.add('Close')
		}
	}, [OpenBurger])

	useEffect(() => {
		if (OpenBlockContact) {
			BlockContacts.current?.classList.add('Active')
			BlockContacts.current?.classList.remove('Close')
			BtnOpenContact.current?.classList.add('Active')
			BtnOpenContact.current?.classList.remove('Close')
			setOpenBurger(false)
		} else {
			BlockContacts.current?.classList.remove('Active')
			BlockContacts.current?.classList.add('Close')
			BtnOpenContact.current?.classList.remove('Active')
			BtnOpenContact.current?.classList.add('Close')
		}
	}, [OpenBlockContact])

	//Закрытие по тапу вне меню
	UseClickOut(BlockMenu, () => {
		if (OpenNav) {
			setTimeout(() => setOpenNav(false), 150)
		}
	})

	//Закрытие бургер меню свайпом
	useEffect(() => {
		let startTouchY = 0
		let endTouchY = 0
		let startTouchX = 0
		let endTouchX = 0

		document.addEventListener('touchstart', event => {
			startTouchY = event.changedTouches[0].pageY
			startTouchX = event.changedTouches[0].pageX
		})
		document.addEventListener('touchend', event => {
			endTouchY = event.changedTouches[0].pageY
			endTouchX = event.changedTouches[0].pageX
			if (Math.abs(endTouchX - startTouchX) < 30 && endTouchY > startTouchY) {
				setOpenBurger(false)
				setOpenBlockContact(false)
			}
		})
	}, [])

	return (
		<nav className={!show ? 'nav' : 'nav Scroll'}>
			<div className={!show ? 'nav_logo' : 'nav_logo ScrollActive'}>
				<Link to={ROUTES.HOME}>
					{' '}
					<img src='/img/Logo.png' alt='' />{' '}
				</Link>
			</div>
			<button className='nav_Btn' onClick={() => setOpenNav(!OpenNav)}>
				<p className='nav_Btn_text'>Услуги</p>
				<span className='nav_Btn_Icon' ref={BtnNavMenu}>
					{IconList.ArrowDown}
				</span>
			</button>
			<div className='nav_contact'>
				<div className='nav_contact_location'>
					<span>{IconList.Location}</span> <p>Калининград</p>
				</div>
				<p className='nav_contact_tel'>{CONTACT.Telephone}</p>
				<div
					className={
						!show ? 'nav_contact_social' : 'nav_contact_social ScrollActive'
					}
				>
					<a href='/#'>{IconList.WhatsApp}</a>
					<a href='/#'>{IconList.Telegram}</a>
				</div>
			</div>

			<div className='nav--MenuMobile'>
				<button
					ref={BtnOpenContact}
					className='nav--MenuMobile--Contact'
					onClick={() => setOpenBlockContact(!OpenBlockContact)}
				>
					{IconList.Contact}
				</button>
				<div className='nav--MenuMobile--Burger'>
					<input
						type='checkbox'
						id='burger-checkbox'
						className='burger-checkbox'
						onChange={() => CheckedBurger()}
						checked={OpenBurger}
					/>
					<label className='burger' htmlFor='burger-checkbox'></label>
				</div>
				<Link
					to={'/Calculator/CleaningApartment/Calculation'}
					className='nav--MenuMobile--Calculator'
				>
					{IconList.Calculator_mobile}
				</Link>
			</div>
			<div className={'nav_BlockMenu'} ref={BlockMenu}>
				{ListMenu.map(data => (
					<Link
						to={data.link}
						key={data.id}
						className='nav_BlockMenu-link'
						onClick={() => {
							if (data.name === 'Химчистка') {
								setOpenNav(!OpenNav)
								setOpenBurger(false)
								warning()
							} else {
								setOpenBurger(false)
								setOpenNav(!OpenNav)
							}
						}}
					>
						{data.name}
					</Link>
				))}
			</div>

			<div className={'nav_BlockMenu_Burger'} ref={BlockMenu_Burger}>
				{ListMenu.map(data => (
					<Link
						to={data.link}
						key={data.id}
						className='nav_BlockMenu_Burger-link'
						onClick={() => {
							if (data.name === 'Химчистка') {
								setOpenNav(!OpenNav)
								setOpenBurger(false)
								warning()
							} else {
								setOpenBurger(false)
								setOpenNav(!OpenNav)
							}
						}}
					>
						{data.name}
					</Link>
				))}
			</div>

			<div className='nav_BlockContactsMobile' ref={BlockContacts}>
				<div className='nav_BlockContactsMobile_content'>
					<div className='nav_BlockContactsMobile_content--Phone'>
						<span>{IconList.Phone}</span>
						<a href='tel:+79937730011'>{CONTACT.Telephone}</a>
					</div>

					<a
						href='http://'
						target='_blank'
						className='nav_BlockContactsMobile_content--telegram'
					>
						<span>{IconList.Telegram}</span> Telegram
					</a>
					<a
						href='http://'
						target='_blank'
						className='nav_BlockContactsMobile_content--WhatsApp'
					>
						<span>{IconList.WhatsApp}</span> WhatsApp
					</a>
				</div>
			</div>
		</nav>
	)
}

export default HeaderMenu
