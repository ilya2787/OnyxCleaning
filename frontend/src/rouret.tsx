import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ROUTES } from './model/routes'
import ApartmentCleaning from './page/ApartmentCleaning/ApartmentCleaning'
import Home from './page/home/home'
import ServicesPage from './page/services/ServicesPage'

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
				path: ROUTES.SERVICE,
				element: <ServicesPage />,
			},
		],
	},
])
