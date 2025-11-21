import { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconList } from '../../components/ui/IconList'
import { ROUTES } from '../../model/routes'
import { CONTACT } from '../ContactData/ContactData'
import { warning } from '../ui/natificationMesseg/natificationMessag'
import './HeaderMenu.scss'
import { ItemsMenu } from './ItemsMenu'
import { TypeListMenu } from './TypeData'

interface TypeProps {
	The_Background: boolean
}

const HeaderMenu: FC<TypeProps> = ({ The_Background }) => {
	const [OpenNav, setOpenNav] = useState<boolean>(false)
	const [ListMenu, setListMenu] = useState<TypeListMenu[]>(ItemsMenu)
	const BtnNavMenu = useRef<HTMLSpanElement>(null)
	const BlockMenu = useRef<HTMLDivElement>(null)
	const [show, handleShow] = useState(false)

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

	const BackgroundNav: React.CSSProperties = {
		background: `${!The_Background ? 'transparent' : '#363231'}`,
	}

	return (
		<nav className={!show ? 'nav' : 'nav Scroll'} style={BackgroundNav}>
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
			<div className={'nav_BlockMenu'} ref={BlockMenu}>
				{ListMenu.map(data => (
					<Link
						to={data.link}
						key={data.id}
						className='nav_BlockMenu-link'
						onClick={() => {
							if (data.name === 'Химчистка') {
								setOpenNav(!OpenNav)
								warning()
							} else {
								setOpenNav(!OpenNav)
							}
						}}
					>
						{data.name}
					</Link>
				))}
			</div>
		</nav>
	)
}

export default HeaderMenu
