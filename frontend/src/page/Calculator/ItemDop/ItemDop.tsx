import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { PriceFormat } from '../../../components/ui/PriceFormat/PriceFormat'
import { TypeDopPrice } from '../TypePrice'

interface TypeProps {
	DopCurrentPrice: TypeDopPrice[]
	setDopCurrentPrice: Dispatch<SetStateAction<TypeDopPrice[]>>
	Text: string
	id: number
	BTN: boolean
	unit: string | undefined
	price: number
}

const ItemDop: FC<TypeProps> = ({
	DopCurrentPrice,
	setDopCurrentPrice,
	Text,
	id,
	BTN,
	unit,
	price,
}) => {
	const [QuantityDop, setQuantityDop] = useState<number>(0)
	const [ActiveBlockDop, setActiveBlockDop] = useState<boolean>(false)
	const [SymbolSearch, setSymbolSearch] = useState<boolean>(false)

	useEffect(() => {}, [ActiveBlockDop])

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
			UpdateFinalPriceDop(newCard)
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
					minPrice: price,
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
			UpdateFinalPriceDop(newCard)
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
					minPrice: price,
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
					minPrice: price,
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
				UpdateFinalPriceDop(newCard)
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
						minPrice: price,
					},
				])
			}
		} else {
			setQuantityDop(0)
			MinusListDop(id)
		}
	}

	const UpdateFinalPriceDop = (UpdateCart: TypeDopPrice[]) => {
		if (setDopCurrentPrice) {
			const itemsIndex = UpdateCart.findIndex(value => value.id === id)
			const NewItem = {
				...UpdateCart[itemsIndex],
				FinalPriceDop:
					(UpdateCart[itemsIndex].quantity - 1) * UpdateCart[itemsIndex].price +
					UpdateCart[itemsIndex].minPrice,
			}
			const newCard = UpdateCart.slice()
			newCard.splice(itemsIndex, 1, NewItem)
			setDopCurrentPrice(newCard)
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
		background: '#d8d8c5',
	}

	const StyleBlock: React.CSSProperties = {
		background: `#ecdecb`,
	}
	return (
		<div
			className='Calculator--content--BlockPosition--DopServices--item'
			style={ActiveBlockDop || QuantityDop > 0 ? StyleBlockActive : StyleBlock}
		>
			<p className='Calculator--content--BlockPosition--DopServices--item--PriceBD'>
				{`${price ? PriceFormat(price) : ''}  ${unit ? unit : ''}  `}
			</p>
			<h3>{Text}</h3>
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
