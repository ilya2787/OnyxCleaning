import { Dispatch, FC, SetStateAction, useEffect } from 'react'

interface TypeProps {
	CurrentServicesSingle: string
	TitleWindows: string
	Num: number
	setNum: Dispatch<SetStateAction<number>>
}

const NumberPlusMinus: FC<TypeProps> = ({
	CurrentServicesSingle,
	Num,
	setNum,
	TitleWindows,
}) => {
	//Функция сложения вычитания для квадратуры и количеству створок
	const PlusNumber = () => {
		setNum(Num + 1)
	}
	const MinusNumber = () => {
		setNum(Num - 1)
	}
	//Выставления в количестве не ниже 1
	useEffect(() => {
		Num == 0 && setNum(1)
	}, [Num])

	return (
		<div className='Calculator--content--BlockPosition--quadrature--content'>
			<button
				className='Calculator--content--BlockPosition--quadrature--content--BTNMinus'
				onClick={() => MinusNumber()}
			>
				-
			</button>
			<div className='Calculator--content--BlockPosition--quadrature--content--number'>
				<input
					onChange={event => {
						setNum(Number(event.target.value))
					}}
					value={Num}
					type='number'
				/>

				{CurrentServicesSingle != 'CleaningWindows' ? (
					<p>
						m<sup>2</sup>
					</p>
				) : (
					<p>{TitleWindows}</p>
				)}
			</div>
			<button
				className='Calculator--content--BlockPosition--quadrature--content--BTNPlus'
				onClick={() => PlusNumber()}
			>
				+
			</button>
		</div>
	)
}

export default NumberPlusMinus
