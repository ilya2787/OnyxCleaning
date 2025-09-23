import { Link } from 'react-router-dom'
import { IconList } from '../IconList'
import './BackBTN.scss'

const BackBTN = () => {
	return (
		<Link to={'/'} className='LinkBack'>
			{' '}
			<span>{IconList.ArrowBack}</span>Вернуть назад
		</Link>
	)
}

export default BackBTN
