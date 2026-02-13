import { notifications } from '@mantine/notifications'

export const warning = () => {
	notifications.show({
		title: 'Уважаемый клиент',
		message: `Приносим свои извинения! 
		\n услуги по химчистки пока не доступны`,
		position: 'top-right',
		autoClose: 5000,
		color: 'orange',
	})
}

export const ErrorOrderNewt = (Pole: string) => {
	notifications.show({
		title: 'Заполните обязательные поля',
		message: `Заполните поле:
		\n ${Pole}`,
		position: 'top-right',
		autoClose: 5000,
		color: 'red',
	})
}

export const ErrorOrderFeedback = () => {
	notifications.show({
		title: 'Ошибка отправки сообщения',
		message: `что-то пошло не так, попробуйте повторить отправку чуть позже`,
		position: 'top-right',
		autoClose: 5000,
		color: 'red',
	})
}

export const MessageDelivered = () => {
	notifications.show({
		title: 'Заказ обратной связи',
		message: 'Сообщение успешно отправлено, в ближайшее время с вами свяжутся',
		color: 'green',
		position: 'top-right',
		autoClose: 5000,
	})
}

export const MessageQuestion = () => {
	notifications.show({
		title: 'Вопрос от пользователя сайта',
		message: 'Спасибо за вопрос, в ближайшее время с вами свяжутся',
		color: 'green',
		position: 'top-right',
		autoClose: 5000,
	})
}

export const MessageOldUsers = (Name: string) => {
	notifications.show({
		title: 'ВАШ ЗАКАЗ',
		message: `${Name} Спасибо что выбираете нас! Ваш заказ успешно оформлен, в ближайшее время с вами свяжутся`,
		color: 'green',
		position: 'top-right',
		autoClose: 5000,
	})
}
