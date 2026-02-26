import axios from 'axios'
import { FC, useContext, useState } from 'react'
import { IconList } from '../../../../../components/ui/IconList'
import {
	DeleteLineBasic,
	UpdateLineBasic,
} from '../../../../../components/ui/natificationMesseg/natificationMessag'
import { PriceFormat } from '../../../../../components/ui/PriceFormat/PriceFormat'
import { Context } from '../Office'
interface Props {
	id: number
	price: number
	text: string
	unit?: string
}
const OfficeDopList: FC<Props> = ({ id, unit, price, text }) => {
	const DataContext = useContext(Context)
	const AllListDopOffice = DataContext.AllListDopOffice
	const setAllListDopOffice = DataContext.setAllListDopOffice
	const [Edit, setEdit] = useState<boolean>(false)
	const [ValueText, setValueText] = useState<string>(text)
	const [ValuePrice, setValuePrice] = useState<number>(price)
	const [ValueUnit, setValueUnit] = useState<string>(unit ? unit : '')

	const UpdateAllList = () => {
		const itemsIndex = AllListDopOffice.findIndex(value => value.id === id)
		const NewItem = {
			...AllListDopOffice[itemsIndex],
			text: ValueText,
			price: ValuePrice,
			unit: ValueUnit,
		}
		const newCard = AllListDopOffice.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setAllListDopOffice(newCard)
	}

	const UpdateString = () => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/UpdateDopOffice`, {
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
		const AllArray = AllListDopOffice.filter(item => item.id !== id)
		setAllListDopOffice(AllArray)
	}

	const DeleteItem = (id: number) => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/DeleteDopOffice`, { id: id })
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					DeleteLineBasic()
					DeleteStringAllLink(id)
				}
			})
	}

	return (
		<div className='OfficeDopList'>
			<div className='OfficeDopList_item'>
				<div className='OfficeDopList_item--text'>
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
				<div className='OfficeDopList_item_unit'>
					{!Edit ? (
						unit ? (
							<>
								<p className='OfficeDopList_item_unit--title'>
									Единица измерения:
								</p>
								<p>{unit}</p>
							</>
						) : null
					) : (
						<>
							<p className='OfficeDopList_item_unit--title'>
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
				<div className='OfficeDopList_item_Price'>
					{!Edit ? (
						<>
							<p className='OfficeDopList_item_Price--title'>Цена:</p>
							<p>{PriceFormat(price)}</p>
						</>
					) : (
						<>
							<p className='OfficeDopList_item_Price--title'>Цена: </p>
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
			<div className='OfficeDopList_BTN'>
				{Edit ? (
					<>
						<button
							className='OfficeDopList_BTN--Edit'
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
							className='OfficeDopList_BTN--Delete'
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
						className='OfficeDopList_BTN--Edit'
						onClick={() => setEdit(true)}
					>
						{IconList.Edit_ON}
					</button>
				)}
			</div>
		</div>
	)
}

export default OfficeDopList
