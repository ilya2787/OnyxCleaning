import { FC, ReactElement } from 'react'
import { Link } from 'react-router'

interface Props {
	icon: ReactElement
	LinkRouts: string
	title: string
}

const ItemBlockHome: FC<Props> = ({ icon, LinkRouts, title }) => {
	return (
		<Link to={LinkRouts} className='AdminHome_item'>
			<span>{icon}</span>
			<p>{title}</p>
		</Link>
	)
}
export default ItemBlockHome
