import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { TReviews } from '../../../components/type/Services.type'
import ModalWindows from '../../../components/ui/ModalWindows/ModalWindows'
import { AddStringBasicSuccess } from '../../../components/ui/natificationMesseg/natificationMessag'
import { ROUTES } from '../../../model/routes'
import RatingStar from './Reviews/RatingStar'
import ReviewsItem from './Reviews/ReviewsItem'

const ReviewsAdmin = () => {
	const [AllListReviews, setAllListReviews] = useState<TReviews[]>([])
	const [OpenModalAdd, setOpenModalAdd] = useState<boolean>(false)

	const [ValueNameAdd, setValueNameAdd] = useState<string>('')
	const [CurrentItemStar, setCurrentItemStar] = useState<number>(0)
	const [HoverItemStar, setHoverItemStar] = useState<number>(0)
	const [ValueDate, setValueDate] = useState<string>('')
	const [ValueTextAdd, setValueTextAdd] = useState<string>('')

	const [ValueLinkAdd, setValueLinkAdd] = useState<string>('')
	const [ValueNameLinkAdd, setValueNameLinkAdd] = useState<string>('')

	useEffect(() => {
		const AllList = async () => {
			axios
				.get<TReviews[]>(`${process.env.REACT_APP_SERVER}/ReviewsUser`)
				.then(res => setAllListReviews(res.data))
				.catch(err => console.log(err))
		}
		AllList()
	}, [setAllListReviews])

	const [IdNumberAdd, setIdNumberAdd] = useState<number>(0)
	useEffect(() => {
		const UpdateId = async () => {
			await axios
				.get<TReviews[]>(`${process.env.REACT_APP_SERVER}/ReviewsUser`)
				.then(res => {
					const idFirst = res.data.length - 1
					const idList = res.data[idFirst].id
					setIdNumberAdd(idList + 1)
					const valueId = { value: res.data.length }
					axios
						.post(`${process.env.REACT_APP_SERVER}/AutoIncrReviews`, valueId)
						.then()
						.catch(err => console.log(err))
				})
				.catch(err => console.log(err))
		}
		UpdateId()
	}, [setAllListReviews])

	const AddReviews = (
		event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
	) => {
		event.preventDefault()
		const newValueDate = new Date(ValueDate)
		const DateBd = `${newValueDate.getFullYear()}.${newValueDate.getMonth() + 1}.${newValueDate.getDate()}`
		const value = {
			Name: ValueNameAdd,
			QuantityStar: CurrentItemStar + 1,
			Text: ValueTextAdd,
			Link: ValueLinkAdd,
			Date: DateBd,
			LinkName: ValueNameLinkAdd,
		}
		axios
			.post(`${process.env.REACT_APP_SERVER}/AddReviews`, value)
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					AddStringBasicSuccess()
					setAllListReviews(array => [
						...array,
						{
							id: IdNumberAdd,
							Name: ValueNameAdd,
							QuantityStar: CurrentItemStar + 1,
							Text: ValueTextAdd,
							Link: ValueLinkAdd,
							Date: newValueDate,
							LinkName: ValueNameLinkAdd,
						},
					])
					ClearForm()
				}
			})
			.catch(err => console.log(err))
	}

	const ClearForm = () => {
		setValueNameAdd('')
		setCurrentItemStar(0)
		setValueTextAdd('')
		setValueLinkAdd('')
		setValueDate('')
		setValueNameLinkAdd('')
	}

	return (
		<div className='ReviewsAdmin'>
			<div className='ReviewsAdmin_header'>
				<Link to={ROUTES.AdminHome} className='Office_header_BackLink'>
					Назад
				</Link>
				<div className='ReviewsAdmin_header--title'>
					<h1>Отзывы клиентов</h1>
				</div>
			</div>
			<div className='ReviewsAdmin--content'>
				<div className='ReviewsAdmin--content_BTNAdd'>
					<button onClick={() => setOpenModalAdd(true)}>Добавить запись</button>
				</div>
				{AllListReviews.sort((a, b) => b.id - a.id).map(data => (
					<ReviewsItem
						Name={data.Name}
						QuantityStar={data.QuantityStar}
						DateBD={data.Date}
						Text={data.Text}
						LinkBD={data.Link}
						LinkName={data.LinkName}
						key={data.id}
						id={data.id}
						AllListReviews={AllListReviews}
						setAllListReviews={setAllListReviews}
					/>
				))}
			</div>
			<ModalWindows
				Title='Добавление новой записи'
				modalIsOpen={OpenModalAdd}
				onClose={() => setOpenModalAdd(false)}
			>
				<form onSubmit={AddReviews} className='ReviewsAdmin-ModalContentAdd'>
					<div className='ReviewsAdmin-ModalContentAdd--header'>
						<div className='ReviewsAdmin-ModalContentAdd--header--Name'>
							<input
								type='text'
								value={ValueNameAdd}
								onChange={e => setValueNameAdd(e.target.value)}
								id='ValueNameId'
								placeholder=''
								required
							/>
							<label htmlFor='ValueNameId'>Введите имя</label>
						</div>
						<div className='ReviewsAdmin-ModalContentAdd--header--rating'>
							<h2>Укажите рейтинг</h2>
							<RatingStar
								CountStars={5}
								HoverItem={HoverItemStar}
								setHoverItem={setHoverItemStar}
								CurrentItem={CurrentItemStar}
								setCurrentItem={setCurrentItemStar}
								disable={false}
							/>
						</div>
						<div className='ReviewsAdmin-ModalContentAdd--header--Date'>
							<h2>Укажите дату отзыва</h2>
							<input
								type='Date'
								value={ValueDate}
								onChange={e => setValueDate(String(e.target.value))}
								required
							/>
						</div>
					</div>
					<div className='ReviewsAdmin-ModalContentAdd--text'>
						<textarea
							name=''
							value={ValueTextAdd}
							onChange={e => setValueTextAdd(e.target.value)}
							id='ValueTextId'
							placeholder=''
							required
						/>
						<label htmlFor='ValueTextId'>Введите отзыв</label>
					</div>
					<div className='ReviewsAdmin-ModalContentAdd--footer'>
						<div className='ReviewsAdmin-ModalContentAdd--footer--Link'>
							<input
								type='text'
								value={ValueLinkAdd}
								onChange={e => setValueLinkAdd(e.target.value)}
								id='ValueLinkId'
								placeholder=''
								required
							/>
							<label htmlFor='ValueLinkId'>Введите ссылку</label>
						</div>
						<div className='ReviewsAdmin-ModalContentAdd--footer--LinkName'>
							<input
								type='text'
								value={ValueNameLinkAdd}
								onChange={e => setValueNameLinkAdd(e.target.value)}
								id='ValueLinkNameId'
								placeholder=''
								required
							/>
							<label htmlFor='ValueLinkNameId'>Введите название ресурса</label>
						</div>
					</div>
					<div className='ReviewsAdmin-ModalContentAdd--BTN'>
						<button type='submit'>Добавить</button>
					</div>
				</form>
			</ModalWindows>
		</div>
	)
}

export default ReviewsAdmin
