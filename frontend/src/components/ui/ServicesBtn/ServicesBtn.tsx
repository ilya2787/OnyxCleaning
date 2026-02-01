import { FC, useState } from 'react'
import { Link } from 'react-router'
import { IconList } from '../IconList'
import ModalFeedback from '../Modalfeedback/ModalFeedback'
import './ServicesBtn.scss'

interface TypeProps {
	params: string
}

const ServicesBtn: FC<TypeProps> = ({ params }) => {
	const [OpenModal, setOpenModal] = useState<boolean>(false)

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
				<button
					className='Btn--item--question'
					onClick={() => {
						setOpenModal(true)
					}}
				>
					<span>{IconList.Messages}</span> Задать вопрос
				</button>
			</div>

			<ModalFeedback OpenModal={OpenModal} setOpenModal={setOpenModal} />
		</div>
	)
}
export default ServicesBtn
