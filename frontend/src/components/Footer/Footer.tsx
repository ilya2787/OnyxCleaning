import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ItemsMenu } from '../HeaderMenu/ItemsMenu'
import { TypeListMenu } from '../HeaderMenu/TypeData'
import { TContact } from '../type/Services.type'
import { FormatPhone } from '../ui/FormatPhone/FormatPhone'
import { IconList } from '../ui/IconList'
import { warning } from '../ui/natificationMesseg/natificationMessag'
import './footer.scss'

const Footer = () => {
	const [ListMenu, setListMenu] = useState<TypeListMenu[]>(ItemsMenu)
	const [Contact, setContact] = useState<TContact[]>([])
	const [Telephone, setTelephone] = useState<string>('')
	const [TelegramLink, setTelegramLink] = useState<string>('')
	const [MaxLink, setMaxLink] = useState<string>('')

	useEffect(() => {
		const ContactAll = async () => {
			await axios
				.get<TContact[]>(`${process.env.REACT_APP_SERVER}/Contact`)
				.then(res => setContact(res.data))
				.catch(err => console.log(err))
		}
		ContactAll()
	}, [setContact])

	useEffect(() => {
		Contact.map(data => {
			data.Name === 'Telephone' && setTelephone(data.Value)
			data.Name === 'Telegram' && setTelegramLink(data.Value)
			data.Name === 'Max' && setMaxLink(data.Value)
		})
	}, [Contact])

	return (
		<footer>
			<div className='content'>
				<div className='content-contact'>
					<a
						href={`tel:${FormatPhone(Telephone)}`}
						className='content-contact-tel'
					>
						{Telephone}
					</a>
					<div className='content-contact-social'>
						<a href={`${MaxLink}`}>
							<img src='/img/max.png' alt='' />
						</a>
						<a href={`${TelegramLink}`}>{IconList.Telegram}</a>
					</div>
				</div>
				<div className='content-menu'>
					<ul>
						{ListMenu.map(data => (
							<li key={data.id}>
								<Link
									to={data.link}
									className='content-menu--Link'
									onClick={() => {
										if (data.name === 'Химчистка') {
											warning()
										}
									}}
								>
									{data.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className='content-LogoAndCopyright'>
					<div className='content-LogoAndCopyright-logo'>
						<img src='/img/Logo.png' alt='' />
					</div>
					<p className='content-LogoAndCopyright-copyright'>
						{IconList.Copyright} Onyx cleaning, 2025
					</p>
				</div>
				<div className='content-infoText'>
					<p>
						Вся предоставленная на сайте информация носит информационный
						характер и ни при каких условиях не является публичной офертой.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
