import 'react-router-dom'

export const ROUTES = {
	HOME: '/',
	ApartmentCleaning: '/ApartmentCleaning',
	OfficesCleaning: '/OfficesCleaning',
	WindowsCleaning: '/WindowsCleaning',
	Calculator: '/Calculator/:NameCleaning/:Title',
	PersonalDataPolicy: '/privacy',
	About: '/About',
	AdminPanel: '/AdminPanel',
	AdminHome: '/AdminPanel/',
	UserData: '/AdminPanel/UserData',
	CleaningData: '/AdminPanel/CleaningData',
	ApartmentData: '/AdminPanel/CleaningData/Apartment',
} as const

export type PathParams = {
	[ROUTES.Calculator]: {
		NameCleaning: string
		Title: string
	}
}

declare module 'react-router-dom' {
	interface Register {
		params: PathParams
	}
}
