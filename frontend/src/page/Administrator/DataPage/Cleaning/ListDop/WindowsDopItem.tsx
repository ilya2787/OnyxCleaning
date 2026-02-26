import axios from 'axios'
import { FC, useContext, useState } from 'react'
import { IconList } from '../../../../../components/ui/IconList'
import {
	DeleteLineBasic,
	UpdateLineBasic,
} from '../../../../../components/ui/natificationMesseg/natificationMessag'
import { PriceFormat } from '../../../../../components/ui/PriceFormat/PriceFormat'
import { Context } from '../Windows'
interface Props {
	id: number
	price: number
	text: string
	unit?: string
}
const WindowsDopList: FC<Props> = ({ id, unit, price, text }) => {
	const DataContext = useContext(Context)
	const AllListDopWindows = DataContext.AllListDopWindows
	const setAllListDopWindows = DataContext.setAllListDopWindows
	const [Edit, setEdit] = useState<boolean>(false)
	const [ValueText, setValueText] = useState<string>(text)
	const [ValuePrice, setValuePrice] = useState<number>(price)
	const [ValueUnit, setValueUnit] = useState<string>(unit ? unit : '')

	const UpdateAllList = () => {
		const itemsIndex = AllListDopWindows.findIndex(value => value.id === id)
		const NewItem = {
			...AllListDopWindows[itemsIndex],
			text: ValueText,
			price: ValuePrice,
			unit: ValueUnit,
		}
		const newCard = AllListDopWindows.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setAllListDopWindows(newCard)
	}

	const UpdateString = () => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/UpdateDopWindows`, {
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
		const AllArray = AllListDopWindows.filter(item => item.id !== id)
		setAllListDopWindows(AllArray)
	}

	const DeleteItem = (id: number) => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/DeleteDopWindows`, { id: id })
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					DeleteLineBasic()
					DeleteStringAllLink(id)
				}
			})
	}

	return (
		<div className='WindowsDopList'>
			<div className='WindowsDopList_item'>
				<div className='WindowsDopList_item--text'>
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
				<div className='WindowsDopList_item_unit'>
					{!Edit ? (
						unit ? (
							<>
								<p className='WindowsDopList_item_unit--title'>
									Единица измерения:
								</p>
								<p>{unit}</p>
							</>
						) : null
					) : (
						<>
							<p className='WindowsDopList_item_unit--title'>
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
				<div className='WindowsDopList_item_Price'>
					{!Edit ? (
						<>
							<p className='WindowsDopList_item_Price--title'>Цена:</p>
							<p>{PriceFormat(price)}</p>
						</>
					) : (
						<>
							<p className='WindowsDopList_item_Price--title'>Цена: </p>
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
			<div className='WindowsDopList_BTN'>
				{Edit ? (
					<>
						<button
							className='WindowsDopList_BTN--Edit'
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
							className='WindowsDopList_BTN--Delete'
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
						className='WindowsDopList_BTN--Edit'
						onClick={() => setEdit(true)}
					>
						{IconList.Edit_ON}
					</button>
				)}
			</div>
		</div>
	)
}

export default WindowsDopList
