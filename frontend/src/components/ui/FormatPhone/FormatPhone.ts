export const FormatPhone = (Phone: string) => {
	const formP = Phone.replaceAll(/[\s()-]/g, '')
	return formP
}
