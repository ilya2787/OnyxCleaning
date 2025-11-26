import { InputMask } from '@react-input/mask'
import { FC, useState } from 'react'
import { Link } from 'react-router'
import { sendMessage } from '../../api/Telegram'
import { TvalueMassage } from '../../type/Services.type'
import { IconList } from '../IconList'
import ModalWindows from '../ModalWindows/ModalWindows'
import { MessageQuestion } from '../natificationMesseg/natificationMessag'
import './ServicesBtn.scss'

interface TypeProps {
	params: string
}

const ServicesBtn: FC<TypeProps> = ({ params }) => {
	const [OpenModal, setOpenModal] = useState<boolean>(false)

	const [ValueMassage, setValueMassage] = useState<TvalueMassage>({
		Name: '',
		Tel: '',
		Message: '',
	})
	const InputDataForm: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = event => {
		setValueMassage({
			...ValueMassage,
			[event?.target.name]: event?.target.value,
		})
	}

	const handelSubmit = async (
		event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
	): Promise<void> => {
		event.preventDefault()
		try {
			let message = `
				<b><i>&#10067;Вопрос присланный пользователем с сайта&#10067;</i></b>\n\n&#129464; ${ValueMassage.Name} \n&#128241 ${ValueMassage.Tel}\n
				${ValueMassage.Message}
			`
			await sendMessage(message)
			MessageQuestion()
			ClearForm()
		} catch {
		} finally {
		}
	}

	const ClearForm = () => {
		setValueMassage({
			Name: '',
			Tel: '',
			Message: '',
		})
	}

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
			<ModalWindows
				Title={`Задайте вопрос`}
				modalIsOpen={OpenModal}
				onClose={() => setOpenModal(false)}
			>
				<form onSubmit={handelSubmit} className='Btn_modalForm'>
					<div className='Btn_modalForm_User'>
						<div className='Btn_modalForm_User--Name'>
							<input
								type='text'
								name='Name'
								id='messageName'
								placeholder=''
								onChange={event => InputDataForm(event)}
								value={ValueMassage.Name}
								required
							/>
							<label htmlFor='messageName'>Как к вам обращаться?</label>
						</div>
						<div className='Btn_modalForm_User--Tel'>
							<InputMask
								mask='+7 (___) ___-__-__'
								replacement={{ _: /\d/ }}
								type='text'
								name='Tel'
								id='massageTel'
								placeholder=''
								onChange={event => InputDataForm(event)}
								value={ValueMassage.Tel}
								required
							/>
							<label htmlFor='massageTel'>Ваш номер телефона</label>
						</div>
					</div>
					<div className='Btn_modalForm--message'>
						<textarea
							name='Message'
							id='messageText'
							placeholder=''
							onChange={event => InputDataForm(event)}
							value={ValueMassage.Message}
							rows={7}
						></textarea>
						<label htmlFor='messageText'>Какой вопрос вас интересует?</label>
					</div>
					<p className='Btn_modalForm--PersonalDate'>
						Нажимая на кнопку “Отправить” вы соглашаетесь с политикой обработки
						<span> персональных данных</span>
					</p>
					<div className='Btn_modalForm--Submit'>
						<button type='submit'>Отправить</button>
					</div>
				</form>
			</ModalWindows>
		</div>
	)
}
export default ServicesBtn
