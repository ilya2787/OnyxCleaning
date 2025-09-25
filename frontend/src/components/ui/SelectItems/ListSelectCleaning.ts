import { IOption } from './TypeSelect'

export const Services: IOption[] = [
	{
		value: 'CleaningApartment',
		label: 'Уборка квартир и домов',
	},
	{
		value: 'CleaningOffice',
		label: 'Уборка офисов',
	},
	{
		value: 'CleaningWindows',
		label: 'Мойка окон',
	},
]

export const CatCleaning: IOption[] = [
	{
		value: 'Basic',
		label: 'Базовая уборка',
	},
	{
		value: 'General',
		label: 'Генеральная уборка',
	},
	{
		value: 'Repair',
		label: 'После ремонта',
	},
]
