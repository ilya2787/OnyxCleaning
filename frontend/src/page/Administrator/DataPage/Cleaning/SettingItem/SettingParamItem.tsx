import axios from 'axios'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TParametersBD } from '../../../../../components/type/Services.type'
import { IconList } from '../../../../../components/ui/IconList'
import { UpdateLineBasic } from '../../../../../components/ui/natificationMesseg/natificationMessag'
interface Props {
	id: number
	Title: string
	value: number
	Parameters: TParametersBD[]
	setParameters: Dispatch<SetStateAction<TParametersBD[]>>
}
const SettingParamItem: FC<Props> = ({
	id,
	Title,
	value,
	Parameters,
	setParameters,
}) => {
	const [NewTitle, setNewTitle] = useState<string>('')
	const [ValueParams, setValueParams] = useState<number>(value)
	const [Edit, setEdit] = useState<boolean>(false)

	useEffect(() => {
		Title === 'InitialQuadrature' &&
			setNewTitle('Квадратура включенная в цену: ')
		Title === 'DistancePrice' && setNewTitle('Цена за километр : ')
	}, [Title])

	const UpdateValue = () => {
		const valueNew = { Value: ValueParams, id: id }
		if (ValueParams !== value) {
			axios
				.post(`${process.env.REACT_APP_SERVER}/ParametersUpdate`, valueNew)
				.then((res: any) => {
					if (res.data.Status === 'Success') {
						UpdateLineBasic()
						UpdateAllList()
					}
				})
		}
	}

	const UpdateAllList = () => {
		const itemsIndex = Parameters.findIndex(value => value.id === id)
		const NewItem = {
			...Parameters[itemsIndex],
			Value: ValueParams,
		}
		const newCard = Parameters.slice()
		newCard.splice(itemsIndex, 1, NewItem)
		setParameters(newCard)
	}

	return (
		<div className='ItemParams'>
			<h2>{NewTitle}</h2>
			{!Edit ? (
				<section>
					<p>{ValueParams}</p>
					{Title === 'DistancePrice' ? <p>RUB</p> : <p>м2</p>}
				</section>
			) : (
				<section>
					<input
						type='number'
						name=''
						defaultValue={ValueParams}
						onChange={e => setValueParams(Number(e.target.value))}
						id=''
					/>
					{Title === 'DistancePrice' ? <p>RUB</p> : <p>м2</p>}
				</section>
			)}
			{!Edit ? (
				<button onClick={() => setEdit(true)}>{IconList.Edit_ON}</button>
			) : (
				<button
					onClick={() => {
						UpdateValue()
						setEdit(false)
					}}
				>
					{IconList.Edit_YES}
				</button>
			)}
		</div>
	)
}

export default SettingParamItem
