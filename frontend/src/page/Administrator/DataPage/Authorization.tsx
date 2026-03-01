import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { IconList } from '../../../components/ui/IconList'
import { ErrorAuthorization } from '../../../components/ui/natificationMesseg/natificationMessag'
import { ROUTES } from '../../../model/routes'
import '../AuthorizationStyle.scss'

const Authorization = () => {
	document.title = 'Авторизация'
	const [Eye, setEye] = useState<boolean>(false)
	const EditEye = useRef<HTMLInputElement>(null)
	const [ValueLogin, setValueLogin] = useState<string>('')
	const [ValuePassword, setValuePassword] = useState<string>('')
	const navigate = useNavigate()
	axios.defaults.withCredentials = true
	const SubmitAuthorization = (
		event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
	) => {
		event.preventDefault()
		axios
			.post(`${process.env.REACT_APP_SERVER}/login`, {
				Login: ValueLogin,
				Password: ValuePassword,
			})
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					navigate(ROUTES.AdminHome)
				} else {
					ErrorAuthorization()
				}
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		if (Eye) {
			EditEye.current!.type = 'text'
		} else {
			EditEye.current!.type = 'password'
		}
	}, [Eye])

	return (
		<div className='Authorization'>
			<MantineProvider>
				<Notifications />
			</MantineProvider>
			<div className='Authorization--left'>
				<form
					onSubmit={SubmitAuthorization}
					className='Authorization--left_form'
				>
					<div className='Authorization--left_form--header'>
						<h1>Авторизация в административной панели</h1>
					</div>
					<div className='Authorization--left_form--Login'>
						<input
							type='text'
							name=''
							value={ValueLogin}
							onChange={e => setValueLogin(e.target.value)}
							id='ValueLoginId'
							placeholder=''
							required
						/>
						<label htmlFor='ValueLoginId'>Логин</label>
					</div>
					<div className='Authorization--left_form--Password'>
						<input
							ref={EditEye}
							type='password'
							name=''
							value={ValuePassword}
							onChange={e => setValuePassword(e.target.value)}
							id='ValuePasswordId'
							placeholder=''
							required
						/>
						<label htmlFor='ValuePasswordId'>Пароль</label>
						{!Eye ? (
							<span onClick={() => setEye(true)}>{IconList.Eye_Off}</span>
						) : (
							<span onClick={() => setEye(false)}>{IconList.Eye_On}</span>
						)}
					</div>
					<button className='Authorization--left_form--SubmitBTN' type='submit'>
						Авторизоваться
					</button>
				</form>
			</div>
			<div className='Authorization--right'>
				<div className='Authorization--right--IMG'>
					<img src='/img/Logo2.png' alt='' />
				</div>
			</div>
		</div>
	)
}

export default Authorization
