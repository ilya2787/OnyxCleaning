import {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react'
import { DegreePrice } from '../../../components/type/Parameter.type'
import { TDopCurrentPrice } from '../../../components/type/Services.type'
import { UpdateFinalPriceDop } from '../../../components/ui/Function/function'
import { IconList } from '../../../components/ui/IconList'
import { PriceFormat } from '../../../components/ui/PriceFormat/PriceFormat'
import { StatusCleaning } from '../../../components/ui/SelectItems/ListSelectCleaning'
import SelectItems from '../../../components/ui/SelectItems/SelectItems'

interface TypeProps {
	DopCurrentPrice: TDopCurrentPrice[]
	setDopCurrentPrice: Dispatch<SetStateAction<TDopCurrentPrice[]>>
	Text: string
	id: number
	unit: string | undefined
	price: number
	minW: number
	fsH3: number
	setDegreeTitle?: Dispatch<SetStateAction<string>>
}

const ItemDop: FC<TypeProps> = ({
	DopCurrentPrice,
	setDopCurrentPrice,
	Text,
	id,
	unit,
	price,
	minW,
	fsH3,
	setDegreeTitle,
}) => {
	const [QuantityDop, setQuantityDop] = useState<number>(0)
	const [ActiveBlockDop, setActiveBlockDop] = useState<boolean>(false)
	const [SymbolSearch, setSymbolSearch] = useState<boolean>(false)
	const [CheckboxDopServices, setCheckboxDopServices] = useState<boolean>(false)
	const [CurrentStatusCleaning, setCurrentStatusCleaning] =
		useState<string>('Del')
	const inputNumber = useRef<HTMLInputElement>(null)
	const [FocusInput, setFocusInput] = useState<boolean>(false)

	const Plus = () => {
		setQuantityDop(QuantityDop + 1)
		const itemsIndex = DopCurrentPrice.findIndex(value => value.id === id)
		if (itemsIndex >= 0) {
			const NewItem = {
				...DopCurrentPrice[itemsIndex],
				quantity: DopCurrentPrice[itemsIndex].quantity + 1,
			}
			const newCard = DopCurrentPrice.slice()
			newCard.splice(itemsIndex, 1, NewItem)
			setDopCurrentPrice(newCard)
			UpdateFinalPriceDop(newCard, id, setDopCurrentPrice)
		} else {
			setDopCurrentPrice(DopCurrentPrice => [
				...DopCurrentPrice,
				{
					id: id,
					title: '',
					value: Text,
					quantity: 1,
					unit: unit ? unit : '',
					price: price,
					MinPrice: price,
				},
			])
		}
	}
	const Minus = () => {
		if (QuantityDop > 1) {
			setQuantityDop(QuantityDop - 1)
			const itemsIndex = DopCurrentPrice.findIndex(value => value.id === id)
			const NewItem = {
				...DopCurrentPrice[itemsIndex],
				quantity:
					DopCurrentPrice[itemsIndex].quantity > 1
						? DopCurrentPrice[itemsIndex].quantity - 1
						: 0,
			}
			const newCard = DopCurrentPrice.slice()
			newCard.splice(itemsIndex, 1, NewItem)
			setDopCurrentPrice(newCard)
			UpdateFinalPriceDop(newCard, id, setDopCurrentPrice)
		} else {
			setQuantityDop(0)
			MinusListDop(id)
		}
	}

	const PlusListDop = (id: number) => {
		setDopCurrentPrice(DopCurrentPrice => [
			...DopCurrentPrice,
			{
				id: id,
				title: '',
				value: Text,
				quantity: 1,
				unit: unit ? unit : '',
				price: 1,
				MinPrice: price,
			},
		])
	}

	const MinusListDop = (id: number) => {
		const NewList = DopCurrentPrice.filter(item => item.id !== id)
		setDopCurrentPrice(NewList)
	}

	const ListNumberEnter = () => {
		if (QuantityDop >= 1) {
			setQuantityDop(QuantityDop)
			const itemsIndex = DopCurrentPrice.findIndex(value => value.id === id)
			if (itemsIndex >= 0) {
				const NewItem = {
					...DopCurrentPrice[itemsIndex],
					quantity: DopCurrentPrice[itemsIndex].quantity >= 1 ? QuantityDop : 0,
				}
				const newCard = DopCurrentPrice.slice()
				newCard.splice(itemsIndex, 1, NewItem)
				setDopCurrentPrice(newCard)
				UpdateFinalPriceDop(newCard, id, setDopCurrentPrice)
			} else {
				setDopCurrentPrice(DopCurrentPrice => [
					...DopCurrentPrice,
					{
						id: id,
						title: '',
						value: Text,
						quantity: QuantityDop,
						unit: unit ? unit : '',
						price: price,
						MinPrice: price,
					},
				])
			}
		} else {
			setQuantityDop(0)
			MinusListDop(id)
		}
	}

	useEffect(() => {
		if (unit) {
			let SymbolSearchUnit = unit.indexOf('степени')
			if (SymbolSearchUnit >= 0) {
				setSymbolSearch(true)
			} else {
				setSymbolSearch(false)
			}
		}
	}, [unit])

	const PlusDopDegree = (Title: string, price: number, id: number) => {
		MinusListDop(id)
		if (setDegreeTitle) {
			setDegreeTitle(Title)
		}
		setDopCurrentPrice(DopCurrentPrice => [
			...DopCurrentPrice,
			{
				id: id,
				title: '',
				value: Text,
				quantity: 1,
				unit: unit ? unit : '',
				price: 1,
				MinPrice: price,
			},
		])
	}

	useEffect(() => {
		if (CurrentStatusCleaning === 'Del') {
			MinusListDop(id)
			setActiveBlockDop(false)
		}
		if (CurrentStatusCleaning === 'Low') {
			setActiveBlockDop(true)
			PlusDopDegree('Низкий', DegreePrice.Low_price, id)
		}
		if (CurrentStatusCleaning === 'Average') {
			setActiveBlockDop(true)
			PlusDopDegree('Средний', DegreePrice.Average_price, id)
		}
		if (CurrentStatusCleaning === 'Hard') {
			setActiveBlockDop(true)
			PlusDopDegree('Высокая', DegreePrice.Hard_price, id)
		}
	}, [CurrentStatusCleaning])

	const AddServicesDop = () => {
		if (!CheckboxDopServices) {
			setCheckboxDopServices(true)
			PlusListDop(id)
			setActiveBlockDop(true)
		} else {
			setCheckboxDopServices(false)
			MinusListDop(id)
			setActiveBlockDop(false)
		}
	}

	const StyleBlockActive: React.CSSProperties = {
		background: '#edf5ce',
		minHeight: `${minW}px`,
		cursor: 'pointer',
	}

	const StyleBlock: React.CSSProperties = {
		background: `#f3f0e4`,
		minHeight: `${minW}px`,
		cursor: 'pointer',
	}

	const StyleH3: React.CSSProperties = {
		fontSize: `${fsH3}px`,
	}

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length > event.target.maxLength) {
			event.target.value = event.target.value.slice(0, event.target.maxLength)
			setQuantityDop(Number(event.target.value))
		} else {
			setQuantityDop(Number(event.target.value))
		}
	}

	useEffect(() => {
		if (inputNumber.current) {
			if (!FocusInput) {
				if (!QuantityDop) {
					setQuantityDop(0)
					MinusListDop(id)
					inputNumber.current.value = String(0)
				} else {
					ListNumberEnter()
				}
			}
		}
	}, [inputNumber, FocusInput])

	return (
		<div
			className='Calculator--content--BlockPosition--DopServices--item'
			style={ActiveBlockDop || QuantityDop > 0 ? StyleBlockActive : StyleBlock}
			onClick={() => {
				unit || (SymbolSearch === false && AddServicesDop())
			}}
		>
			<h3 style={StyleH3}>{Text}</h3>
			{unit && SymbolSearch === false ? (
				<div className='Calculator--content--BlockPosition--DopServices--item--Quantity'>
					<button
						className='Calculator--content--BlockPosition--DopServices--item--Quantity--BTNMinus'
						onClick={() => Minus()}
					>
						-
					</button>
					<input
						maxLength={2}
						ref={inputNumber}
						onChange={event => {
							handleChangeInput(event)
						}}
						onKeyDown={event => {
							event.key === 'Enter' && ListNumberEnter()
						}}
						type='number'
						value={QuantityDop >= 0 ? QuantityDop : undefined}
						onFocus={() => setFocusInput(true)}
						onBlur={() => setFocusInput(false)}
					/>
					<button
						className='Calculator--content--BlockPosition--DopServices--item--Quantity--BTNPlus'
						onClick={() => Plus()}
					>
						+
					</button>
				</div>
			) : SymbolSearch === false ? (
				<div className='Calculator--content--BlockPosition--DopServices--item--BTNYesNo'>
					<span>{IconList.CursorClick}</span>
				</div>
			) : (
				<section className='Calculator--content--BlockPosition--DopServices--item--degree'>
					<div className='Calculator--content--BlockPosition--DopServices--item--degree--Status'>
						<SelectItems
							options={StatusCleaning}
							CurrentServicesSingle={CurrentStatusCleaning}
							setCurrentServicesSingle={setCurrentStatusCleaning}
							Placeholder=''
							isMulti={false}
							isSearch={false}
						/>
					</div>
				</section>
			)}
			<p className='Calculator--content--BlockPosition--DopServices--item--PriceBD'>
				{`${price ? PriceFormat(price) : ''}  ${unit ? unit : ''}  `}
			</p>
		</div>
	)
}

export default ItemDop
