import { Dispatch, FC, SetStateAction } from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import './StyleSelect.scss'
import { IOption } from './TypeSelect'

interface TypeProps {
	Placeholder: string
	options: IOption[]
	CurrentServicesSingle?: string
	setCurrentServicesSingle?: Dispatch<SetStateAction<string>>
	CurrentServicesMulti?: string[]
	setCurrentServicesMulti?: Dispatch<SetStateAction<string[]>>
	isMulti: boolean
	CalculatorPriceAndQuantity: () => void
	isSearch: boolean
}

const SelectItems: FC<TypeProps> = ({
	Placeholder,
	options,
	CurrentServicesSingle,
	setCurrentServicesSingle,
	CurrentServicesMulti,
	setCurrentServicesMulti,
	isMulti,
	CalculatorPriceAndQuantity,
	isSearch,
}) => {
	const getSingle = () => {
		CalculatorPriceAndQuantity()
		return CurrentServicesSingle
			? options.find(c => c.value === CurrentServicesSingle)
			: ''
	}
	const getMulti = () => {
		return CurrentServicesMulti
			? options.filter(c => CurrentServicesMulti.indexOf(c.value) >= 0)
			: []
	}

	const onChangeServiceSingle = (newValue: SingleValue<string | IOption>) => {
		setCurrentServicesSingle &&
			setCurrentServicesSingle((newValue as IOption).value)
		CalculatorPriceAndQuantity()
	}

	const onChangeServiceMulti = (
		newValue: SingleValue<IOption> | MultiValue<string | IOption>
	) => {
		setCurrentServicesMulti &&
			setCurrentServicesMulti((newValue as IOption[]).map(c => c.value))
		CalculatorPriceAndQuantity()
	}

	return (
		<div>
			{isMulti ? (
				<Select
					onChange={onChangeServiceMulti}
					value={getMulti()}
					options={options}
					isSearchable={isSearch}
					placeholder={Placeholder}
					isMulti={true}
				/>
			) : (
				<Select
					classNamePrefix='custom-select'
					onChange={onChangeServiceSingle}
					value={getSingle()}
					options={options}
					isSearchable={isSearch}
					placeholder={Placeholder}
					isMulti={false}
					noOptionsMessage={() => 'Город не найден'}
				/>
			)}
		</div>
	)
}

export default SelectItems
