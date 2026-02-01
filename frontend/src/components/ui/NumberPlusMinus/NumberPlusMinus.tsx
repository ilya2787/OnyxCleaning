import {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react'
import { TDopCurrentPrice } from '../../type/Services.type'
import { UpdateFinalPriceDop } from '../Function/function'

interface TypeProps {
	CurrentServicesSingle: string
	Num: number
	setNum: Dispatch<SetStateAction<number>>
	id?: number
	DopCurrentPrice?: TDopCurrentPrice[]
	setDopCurrentPrice?: Dispatch<SetStateAction<TDopCurrentPrice[]>>
	CalculatorPriceAndQuantity: () => void
}

const NumberPlusMinus: FC<TypeProps> = ({
	CurrentServicesSingle,
	Num,
	setNum,
	id,
	DopCurrentPrice,
	setDopCurrentPrice,
	CalculatorPriceAndQuantity,
}) => {
	//Функция сложения вычитания для квадратуры и количеству створок
	const [TitleWindows, setTitleWindows] = useState<string>('')
	const inputNumber = useRef<HTMLInputElement>(null)
	const [FocusInput, setFocusInput] = useState<boolean>(false)

	const PlusNumber = () => {
		if (Num >= 999) {
			setNum(999)
		} else {
			setNum(Num + 1)
		}
		ListNumberPlus()
		CalculatorPriceAndQuantity()
	}
	const MinusNumber = () => {
		if (Num <= 0) {
			setNum(1)
		} else {
			setNum(Num - 1)
		}
		ListNumberMinus()
		CalculatorPriceAndQuantity()
	}
	const ListNumberPlus = () => {
		if (DopCurrentPrice && setDopCurrentPrice && id) {
			const itemsIndex = DopCurrentPrice.findIndex(value => value.id === id)
			const NewItem = {
				...DopCurrentPrice[itemsIndex],
				quantity: DopCurrentPrice[itemsIndex].quantity + 1,
			}
			const newCard = DopCurrentPrice.slice()
			newCard.splice(itemsIndex, 1, NewItem)
			setDopCurrentPrice(newCard)
			UpdateFinalPriceDop(newCard, id, setDopCurrentPrice)
		}
	}

	const ListNumberMinus = () => {
		if (DopCurrentPrice && id) {
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
				UpdateFinalPriceDop(newCard, id, setDopCurrentPrice)
			}
		}
	}

	const ListNumberEnter = () => {
		if (DopCurrentPrice && id) {
			if (setDopCurrentPrice) {
				const itemsIndex = DopCurrentPrice.findIndex(value => value.id === id)
				const NewItem = {
					...DopCurrentPrice[itemsIndex],
					quantity: Num >= 1 ? Num : 1,
				}
				const newCard = DopCurrentPrice.slice()
				newCard.splice(itemsIndex, 1, NewItem)
				setDopCurrentPrice(newCard)
				UpdateFinalPriceDop(newCard, id, setDopCurrentPrice)
			}
		}
	}
	useEffect(() => {
		CalculatorPriceAndQuantity()
	}, [Num])

	useEffect(() => {
		Num == 1 && setTitleWindows('створка')
		Num > 1 && setTitleWindows('створки')
		Num >= 5 && setTitleWindows('створок')
	}, [Num, CurrentServicesSingle])

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length > event.target.maxLength) {
			event.target.value = event.target.value.slice(0, event.target.maxLength)
			setNum(Number(event.target.value))
		} else {
			setNum(Number(event.target.value))
		}
	}

	useEffect(() => {
		if (inputNumber.current) {
			if (!FocusInput) {
				if (!Num || Num <= 0) {
					inputNumber.current.value = '1'
					setNum(1)
				}
			}
		}
	}, [FocusInput])

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
					maxLength={3}
					ref={inputNumber}
					onChange={event => {
						handleChangeInput(event)
					}}
					onKeyDown={event => {
						event.key === 'Enter' && ListNumberEnter()
					}}
					value={Num > 0 ? Num : undefined}
					type='number'
					onFocus={() => setFocusInput(true)}
					onBlur={() => setFocusInput(false)}
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
