import { Store } from 'react-notifications-component'

export const warning = () => {
	Store.addNotification({
		title: 'Уважаемый клиент',
		message: 'Приносим свои извинения! \n услуги по химчистки пока не доступны',
		type: 'warning',
		container: 'top-right',
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	})
}
