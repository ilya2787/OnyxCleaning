import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { PriceFormat } from '../../components/ui/PriceFormat/PriceFormat'
import { InitialQuadrature, TypeDopPrice } from './TypePrice'

interface TypeProps {
	NumberArea: number
	CurrentPrice: number
	PriceQuadrature: number
	C_Windows?: boolean
	DopCurrentPrice?: TypeDopPrice[]
	setDopCurrentPrice?: Dispatch<SetStateAction<TypeDopPrice[]>>
	MinemumPrice: number
}

const FinalPrice: FC<TypeProps> = ({
	NumberArea,
	CurrentPrice,
	PriceQuadrature,
	C_Windows,
	DopCurrentPrice,
	MinemumPrice,
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
	}, [NumberArea, PriceQuadrature])

	useEffect(() => {
		if (DopCurrentPrice) {
			setFinalPrice(
				CurrentPrice +
					DopCurrentPrice?.reduce(
						(a, v) => a + (v.quantity - 1) * v.price + v.minPrice,
						0
					)
			)
		} else {
			setFinalPrice(CurrentPrice)
		}
	}, [DopCurrentPrice, CurrentPrice])

	useEffect(() => {
		NumberArea === 1 && setTitleWindows('створка')
		NumberArea > 1 && setTitleWindows('створки')
		NumberArea >= 5 && setTitleWindows('створок')
	}, [NumberArea])
	return (
		<div className='Calculator--content--BlockResult'>
			<div className='Calculator--content--BlockResult--MimimunPrice'>
				<p>Минимальная стоимость</p>
				<div className='Calculator--content--BlockResult--MimimunPrice--price'>
					{PriceFormat(MinemumPrice)}
				</div>
			</div>
			{PriceQuadrature ? (
				<div className='Calculator--content--BlockResult--quadrature'>
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
					<div className='Calculator--content--BlockResult--quadrature--price'>
						<p>{PriceFormat(PriceQuadratureNew)}</p>
					</div>
				</div>
			) : null}
			{DopCurrentPrice && DopCurrentPrice.length > 0 && (
				<div className='Calculator--content--BlockResult--DopServices'>
					<h2>Дополнительные услуги </h2>
					{DopCurrentPrice.map((data, i) => (
						<div
							key={i}
							className='Calculator--content--BlockResult--DopServices--item'
						>
							<div className='Calculator--content--BlockResult--DopServices--item--text'>
								<p>{data.value}</p>
								<p>{data.unit && `${data.unit} x ${data.quantity}`}</p>
							</div>
							<div className='Calculator--content--BlockResult--DopServices--item--price'>
								{PriceFormat(
									data.FinalPriceDop ? data.FinalPriceDop : data.minPrice
								)}
							</div>
						</div>
					))}
				</div>
			)}
			<div className='Calculator--content--BlockResult--FinalPrice'>
				<h2>К оплате</h2>
				<p>{PriceFormat(FinalPrice)}</p>
			</div>
		</div>
	)
}

export default FinalPrice
