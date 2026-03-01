import axios from 'axios'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { TCitiesDistancePrice } from '../../../../../components/type/Services.type'
import { IconList } from '../../../../../components/ui/IconList'
import { AddStringBasicSuccess } from '../../../../../components/ui/natificationMesseg/natificationMessag'
interface Props {
	Name: string
	Distance: number
	id: number | undefined
	AllListCities: TCitiesDistancePrice[]
	setAllListCities: Dispatch<SetStateAction<TCitiesDistancePrice[]>>
}
const CitiesItem: FC<Props> = ({
	Name,
	Distance,
	id,
	AllListCities,
	setAllListCities,
}) => {
	const [Edit, setEdit] = useState<boolean>(false)
	const [ValueDistance, setValueDistance] = useState<number>(Distance)

	const UpdateDistance = () => {
		const value = { Distance: ValueDistance, id: id }
		axios
			.post(`${process.env.REACT_APP_SERVER}/CitiesUpdate`, value)
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					AddStringBasicSuccess()
					UpdateAllList()
				}
			})
			.catch(err => console.log(err))
	}

	const UpdateAllList = () => {
		const itemsIndex = AllListCities.findIndex(value => value.id === id)
		const NewItem = {
			...AllListCities[itemsIndex],
			Distance: ValueDistance,
		}
		const newCard = AllListCities.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setAllListCities(newCard)
	}

	return (
		<div className='Setting_content--CitiesAll--CitiesItem'>
			<div className='Setting_content--CitiesAll--CitiesItem--Name'>
				<p>{Name}</p>
			</div>
			<div className='Setting_content--CitiesAll--CitiesItem--Distance'>
				{!Edit ? (
					<p>{ValueDistance}</p>
				) : (
					<input
						type='number'
						name=''
						defaultValue={ValueDistance}
						onChange={e => setValueDistance(Number(e.target.value))}
						id=''
					/>
				)}
				<p>Км</p>
			</div>
			<div className='Setting_content--CitiesAll--CitiesItem--BTN'>
				{!Edit ? (
					<button onClick={() => setEdit(true)}>{IconList.Edit_ON}</button>
				) : (
					<button
						onClick={() => {
							if (ValueDistance !== Distance) {
								UpdateDistance()
							}
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
export default CitiesItem
