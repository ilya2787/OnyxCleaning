// const Token = process.env.REACT_APP_API_TOKEN
const Token = ''
const baseUrl = `https://api.telegram.org/bot${Token}`
export const sendMessage = async (message: string): Promise<void> => {
	const url = `${baseUrl}/sendMessage`
	console.log(url)
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text: message,
			parse_mode: 'html',
			chat_id: -5059074729,
		}),
	}).then(response => response.json())

	console.log('response: ', response)
}
