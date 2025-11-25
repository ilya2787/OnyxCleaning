import { InputMask } from '@react-input/mask'

const FeedBack = () => {
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
				<form action='#' className='feedback-home-content--forms'>
					<div className='feedback-home-content--forms--name'>
						<input
							type='text'
							name='Name'
							id='FeedbackName'
							placeholder=''
							required
						/>
						<label htmlFor='FeedbackName'>Как к вам обращаться?</label>
					</div>
					<div className='feedback-home-content--forms--tel'>
						<InputMask
							mask='+7 (___) ___-__-__'
							replacement={{ _: /\d/ }}
							type='text'
							name='tel'
							id='FeedbackTel'
							placeholder=''
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
