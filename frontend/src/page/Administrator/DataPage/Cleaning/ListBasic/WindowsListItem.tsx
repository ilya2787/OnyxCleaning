import axios from 'axios'
import { FC, useContext, useState } from 'react'
import { IconList } from '../../../../../components/ui/IconList'
import {
	DeleteLineBasic,
	UpdateLineBasic,
} from '../../../../../components/ui/natificationMesseg/natificationMessag'
import { Context } from '../Windows'
interface Props {
	id: number
	Text: string
}
const WindowsListItem: FC<Props> = ({ id, Text }) => {
	const DataContext = useContext(Context)
	const AllBasicListCleaning = DataContext.AllBasicListCleaning
	const setAllBasicListCleaning = DataContext.setAllBasicListCleaning
	const [Edit, setEdit] = useState<boolean>(false)
	const [ValueText, setValueText] = useState<string>(Text)

	const UpdateAllList = () => {
		const itemsIndex = AllBasicListCleaning.findIndex(value => value.id === id)
		const NewItem = {
			...AllBasicListCleaning[itemsIndex],
			Text: ValueText,
		}
		const newCard = AllBasicListCleaning.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setAllBasicListCleaning(newCard)
	}

	const UpdateString = (ValueText: string) => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/UpdateStringBase`, {
				list_cleaning: ValueText,
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
		const AllArray = AllBasicListCleaning.filter(item => item.id !== id)
		setAllBasicListCleaning(AllArray)
	}

	const DeleteItem = (id: number) => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/DeleteStringBase`, { id: id })
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					DeleteLineBasic()
					DeleteStringAllLink(id)
				}
			})
	}
	return (
		<div className='WindowsListItem_itemStrong'>
			{!Edit ? (
				<p>{Text}</p>
			) : (
				<input
					type='text'
					value={ValueText}
					onChange={e => {
						setValueText(e.target.value)
					}}
				/>
			)}
			<div className='WindowsListItem_itemStrong--button'>
				{!Edit && (
					<button
						className='WindowsListItem_itemStrong--button--edit'
						onClick={() => setEdit(true)}
					>
						{IconList.Edit_ON}
					</button>
				)}
				{Edit && (
					<>
						<button
							className='WindowsListItem_itemStrong--button--edit'
							onClick={() => {
								if (Text !== ValueText) {
									UpdateString(ValueText)
								}
								setEdit(false)
							}}
						>
							{IconList.Edit_YES}
						</button>
						<button
							className='WindowsListItem_itemStrong--button--delete'
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
				)}
			</div>
		</div>
	)
}

export default WindowsListItem
