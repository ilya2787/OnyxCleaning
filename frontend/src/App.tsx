import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'

const App = () => {
	return (
		<div className='MainBlock'>
			<HeaderMenu />
			<Outlet />
			<Footer />
		</div>
	)
}

export default App
