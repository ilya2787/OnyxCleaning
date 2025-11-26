const TOKEN = '8588149569:AAGle-TOuQfw3kgjagw03NSSNDw2OLHvKko'
const baseUrl = `https://api.telegram.org/bot${TOKEN}`
export const sendMessage = async (message: string): Promise<void> => {
	const url = `${baseUrl}/sendMessage`

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
