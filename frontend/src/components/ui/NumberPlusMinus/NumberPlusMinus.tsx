import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TypeDopPrice } from '../../../page/Calculator/TypePrice'

interface TypeProps {
	CurrentServicesSingle: string
	Num: number
	setNum: Dispatch<SetStateAction<number>>
	id?: number
	DopCurrentPrice?: TypeDopPrice[]
	setDopCurrentPrice?: Dispatch<SetStateAction<TypeDopPrice[]>>
	priceItem?: number
}

const NumberPlusMinus: FC<TypeProps> = ({
	CurrentServicesSingle,
	Num,
	setNum,
	id,
	DopCurrentPrice,
	setDopCurrentPrice,
	priceItem,
}) => {
	//Функция сложения вычитания для квадратуры и количеству створок
	const [TitleWindows, setTitleWindows] = useState<string>('')
	const PlusNumber = () => {
		setNum(Num + 1)
		ListNumberPlus()
	}
	const MinusNumber = () => {
		setNum(Num - 1)
		ListNumberMinus()
	}

	const ListNumberPlus = () => {
		if (DopCurrentPrice && setDopCurrentPrice && priceItem) {
			const itemsIndex = DopCurrentPrice.findIndex(value => value.id === id)
			const NewItem = {
				...DopCurrentPrice[itemsIndex],
				quantity: DopCurrentPrice[itemsIndex].quantity + 1,
			}
			const newCard = DopCurrentPrice.slice()
			newCard.splice(itemsIndex, 1, NewItem)
			setDopCurrentPrice(newCard)
		}
	}

	const ListNumberMinus = () => {
		if (DopCurrentPrice) {
			if (setDopCurrentPrice) {
				const itemsIndex = DopCurrentPrice.findIndex(value => value.id === id)
				const NewItem = {
					...DopCurrentPrice[itemsIndex],
					quantity:
						DopCurrentPrice[itemsIndex].quantity > 1
							? DopCurrentPrice[itemsIndex].quantity - 1
							: 1,
				}
				const newCard = DopCurrentPrice.slice()
				newCard.splice(itemsIndex, 1, NewItem)
				setDopCurrentPrice(newCard)
			}
		}
	}

	const ListNumberEnter = () => {
		if (DopCurrentPrice) {
			if (setDopCurrentPrice) {
				const itemsIndex = DopCurrentPrice.findIndex(value => value.id === id)
				const NewItem = {
					...DopCurrentPrice[itemsIndex],
					quantity: Num,
				}
				const newCard = DopCurrentPrice.slice()
				newCard.splice(itemsIndex, 1, NewItem)
				setDopCurrentPrice(newCard)
			}
		}
	}

	//Выставления в количестве не ниже 1
	useEffect(() => {
		Num == 0 && setNum(1)
	}, [Num])

	useEffect(() => {
		Num == 1 && setTitleWindows('створка')
		Num > 1 && setTitleWindows('створки')
		Num >= 5 && setTitleWindows('створок')
	}, [Num, CurrentServicesSingle])

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
					onKeyDown={event => {
						event.key === 'Enter' && ListNumberEnter()
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
