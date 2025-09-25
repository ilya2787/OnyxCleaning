import { Dispatch, FC, SetStateAction } from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import { IOption } from './TypeSelect'

interface TypeProps {
	Placeholder: string
	options: IOption[]
	CurrentServicesSingle?: string
	setCurrentServicesSingle?: Dispatch<SetStateAction<string>>
	CurrentServicesMulti?: string[]
	setCurrentServicesMulti?: Dispatch<SetStateAction<string[]>>
	isMulti: boolean
}

const SelectItems: FC<TypeProps> = ({
	Placeholder,
	options,
	CurrentServicesSingle,
	setCurrentServicesSingle,
	CurrentServicesMulti,
	setCurrentServicesMulti,
	isMulti,
}) => {
	const getSingle = () => {
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
	}

	const onChangeServiceMulti = (
		newValue: SingleValue<IOption> | MultiValue<string | IOption>
	) => {
		setCurrentServicesMulti &&
			setCurrentServicesMulti((newValue as IOption[]).map(c => c.value))
	}

	return (
		<div>
			{isMulti ? (
				<Select
					onChange={onChangeServiceMulti}
					value={getMulti()}
					options={options}
					isSearchable={false}
					placeholder={Placeholder}
					isMulti={true}
				/>
			) : (
				<Select
					onChange={onChangeServiceSingle}
					value={getSingle()}
					options={options}
					isSearchable={false}
					placeholder={Placeholder}
					isMulti={false}
				/>
			)}
		</div>
	)
}

export default SelectItems
