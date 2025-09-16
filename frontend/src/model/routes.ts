import 'react-router-dom'

export const ROUTES = {
	HOME: '/',
	ApartmentCleaning: '/ApartmentCleaning',
	SERVICE: '/services/:nameServices',
} as const

export type PathParams = {
	[ROUTES.SERVICE]: {
		nameServices: string
	}
}

declare module 'react-router-dom' {
	interface Register {
		params: PathParams
	}
}
