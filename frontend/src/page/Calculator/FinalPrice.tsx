import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { InitialQuadrature } from '../../components/type/Parameter.type'
import {
	TCitiesDistancePrice,
	TDopCurrentPrice,
} from '../../components/type/Services.type'
import { PriceFormat } from '../../components/ui/PriceFormat/PriceFormat'

interface TypeProps {
	NumberArea: number
	CurrentPrice: number
	PriceQuadrature: number
	C_Windows?: boolean
	DopCurrentPrice?: TDopCurrentPrice[]
	setDopCurrentPrice?: Dispatch<SetStateAction<TDopCurrentPrice[]>>
	MinimumPrice: number
	ArrayIdDopWindows?: TDopCurrentPrice[]
	DegreeTitle: string
	CurrentDistance?: TCitiesDistancePrice[]
}

const FinalPrice: FC<TypeProps> = ({
	NumberArea,
	CurrentPrice,
	PriceQuadrature,
	C_Windows,
	DopCurrentPrice,
	ArrayIdDopWindows,
	MinimumPrice,
	DegreeTitle,
	CurrentDistance,
}) => {
	const [PriceQuadratureNew, setPriceQuadratureNew] = useState<number>(0)
	const [FinalPrice, setFinalPrice] = useState<number>(CurrentPrice)
	const [TitleWindows, setTitleWindows] = useState<string>('')
	useEffect(() => {
		if (C_Windows === false) {
			if (NumberArea > InitialQuadrature.Quantity) {
				setPriceQuadratureNew(
					(NumberArea - InitialQuadrature.Quantity) * PriceQuadrature
				)
			} else {
				setPriceQuadratureNew(0)
			}
		} else {
			if (NumberArea > 1) {
				setPriceQuadratureNew((NumberArea - 1) * PriceQuadrature)
			} else {
				setPriceQuadratureNew(0)
			}
		}
	}, [NumberArea, PriceQuadrature, C_Windows])

	useEffect(() => {
		if (DopCurrentPrice && ArrayIdDopWindows && CurrentDistance) {
			setFinalPrice(
				CurrentPrice +
					DopCurrentPrice?.reduce(
						(a, v) => a + (v.quantity - 1) * v.price + v.MinPrice,
						0
					) +
					ArrayIdDopWindows?.reduce(
						(a, v) => a + (v.quantity - 1) * v.price + v.MinPrice,
						0
					) +
					CurrentDistance?.reduce((a, v) => a + v.price, 0)
			)
		} else {
			setFinalPrice(CurrentPrice)
		}
	}, [DopCurrentPrice, CurrentPrice, ArrayIdDopWindows, CurrentDistance])

	useEffect(() => {
		NumberArea === 1 && setTitleWindows('створка')
		NumberArea > 1 && setTitleWindows('створки')
		NumberArea >= 5 && setTitleWindows('створок')
	}, [NumberArea])

	const SearchUnit = (unit: string, quantity: number) => {
		let SymbolSearchUnit = unit.indexOf('степени')
		if (SymbolSearchUnit >= 0) {
			return DegreeTitle
		} else {
			return quantity
		}
	}

	return (
		<div className='Calculator--content--BlockResult--item'>
			<div className='Calculator--content--BlockResult--item--MinimumPrice'>
				<p>Минимальная стоимость</p>
				<div className='Calculator--content--BlockResult--item--MinimumPrice--price'>
					{PriceFormat(MinimumPrice)}
				</div>
			</div>
			{PriceQuadrature ? (
				<div className='Calculator--content--BlockResult--item--quadrature'>
					<p>
						{NumberArea}
						<span>
							{C_Windows ? (
								TitleWindows
							) : (
								<>
									m<sup>2</sup>
								</>
							)}
						</span>
					</p>
					<div className='Calculator--content--BlockResult--item--quadrature--price'>
						<p>{PriceFormat(PriceQuadratureNew)}</p>
					</div>
				</div>
			) : null}
			{CurrentDistance &&
				CurrentDistance.map((data, i) => (
					<div
						key={i}
						className='Calculator--content--BlockResult--item--Distance'
					>
						<p>{data.Name}</p>
						<div className='Calculator--content--BlockResult--item--Distance--distance'>
							{data.Distance > 0 ? <p>Расстояния: {data.Distance} км.</p> : ''}
						</div>
						<div className='Calculator--content--BlockResult--item--Distance--price'>
							{data.price ? PriceFormat(data.price) : 'Бесплатно'}
						</div>
					</div>
				))}
			{ArrayIdDopWindows && ArrayIdDopWindows.length > 0 && (
				<div className='Calculator--content--BlockResult--item--DopServices'>
					<h2>Услуги по мойке окон</h2>
					{ArrayIdDopWindows.map((data, i) => (
						<div
							key={i}
							className='Calculator--content--BlockResult--item--DopServices--item'
						>
							<div className='Calculator--content--BlockResult--item--DopServices--item--text'>
								<p>{data.value}</p>
								<p>
									{data.unit &&
										`${data.unit} x ${SearchUnit(data.unit, data.quantity)}`}
								</p>
							</div>
							<div className='Calculator--content--BlockResult--item--DopServices--item--price'>
								{PriceFormat(
									data.FinalPriceDop ? data.FinalPriceDop : data.MinPrice
								)}
							</div>
						</div>
					))}
				</div>
			)}
			{DopCurrentPrice && DopCurrentPrice.length > 0 && (
				<div className='Calculator--content--BlockResult--item--DopServices'>
					<h2>Дополнительные услуги</h2>
					{DopCurrentPrice.map((data, i) => (
						<div
							key={i}
							className='Calculator--content--BlockResult--item--DopServices--item'
						>
							<div className='Calculator--content--BlockResult--item--DopServices--item--text'>
								<p>{data.value}</p>
								<p>{data.unit && `${data.unit} x ${data.quantity}`}</p>
							</div>
							<div className='Calculator--content--BlockResult--item--DopServices--item--price'>
								{PriceFormat(
									data.FinalPriceDop ? data.FinalPriceDop : data.MinPrice
								)}
							</div>
						</div>
					))}
				</div>
			)}

			<div className='Calculator--content--BlockResult--item--FinalPrice'>
				<h2>К оплате</h2>
				<p>{PriceFormat(FinalPrice)}</p>
			</div>
		</div>
	)
}

export default FinalPrice
