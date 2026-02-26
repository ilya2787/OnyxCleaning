import axios from 'axios'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { TContact } from '../../../../components/type/Services.type'
import { IconList } from '../../../../components/ui/IconList'
import { UpdateLineBasic } from '../../../../components/ui/natificationMesseg/natificationMessag'
interface Props {
	id: number
	Name: string
	Link: string
	ContactBD: TContact[]
	setContactBD: Dispatch<SetStateAction<TContact[]>>
}
const SocialItem: FC<Props> = ({ id, Name, Link, ContactBD, setContactBD }) => {
	const [Edit, setEdit] = useState<boolean>(false)
	const [ValueLink, setValueLink] = useState<string>(Link)

	const UpdateLink = () => {
		const value = { Value: ValueLink, id: id }
		axios
			.post(`${process.env.REACT_APP_SERVER}/ContactUpdate`, value)
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					UpdateLineBasic()
					UpdateLocalContact()
				}
			})
	}

	const UpdateLocalContact = () => {
		const itemsIndex = ContactBD.findIndex(value => value.id === id)
		const NewItem = {
			...ContactBD[itemsIndex],
			Value: ValueLink,
		}
		const newCard = ContactBD.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setContactBD(newCard)
	}

	return (
		<div className='SocialItem'>
			<h2>{Name}: </h2>
			{!Edit ? (
				<p>{ValueLink}</p>
			) : (
				<input
					type='text'
					name=''
					defaultValue={ValueLink}
					onChange={e => setValueLink(e.target.value)}
					id=''
				/>
			)}
			{!Edit ? (
				<button onClick={() => setEdit(true)}>{IconList.Edit_ON}</button>
			) : (
				<button
					onClick={() => {
						if (ValueLink !== Link) {
							UpdateLink()
						}
						setEdit(false)
					}}
				>
					{IconList.Edit_YES}
				</button>
			)}
		</div>
	)
}

export default SocialItem
