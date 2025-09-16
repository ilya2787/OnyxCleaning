import { useState } from 'react'
import { Link } from 'react-router'
import { CONTACT } from '../ContactData/ContactData'
import { ItemsMenu } from '../HeaderMenu/ItemsMenu'
import { TypeListMenu } from '../HeaderMenu/TypeData'
import { IconList } from '../ui/IconList'
import './footer.scss'

const Footer = () => {
	const [ListMenu, setListMenu] = useState<TypeListMenu[]>(ItemsMenu)

	return (
		<footer>
			<div className='content'>
				<div className='content-contact'>
					<a href='/#' className='content-contact-tel'>
						{CONTACT.Telephone}
					</a>
					<div className='content-contact-social'>
						<a href='/#'>{IconList.WhatsApp}</a>
						<a href='/#'>{IconList.Telegram}</a>
					</div>
				</div>
				<div className='content-menu'>
					<ul>
						{ListMenu.map(data => (
							<li key={data.id}>
								<Link to={data.link} className='content-menu--Link'>
									{data.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className='content-LogoAndCopyright'>
					<div className='content-LogoAndCopyright-logo'>
						<img src='./img/Logo.png' alt='' />
					</div>
					<p className='content-LogoAndCopyright-copyright'>
						{IconList.Copyright} Onyx cleaning, 2025
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
