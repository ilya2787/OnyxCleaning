import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ROUTES } from './model/routes'
import ApartmentCleaning from './page/ApartmentCleaning/ApartmentCleaning'
import Calculator from './page/Calculator/Calculator'
import Home from './page/home/home'
import OfficesCleaning from './page/OfficesCleanning/officesCleaning'
import WindowsCleaning from './page/WindowsCleaning/WindowsCleaning'

export const router = createBrowserRouter([
	{
		Component: App,
		children: [
			{
				path: ROUTES.HOME,
				element: <Home />,
			},
			{
				path: ROUTES.ApartmentCleaning,
				element: <ApartmentCleaning />,
			},
			{
				path: ROUTES.OfficesCleaning,
				element: <OfficesCleaning />,
			},
			{
				path: ROUTES.WindowsCleaning,
				element: <WindowsCleaning />,
			},
			{
				path: ROUTES.Calculator,
				element: <Calculator />,
			},
		],
	},
])
