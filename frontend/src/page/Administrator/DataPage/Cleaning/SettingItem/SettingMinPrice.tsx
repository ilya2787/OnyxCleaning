import axios from 'axios'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { TPriceBD } from '../../../../../components/type/Services.type'
import { IconList } from '../../../../../components/ui/IconList'
import { UpdateLineBasic } from '../../../../../components/ui/natificationMesseg/natificationMessag'
import { PriceFormat } from '../../../../../components/ui/PriceFormat/PriceFormat'
interface Props {
	Title: string
	minPrice?: number
	TitleItem?: string
	price?: number
	id: number
	AllPriceSetting: TPriceBD[]
	setAllPriceSetting: Dispatch<SetStateAction<TPriceBD[]>>
}
const MinimalPrice: FC<Props> = ({
	Title,
	minPrice,
	TitleItem,
	price,
	id,
	AllPriceSetting,
	setAllPriceSetting,
}) => {
	const [Edit, setEdit] = useState<boolean>(false)
	const [ValueMinPrice, setValueMinPrice] = useState<number>(Number(minPrice))
	const [ValuePrice, setValuePrice] = useState<number>(Number(price))

	const UpdateData = () => {
		const value = {
			MinPrice: ValueMinPrice,
			price: ValuePrice,
			id: id,
		}
		if (minPrice !== ValueMinPrice || price !== ValuePrice) {
			axios
				.post(`${process.env.REACT_APP_SERVER}/PriceCleaningUpdate`, value)
				.then((res: any) => {
					if (res.data.Status === 'Success') {
						UpdateLineBasic()
						UpdateAllList()
					}
				})
				.catch(err => console.log(err))
		}
	}

	const UpdateAllList = () => {
		const itemsIndex = AllPriceSetting.findIndex(value => value.id === id)
		const NewItem = {
			...AllPriceSetting[itemsIndex],
			MinPrice: ValueMinPrice,
			price: ValuePrice,
		}
		const newCard = AllPriceSetting.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setAllPriceSetting(newCard)
	}

	return (
		<div className='MinimalPrice--item'>
			<div className='MinimalPrice--item--content'>
				<h3>{Title}</h3>
				{minPrice && (
					<div className='MinimalPrice--item--content--MinPrice'>
						<p>Минимальная цена: </p>
						{!Edit ? (
							<span>{PriceFormat(ValueMinPrice)}</span>
						) : (
							<>
								<input
									type='number'
									name=''
									onChange={e => setValueMinPrice(Number(e.target.value))}
									defaultValue={ValueMinPrice}
									id=''
								/>
								<span>RUB</span>
							</>
						)}
					</div>
				)}
				{price && (
					<div className='MinimalPrice--item--content--price'>
						<p>{`${TitleItem}: `}</p>
						{!Edit ? (
							<span>{PriceFormat(ValuePrice)}</span>
						) : (
							<>
								<input
									type='number'
									name=''
									onChange={e => setValuePrice(Number(e.target.value))}
									defaultValue={ValuePrice}
									id=''
								/>
								<span>RUB</span>
							</>
						)}
					</div>
				)}
			</div>
			<div className='MinimalPrice--item--BTN'>
				{!Edit ? (
					<button onClick={() => setEdit(true)}>{IconList.Edit_ON}</button>
				) : (
					<button
						onClick={() => {
							UpdateData()
							setEdit(false)
						}}
					>
						{IconList.Edit_YES}
					</button>
				)}
			</div>
		</div>
	)
}
export default MinimalPrice
