import { InputMask } from '@react-input/mask'
import { useState } from 'react'
import { sendMessage } from '../../components/api/Telegram'
import { TvalueMassage } from '../../components/type/Services.type'
import { MessageDelivered } from '../../components/ui/natificationMesseg/natificationMessag'

const FeedBack = () => {
	const [ValueMassage, setValueMassage] = useState<TvalueMassage>({
		Name: '',
		Tel: '',
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
				<b><i>&#10071;Пользователь с сайта просит связаться с ним&#10071;</i></b>\n\n&#129464; ${ValueMassage.Name} \n&#128241 ${ValueMassage.Tel}
			`
			await sendMessage(message)
			MessageDelivered()
			ClearForm()
		} catch {
		} finally {
		}
	}

	const ClearForm = () => {
		setValueMassage({
			Name: '',
			Tel: '',
		})
	}

	return (
		<div className='feedback-home'>
			<h1>не нашли подходящее вам </h1>
			<h3>Напишите нам и мы с радостью вам поможем</h3>
			<div className='feedback-home-content'>
				<img
					src='./img/girl.png'
					alt=''
					className='feedback-home-content--img'
				/>
				<form onSubmit={handelSubmit} className='feedback-home-content--forms'>
					<div className='feedback-home-content--forms--name'>
						<input
							type='text'
							name='Name'
							id='FeedbackName'
							placeholder=''
							onChange={event => InputDataForm(event)}
							value={ValueMassage.Name}
							required
						/>
						<label htmlFor='FeedbackName'>Как к вам обращаться?</label>
					</div>
					<div className='feedback-home-content--forms--tel'>
						<InputMask
							mask='+7 (___) ___-__-__'
							replacement={{ _: /\d/ }}
							type='text'
							name='Tel'
							id='FeedbackTel'
							placeholder=''
							onChange={event => InputDataForm(event)}
							value={ValueMassage.Tel}
							required
						/>
						<label htmlFor='FeedbackTel'>Ваш номер телефона</label>
					</div>
					<button type='submit'>Отправить</button>
					<p>
						Нажимая на кнопку “Отправить” вы соглашаетесь с политикой обработки
						<span> персональных данных</span>
					</p>
				</form>
			</div>
		</div>
	)
}

export default FeedBack
