import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import TitlePage from './components/Title/TitlePage'
import { IconList } from './components/ui/IconList'
import ScrollTop from './components/ui/ScrollTop/ScrollTop'
import './styles/config/notification/notification.scss'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { Circles } from 'react-loader-spinner'

const HeaderMenu = lazy(() => import('./components/HeaderMenu/HeaderMenu'))
const Footer = lazy(() => import('./components/Footer/Footer'))

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
		<Suspense
			fallback={
				<Circles
					height='90'
					width='90'
					color='#dcb87a'
					ariaLabel='circles-loading'
					wrapperClass='App_loading'
					visible={true}
				/>
			}
		>
			<div className='MainBlock'>
				<ScrollTop />
				<TitlePage Title='OnyxCleaning' />
				<MantineProvider>
					<Notifications />
				</MantineProvider>
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
				<HeaderMenu />

				<Outlet />
				<Footer />
			</div>
		</Suspense>
	)
}

export default App
