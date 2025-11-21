import { useEffect, useState } from 'react'
import { ReactNotifications } from 'react-notifications-component'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import TitlePage from './components/Title/TitlePage'
import { IconList } from './components/ui/IconList'
import ScrollTop from './components/ui/ScrollTop/ScrollTop'
import './styles/config/notification/notification.scss'

const App = () => {
	const [show, handleShow] = useState(false)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				handleShow(true)
			} else handleShow(false)
		})
		return () => {
			window.removeEventListener('scroll', () => {})
		}
	}, [])

	const backToTop = () => {
		window.scroll({ top: 0, behavior: 'smooth' })
	}
	return (
		<div className='MainBlock'>
			<ScrollTop />
			<TitlePage Title='OnyxCleaning' />
			<ReactNotifications />
			{show && (
				<div className='backToTop text-center'>
					<button
						className='MainBlock--BTNScrollTop'
						onClick={() => backToTop()}
					>
						{IconList.ArrowTop}
					</button>
				</div>
			)}
			<Outlet />
			<Footer />
		</div>
	)
}

export default App
