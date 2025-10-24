import { FC } from 'react'
import { Link } from 'react-router'
import { IconList } from '../IconList'
import './ServicesBtn.scss'

interface TypeProps {
	params: string
}

const ServicesBtn: FC<TypeProps> = ({ params }) => {
	return (
		<div className='Btn'>
			<Link to={`/Calculator/${params}/Order`} className='Btn--order'>
				Заказать
			</Link>
			<div className='Btn--item'>
				<Link
					to={`/Calculator/${params}/Calculation`}
					className='Btn--item--calc'
				>
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
