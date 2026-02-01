import 'react-router-dom'

export const ROUTES = {
	HOME: '/',
	ApartmentCleaning: '/ApartmentCleaning',
	OfficesCleaning: '/OfficesCleaning',
	WindowsCleaning: '/WindowsCleaning',
	Calculator: '/Calculator/:NameCleaning/:Title',
	PersonalDataPolicy: '/privacy',
	About: '/About',
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
