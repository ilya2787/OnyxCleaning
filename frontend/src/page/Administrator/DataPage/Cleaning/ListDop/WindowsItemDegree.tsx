import axios from 'axios'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TDegree } from '../../../../../components/type/Services.type'
import { IconList } from '../../../../../components/ui/IconList'
import { UpdateLineBasic } from '../../../../../components/ui/natificationMesseg/natificationMessag'
import { PriceFormat } from '../../../../../components/ui/PriceFormat/PriceFormat'
interface Props {
	id: number
	name: string
	price: number
	ListDegree: TDegree[]
	setListDegree: Dispatch<SetStateAction<TDegree[]>>
}
const WindowsItemDegree: FC<Props> = ({
	id,
	name,
	price,
	ListDegree,
	setListDegree,
}) => {
	const [Edit, setEdit] = useState<boolean>(false)
	const [Text, setText] = useState<string>('')
	const [ValuePrice, setValuePrice] = useState<number>(price)

	const UpdatePrice = () => {
		if (ValuePrice !== price) {
			const value = { price: ValuePrice, id: id }
			axios
				.post(`${process.env.REACT_APP_SERVER}/DegreeCleaningUpdate`, value)
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
		const itemsIndex = ListDegree.findIndex(value => value.id === id)
		const NewItem = {
			...ListDegree[itemsIndex],
			price: ValuePrice,
		}
		const newCard = ListDegree.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setListDegree(newCard)
	}

	useEffect(() => {
		name === 'Low_price' && setText('Низкая')
		name === 'Average_price' && setText('Средняя')
		name === 'Hard_price' && setText('Высокая')
	}, [name])

	return (
		<div className='WindowsDegree--content'>
			<h2>{Text}: </h2>
			{!Edit ? (
				<p>{PriceFormat(ValuePrice)}</p>
			) : (
				<section>
					<input
						type='number'
						name=''
						defaultValue={ValuePrice}
						onChange={e => setValuePrice(Number(e.target.value))}
						id=''
					/>
					<p>RUB</p>
				</section>
			)}
			{!Edit ? (
				<button onClick={() => setEdit(true)}>{IconList.Edit_ON}</button>
			) : (
				<button
					onClick={() => {
						UpdatePrice()
						setEdit(false)
					}}
				>
					{IconList.Edit_YES}
				</button>
			)}
		</div>
	)
}

export default WindowsItemDegree
