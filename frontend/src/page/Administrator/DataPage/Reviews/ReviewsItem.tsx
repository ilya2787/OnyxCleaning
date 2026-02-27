import axios from 'axios'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { TReviews } from '../../../../components/type/Services.type'
import { IconList } from '../../../../components/ui/IconList'
import {
	DeleteLineBasic,
	UpdateLineBasic,
} from '../../../../components/ui/natificationMesseg/natificationMessag'
import RatingStar from './RatingStar'
interface Props {
	id: number
	Name: string
	QuantityStar: number
	DateBD: Date
	Text: string
	LinkBD: string
	LinkName: string
	AllListReviews: TReviews[]
	setAllListReviews: Dispatch<SetStateAction<TReviews[]>>
}
const ReviewsItem: FC<Props> = ({
	id,
	Name,
	QuantityStar,
	DateBD,
	Text,
	LinkBD,
	LinkName,
	AllListReviews,
	setAllListReviews,
}) => {
	const [Edit, setEdit] = useState<boolean>(false)

	const [ValueName, setValueName] = useState<string>(Name)
	const [ValueQuantityStar, setValueQuantityStar] =
		useState<number>(QuantityStar)
	const [ValueText, setValueText] = useState<string>(Text)
	const [ValueDate, setValueDate] = useState<string>('')
	const newValueDate = new Date(ValueDate !== '' ? ValueDate : DateBD)
	const DateBdNew = `${newValueDate.getFullYear()}.${newValueDate.getMonth() + 1}.${newValueDate.getDate()}`
	const [ValueLink, setValueLink] = useState<string>(LinkBD)
	const [ValueNameLink, setValueNameLink] = useState<string>(LinkName)
	const [CurrentItemStar, setCurrentItemStar] = useState<number>(
		QuantityStar - 1,
	)
	const [HoverItemStar, setHoverItemStar] = useState<number>(0)

	const UpdateReviews = () => {
		const valueNew = {
			Name: ValueName,
			QuantityStar: CurrentItemStar + 1,
			Text: ValueText,
			Link: ValueLink,
			Date: DateBdNew,
			LinkName: ValueNameLink,
			id: id,
		}
		if (
			ValueName !== Name ||
			CurrentItemStar + 1 !== QuantityStar ||
			ValueText !== Text ||
			ValueLink !== LinkBD ||
			ValueDate !== '' ||
			ValueNameLink !== LinkName
		) {
			console.log(valueNew)
			axios
				.post(`${process.env.REACT_APP_SERVER}/ReviewsUserUpdate`, valueNew)
				.then((res: any) => {
					if (res.data.Status === 'Success') {
						UpdateLineBasic()
						UpdateLocal()
					}
				})
				.catch(err => console.log(err))
		}
	}

	const UpdateLocal = () => {
		const itemsIndex = AllListReviews.findIndex(value => value.id === id)
		const NewItem = {
			...AllListReviews[itemsIndex],
			Name: ValueName,
			QuantityStar: CurrentItemStar + 1,
			Text: ValueText,
			Link: ValueLink,
			Date: ValueDate !== '' ? newValueDate : DateBD,
			LinkName: ValueNameLink,
		}
		const newCard = AllListReviews.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setAllListReviews(newCard)
	}

	const DeleteItem = () => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/DeleteReviews`, { id: id })
			.then((res: any) => {
				if (res.data.STATUS === 'TRUE') {
					DeleteLineBasic()
					DeleteLocal()
				}
			})
	}

	const DeleteLocal = () => {
		setAllListReviews(AllListReviews.filter(item => item.id !== id))
	}

	return (
		<div className='ReviewsAdmin--content-item'>
			<div className='ReviewsAdmin--content-item-header'>
				<div className='ReviewsAdmin--content-item-header--Name'>
					{!Edit ? (
						<h2>{ValueName}</h2>
					) : (
						<input
							type='text'
							name=''
							defaultValue={ValueName}
							onChange={e => setValueName(e.target.value)}
							id=''
						/>
					)}
				</div>

				<div className='ReviewsAdmin--content-item-header--rating'>
					<p>Рейтинг:</p>
					{!Edit ? (
						<RatingStar
							CountStars={5}
							HoverItem={HoverItemStar}
							setHoverItem={setHoverItemStar}
							CurrentItem={CurrentItemStar}
							setCurrentItem={setCurrentItemStar}
							disable={true}
						/>
					) : (
						<RatingStar
							CountStars={5}
							HoverItem={HoverItemStar}
							setHoverItem={setHoverItemStar}
							CurrentItem={CurrentItemStar}
							setCurrentItem={setCurrentItemStar}
							disable={false}
						/>
					)}
				</div>
				<div className='ReviewsAdmin--content-item-header--date'>
					{!Edit ? (
						<>
							<p>Дата:</p>
							<span>
								{new Intl.DateTimeFormat('ru-Ru', {
									year: 'numeric',
									month: 'long',
									day: '2-digit',
								}).format(new Date(DateBD))}
							</span>
						</>
					) : (
						<section>
							<span>
								{new Intl.DateTimeFormat('ru-Ru', {
									year: 'numeric',
									month: 'long',
									day: '2-digit',
								}).format(new Date(DateBD))}
							</span>
							<div className='NewDate'>
								<h2>Введите новую дату</h2>
								<input
									type='date'
									name=''
									value={ValueDate}
									onChange={e => setValueDate(e.target.value)}
									id=''
								/>
							</div>
						</section>
					)}
				</div>
			</div>
			<div className='ReviewsAdmin--content-item--text'>
				{!Edit ? (
					<p>{ValueText}</p>
				) : (
					<textarea
						name=''
						value={ValueText}
						onChange={e => setValueText(e.target.value)}
						id=''
					/>
				)}
			</div>
			<div className='ReviewsAdmin--content-item--footer'>
				<div className='ReviewsAdmin--content-item--footer--Link'>
					{!Edit ? (
						<a href={ValueLink}>{ValueNameLink}</a>
					) : (
						<>
							<div className='ReviewsAdmin--content-item--footer--Link--Name'>
								<p>Название: </p>
								<input
									type='text'
									defaultValue={ValueNameLink}
									onChange={e => setValueNameLink(e.target.value)}
									name=''
									id=''
								/>
							</div>
							<div className='ReviewsAdmin--content-item--footer--Link--LinkItem'>
								<p>Ссылка</p>
								<input
									type='text'
									defaultValue={ValueLink}
									onChange={e => setValueLink(e.target.value)}
								/>
							</div>
						</>
					)}
				</div>
				<div className='ReviewsAdmin--content-item--footer--BTN'>
					{!Edit ? (
						<button
							className='ReviewsAdmin--content-item--footer--BTN--Edit'
							onClick={() => setEdit(true)}
						>
							{IconList.Edit_ON}
						</button>
					) : (
						<>
							<button
								className='ReviewsAdmin--content-item--footer--BTN--Edit'
								onClick={() => {
									UpdateReviews()
									setEdit(false)
								}}
							>
								{IconList.Edit_YES}
							</button>
							<button
								className='ReviewsAdmin--content-item--footer--BTN--Delete'
								onClick={() => {
									if (
										window.confirm(`Вы действительно хотите удалить запись`)
									) {
										DeleteItem()
									}
								}}
							>
								{IconList.Delete}
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default ReviewsItem
