import { useState } from 'react'
import SelectItems from '../../components/ui/SelectItems/SelectItems'
import { IOption } from '../../components/ui/SelectItems/TypeSelect'
import './StyleCalculator.scss'

const Services: IOption[] = [
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

const Calculator = () => {
	const [CurrentServicesSingle, setCurrentServicesSingle] = useState<string>('')

	return (
		<div className='Calculator'>
			<h1>Рассчитать стоимость уборки</h1>
			<div className='Calculator--content'>
				<div className='Calculator--content--BlockPosition'>
					<div className='Calculator--content--BlockPosition--Services'>
						<h2>Услуга</h2>
						<SelectItems
							options={Services}
							CurrentServicesSingle={CurrentServicesSingle}
							setCurrentServicesSingle={setCurrentServicesSingle}
							Placeholder={'Выберите услугу'}
							isMulti={false}
						/>
					</div>
				</div>
				<div className='Calculator--content--BlockResult'></div>
			</div>
		</div>
	)
}

export default Calculator
