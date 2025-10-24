import { ROUTES } from '../../model/routes'

export const ItemsMenu = [
	{
		id: 1,
		name: 'Уборка квартир и домов',
		link: ROUTES.ApartmentCleaning,
	},
	{
		id: 2,
		name: 'Уборка офисов',
		link: ROUTES.OfficesCleaning,
	},
	{
		id: 3,
		name: 'Мойка окон',
		link: ROUTES.WindowsCleaning,
	},
	{
		id: 4,
		name: 'Химчистка',
		link: '',
	},
	{
		id: 5,
		name: 'Рассчитать стоимость',
		link: '/Calculator/CleaningApartment/Calculation',
	},
	{
		id: 6,
		name: 'О компании',
		link: '',
	},
]
