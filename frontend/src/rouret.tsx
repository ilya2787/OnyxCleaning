import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ROUTES } from './model/routes'
import Error404 from './page/404/404'
import About from './page/About/About'
import AdminPanel from './page/Administrator/Administrator'
import AdminHome from './page/Administrator/DataPage/AdminHome'
import Apartment from './page/Administrator/DataPage/Cleaning/Apartment'
import DataCleaning from './page/Administrator/DataPage/DataCleaning'
import DataUser from './page/Administrator/DataPage/DataUsers'
import ApartmentCleaning from './page/ApartmentCleaning/ApartmentCleaning'
import Calculator from './page/Calculator/Calculator'
import Home from './page/home/home'
import OfficesCleaning from './page/OfficesCleanning/officesCleaning'
import PersonalDataPolis from './page/PolisData/PersonalDataPolicy'
import WindowsCleaning from './page/WindowsCleaning/WindowsCleaning'

export const router = createBrowserRouter([
	{
		Component: App,
		errorElement: <Error404 />,
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
			{
				path: ROUTES.About,
				element: <About />,
			},
		],
	},
	{
		path: ROUTES.PersonalDataPolicy,
		element: <PersonalDataPolis />,
	},
	{
		Component: AdminPanel,
		errorElement: <Error404 />,
		children: [
			{
				path: ROUTES.AdminHome,
				element: <AdminHome />,
			},
			{
				path: ROUTES.UserData,
				element: <DataUser />,
			},
			{
				path: ROUTES.CleaningData,
				element: <DataCleaning />,
			},
			{
				path: ROUTES.ApartmentData,
				element: <Apartment />,
			},
		],
	},
])
