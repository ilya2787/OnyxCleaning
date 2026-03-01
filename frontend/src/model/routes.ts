import 'react-router-dom'

export const ROUTES = {
	HOME: '/',
	ApartmentCleaning: '/ApartmentCleaning',
	OfficesCleaning: '/OfficesCleaning',
	WindowsCleaning: '/WindowsCleaning',
	Calculator: '/Calculator/:NameCleaning/:Title',
	PersonalDataPolicy: '/privacy',
	About: '/About',
	AuthorizationAdmin: '/AdminPanel',
	AdminPanel: '/AdminPanel/',
	AdminHome: '/AdminPanel/Home',
	UserData: '/AdminPanel/Home/UserData',
	CleaningData: '/AdminPanel/Home/CleaningData',
	ApartmentData: '/AdminPanel/Home/CleaningData/Apartment',
	OfficeData: '/AdminPanel/Home/CleaningData/Office',
	WindowsData: '/AdminPanel/Home/CleaningData/Windows',
	SettingAllData: '/AdminPanel/Home/CleaningData/SettingAll',
	ContactData: '/AdminPanel/Home/ContactData',
	ReviewsData: '/AdminPanel/Home/Reviews',
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
