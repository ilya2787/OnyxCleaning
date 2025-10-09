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

	useEffect(() => {}, [ActiveBlockDop])

	const Plus = () => {
		setQuantityDop(QuantityDop + 1)
	}

	const Minus = () => {
		if (QuantityDop > 1) {
			setQuantityDop(QuantityDop - 1)
		} else {
			setQuantityDop(0)
		}
	}

	const PlusListDop = (id: number) => {
		if (!BTN) {
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
		if (!BTN) {
		} else {
			const NewList = DopCurrentPrice.filter(item => item.id !== id)
			setDopCurrentPrice(NewList)
		}
	}

	const StyleBlockActive: React.CSSProperties = {
		background: '#d8d8c5',
	}

	const StyleBlock: React.CSSProperties = {
		background: `#ecdecb`,
	}

	return (
		<div
			className='Calculator--content--BlockPosition--DopServices--item'
			style={ActiveBlockDop ? StyleBlockActive : StyleBlock}
		>
			<p>{PriceFormat(price)}</p>
			<h3>{Text}</h3>
			{!BTN ? (
				<div className='Calculator--content--BlockPosition--DopServices--item--Quantity'>
					<button
						className='Calculator--content--BlockPosition--DopServices--item--Quantity--BTNMinus'
						onClick={() => Minus()}
					>
						-
					</button>
					<p>{QuantityDop}</p>
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
