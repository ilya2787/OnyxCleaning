import { InputMask } from '@react-input/mask'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { ROUTES } from '../../../model/routes'
import { sendMessage } from '../../api/Telegram'
import { TvalueMassage } from '../../type/Services.type'
import ModalWindows from '../ModalWindows/ModalWindows'
import { MessageQuestion } from '../natificationMesseg/natificationMessag'

interface Props {
	setOpenModal: Dispatch<SetStateAction<boolean>>
	OpenModal: boolean
}

const ModalFeedback: FC<Props> = ({ OpenModal, setOpenModal }) => {
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
		event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
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
			setOpenModal(false)
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
	const LinkPD = () => {
		window.open(process.env.REACT_APP_URL + ROUTES.PersonalDataPolicy)
	}

	return (
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
					<button onClick={() => LinkPD()}> персональных данных </button>
				</p>
				<div className='Btn_modalForm--Submit'>
					<button type='submit'>Отправить</button>
				</div>
			</form>
		</ModalWindows>
	)
}

export default ModalFeedback
