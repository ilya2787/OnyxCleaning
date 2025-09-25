import { Link } from 'react-router'
import { ROUTES } from '../../../model/routes'
import { IconList } from '../IconList'
import './ServicesBtn.scss'

const ServicesBtn = () => {
	return (
		<div className='Btn'>
			<button className='Btn--order'>Заказать</button>
			<div className='Btn--item'>
				<Link to={ROUTES.Calculator} className='Btn--item--calc'>
					<span>{IconList.Calculator}</span> Рассчитать
				</Link>
				<button className='Btn--item--question'>
					<span>{IconList.Messages}</span> Задать вопрос
				</button>
			</div>
		</div>
	)
}
export default ServicesBtn
