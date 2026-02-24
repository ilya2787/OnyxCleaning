import axios from 'axios'
import { FC, useContext, useState } from 'react'
import { IconList } from '../../../../../components/ui/IconList'
import {
	DeleteLineBasic,
	UpdateLineBasic,
} from '../../../../../components/ui/natificationMesseg/natificationMessag'
import { PriceFormat } from '../../../../../components/ui/PriceFormat/PriceFormat'
import { Context } from '../Apartment'
interface Props {
	id: number
	price: number
	text: string
	unit?: string
}
const ApartmentDopList: FC<Props> = ({ id, unit, price, text }) => {
	const DataContext = useContext(Context)
	const AllListDopApartment = DataContext.AllListDopApartment
	const setAllListDopApartment = DataContext.setAllListDopApartment
	const [Edit, setEdit] = useState<boolean>(false)
	const [ValueText, setValueText] = useState<string>(text)
	const [ValuePrice, setValuePrice] = useState<number>(price)
	const [ValueUnit, setValueUnit] = useState<string>(unit ? unit : '')

	const UpdateAllList = () => {
		const itemsIndex = AllListDopApartment.findIndex(value => value.id === id)
		const NewItem = {
			...AllListDopApartment[itemsIndex],
			text: ValueText,
			price: ValuePrice,
			unit: ValueUnit,
		}
		const newCard = AllListDopApartment.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setAllListDopApartment(newCard)
	}

	const UpdateString = () => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/UpdateDopApartment`, {
				text: ValueText,
				price: ValuePrice,
				unit: ValueUnit,
				id: id,
			})
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					UpdateLineBasic()
					UpdateAllList()
				}
			})
			.catch(err => console.log(err))
	}

	const DeleteStringAllLink = (id: number) => {
		const AllArray = AllListDopApartment.filter(item => item.id !== id)
		setAllListDopApartment(AllArray)
	}

	const DeleteItem = (id: number) => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/DeleteDopApartment`, { id: id })
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					DeleteLineBasic()
					DeleteStringAllLink(id)
				}
			})
	}

	return (
		<div className='ApartmentDopList'>
			<div className='ApartmentDopList_item'>
				<div className='ApartmentDopList_item--text'>
					{!Edit ? (
						<p>{text}</p>
					) : (
						<input
							type='text'
							name=''
							onChange={e => setValueText(e.target.value)}
							value={ValueText}
							id=''
						/>
					)}
				</div>
				<div className='ApartmentDopList_item_unit'>
					{!Edit ? (
						unit ? (
							<>
								<p className='ApartmentDopList_item_unit--title'>
									Единица измерения:
								</p>
								<p>{unit}</p>
							</>
						) : null
					) : (
						<>
							<p className='ApartmentDopList_item_unit--title'>
								Единица измерения:
							</p>
							<input
								type='text'
								value={ValueUnit}
								onChange={e => setValueUnit(e.target.value)}
							/>
						</>
					)}
				</div>
				<div className='ApartmentDopList_item_Price'>
					{!Edit ? (
						<>
							<p className='ApartmentDopList_item_Price--title'>Цена:</p>
							<p>{PriceFormat(price)}</p>
						</>
					) : (
						<>
							<p className='ApartmentDopList_item_Price--title'>Цена: </p>
							<input
								type='number'
								value={ValuePrice}
								onChange={e => setValuePrice(Number(e.target.value))}
							/>
							<p>RUB</p>
						</>
					)}
				</div>
			</div>
			<div className='ApartmentDopList_BTN'>
				{Edit ? (
					<>
						<button
							className='ApartmentDopList_BTN--Edit'
							onClick={() => {
								if (
									text !== ValueText ||
									price !== ValuePrice ||
									unit !== ValueUnit
								) {
									UpdateString()
								}
								setEdit(false)
							}}
						>
							{IconList.Edit_YES}
						</button>
						<button
							className='ApartmentDopList_BTN--Delete'
							onClick={() => {
								if (
									window.confirm(
										`Вы действительно хотите удалить запись из списка`,
									)
								) {
									DeleteItem(id)
								}
							}}
						>
							{IconList.Delete}
						</button>
					</>
				) : (
					<button
						className='ApartmentDopList_BTN--Edit'
						onClick={() => setEdit(true)}
					>
						{IconList.Edit_ON}
					</button>
				)}
			</div>
		</div>
	)
}

export default ApartmentDopList
