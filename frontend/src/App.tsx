import { ReactNotifications } from 'react-notifications-component'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import './styles/config/notification/notification.scss'

const App = () => {
	return (
		<div className='MainBlock'>
			<ReactNotifications />
			<HeaderMenu />
			<Outlet />
			<Footer />
		</div>
	)
}

export default App
