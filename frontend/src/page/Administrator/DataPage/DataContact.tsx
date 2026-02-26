import { InputMask } from '@react-input/mask'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { TContact } from '../../../components/type/Services.type'
import { IconList } from '../../../components/ui/IconList'
import { UpdateLineBasic } from '../../../components/ui/natificationMesseg/natificationMessag'
import { ROUTES } from '../../../model/routes'
import SocialItem from './Contact/SocialItem'

const DataContact = () => {
	const [Edit, setEdit] = useState<boolean>(false)
	const [ValuePhone, setValuePhone] = useState<string>('')
	const [ContactBD, setContactBD] = useState<TContact[]>([])

	useEffect(() => {
		const AllContact = async () => {
			await axios
				.get<TContact[]>(`${process.env.REACT_APP_SERVER}/Contact`)
				.then(res => setContactBD(res.data))
				.catch(err => console.log(err))
		}
		AllContact()
	}, [setContactBD])

	useEffect(() => {
		ContactBD.map(data => {
			data.Name === 'Telephone' && setValuePhone(data.Value)
		})
	}, [ContactBD])

	const UpdatePhone = (id: number) => {
		const value = { Value: ValuePhone, id: id }
		axios
			.post(`${process.env.REACT_APP_SERVER}/ContactUpdate`, value)
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					UpdateLineBasic()
					UpdateLocalPhone(id)
				}
			})
	}

	const UpdateLocalPhone = (id: number) => {
		const itemsIndex = ContactBD.findIndex(value => value.id === id)
		const NewItem = {
			...ContactBD[itemsIndex],
			Value: ValuePhone,
		}
		const newCard = ContactBD.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setContactBD(newCard)
	}

	return (
		<div className='DataContact'>
			<div className='DataContact_header'>
				<Link to={ROUTES.AdminHome} className='Office_header_BackLink'>
					Назад
				</Link>
				<div className='DataContact_header--title'>
					<h1>Контактные данные</h1>
				</div>
			</div>
			<div className='DataContact_content'>
				<h1>Контактные данные для связи</h1>
				<div className='DataContact_content--phone'>
					<h2>Телефон:</h2>
					{ContactBD.map(
						data =>
							data.Name === 'Telephone' && (
								<section key={data.id}>
									{!Edit ? (
										<p>{ValuePhone}</p>
									) : (
										<InputMask
											mask='+7 (___) ___-__-__'
											replacement={{ _: /\d/ }}
											type='text'
											name=''
											id=''
											placeholder=''
											onChange={event => setValuePhone(event.target.value)}
											value={ValuePhone}
										/>
									)}
									{!Edit ? (
										<button onClick={() => setEdit(true)}>
											{IconList.Edit_ON}
										</button>
									) : (
										<button
											onClick={() => {
												if (data.Value !== ValuePhone) {
													UpdatePhone(data.id)
												}
												setEdit(false)
											}}
										>
											{IconList.Edit_YES}
										</button>
									)}
								</section>
							),
					)}
				</div>
				<div className='DataContact_content--social'>
					<div className='DataContact_content--social--item'>
						{ContactBD.map(
							data =>
								data.Name !== 'Telephone' && (
									<SocialItem
										key={data.id}
										id={data.id}
										Name={data.Name}
										Link={data.Value}
										ContactBD={ContactBD}
										setContactBD={setContactBD}
									/>
								),
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default DataContact
