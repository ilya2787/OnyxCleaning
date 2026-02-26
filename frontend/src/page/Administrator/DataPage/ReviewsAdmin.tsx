import { Link } from 'react-router'
import { ROUTES } from '../../../model/routes'

const ReviewsAdmin = () => {
	return (
		<div className='ReviewsAdmin'>
			<div className='ReviewsAdmin_header'>
				<Link to={ROUTES.AdminHome} className='Office_header_BackLink'>
					Назад
				</Link>
				<div className='ReviewsAdmin_header--title'>
					<h1>Отзывы клиентов</h1>
				</div>
			</div>
		</div>
	)
}

export default ReviewsAdmin
