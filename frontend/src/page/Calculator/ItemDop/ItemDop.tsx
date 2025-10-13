import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TDopCurrentPrice } from '../../../components/type/Services.type'
import { UpdateFinalPriceDop } from '../../../components/ui/Function/function'
import { PriceFormat } from '../../../components/ui/PriceFormat/PriceFormat'

interface TypeProps {
	DopCurrentPrice: TDopCurrentPrice[]
	setDopCurrentPrice: Dispatch<SetStateAction<TDopCurrentPrice[]>>
	Text: string
	id: number
	unit: string | undefined
	price: number
	minW: number
	fsH3: number
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
}) => {
	const [QuantityDop, setQuantityDop] = useState<number>(0)
	const [ActiveBlockDop, setActiveBlockDop] = useState<boolean>(false)
	const [SymbolSearch, setSymbolSearch] = useState<boolean>(false)

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
		if (!SymbolSearch) {
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
		} else {
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
	}

	const MinusListDop = (id: number) => {
		const NewList = DopCurrentPrice.filter(item => item.id !== id)
		setDopCurrentPrice(NewList)
	}

	const ListNumberEnter = () => {
		if (QuantityDop > 1) {
			setQuantityDop(QuantityDop)
			const itemsIndex = DopCurrentPrice.findIndex(value => value.id === id)
			if (itemsIndex >= 0) {
				const NewItem = {
					...DopCurrentPrice[itemsIndex],
					quantity: DopCurrentPrice[itemsIndex].quantity > 1 ? QuantityDop : 0,
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
			let SymbolSearchUnit = unit.indexOf('%')
			if (SymbolSearchUnit >= 0) {
				setSymbolSearch(true)
			} else {
				setSymbolSearch(false)
			}
		}
	}, [unit])

	const StyleBlockActive: React.CSSProperties = {
		background: '#f5f5ce',
		minHeight: `${minW}px`,
	}

	const StyleBlock: React.CSSProperties = {
		background: `#f3f0e4`,
		minHeight: `${minW}px`,
	}

	const StyleH3: React.CSSProperties = {
		fontSize: `${fsH3}px`,
	}
	return (
		<div
			className='Calculator--content--BlockPosition--DopServices--item'
			style={ActiveBlockDop || QuantityDop > 0 ? StyleBlockActive : StyleBlock}
		>
			<p className='Calculator--content--BlockPosition--DopServices--item--PriceBD'>
				{`${price ? PriceFormat(price) : ''}  ${unit ? unit : ''}  `}
			</p>
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
						onChange={event => {
							setQuantityDop(Number(event.target.value))
						}}
						onKeyDown={event => {
							event.key === 'Enter' && ListNumberEnter()
						}}
						value={QuantityDop}
						type='number'
					/>
					<button
						className='Calculator--content--BlockPosition--DopServices--item--Quantity--BTNPlus'
						onClick={() => Plus()}
					>
						+
					</button>
				</div>
			) : (
				<div className='Calculator--content--BlockPosition--DopServices--item--BTNYesNo'>
					<div className='Calculator--content--BlockPosition--DopServices--item--BTNYesNo--Yes'>
						<input
							type='radio'
							name={`${String(id)}--Name`}
							id={`${String(id)}--Yes`}
							onChange={event => {
								if (event.target.checked) {
									PlusListDop(id)
									setActiveBlockDop(true)
								}
							}}
						/>
						<label htmlFor={`${String(id)}--Yes`}>Сделать</label>
					</div>
					<div className='Calculator--content--BlockPosition--DopServices--item--BTNYesNo--No'>
						<input
							type='radio'
							name={`${String(id)}--Name`}
							id={`${String(id)}--No`}
							onChange={event => {
								if (event.target.checked) {
									MinusListDop(id)
									setActiveBlockDop(false)
								}
							}}
							defaultChecked
						/>
						<label htmlFor={`${String(id)}--No`}>Не нужно</label>
					</div>
				</div>
			)}
		</div>
	)
}

export default ItemDop
