import { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconList } from '../../components/ui/IconList'
import { ROUTES } from '../../model/routes'
import { CONTACT } from '../ContactData/ContactData'
import { warning } from '../ui/natificationMesseg/natificationMessag'
import './HeaderMenu.scss'
import { ItemsMenu } from './ItemsMenu'
import { TypeListMenu } from './TypeData'

const HeaderMenu: FC = () => {
	const [OpenNav, setOpenNav] = useState<boolean>(false)
	const [ListMenu, setListMenu] = useState<TypeListMenu[]>(ItemsMenu)
	const BtnNavMenu = useRef<HTMLSpanElement>(null)
	const BlockMenu = useRef<HTMLDivElement>(null)

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
	return (
		<nav className='nav'>
			<div className='nav_logo'>
				<Link to={ROUTES.HOME}>
					{' '}
					<img src='http://localhost:3000/img/Logo.png' alt='' />{' '}
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
				<div className='nav_contact_social'>
					<a href='/#'>{IconList.WhatsApp}</a>
					<a href='/#'>{IconList.Telegram}</a>
				</div>
			</div>
			<div className='nav_BlockMenu' ref={BlockMenu}>
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
