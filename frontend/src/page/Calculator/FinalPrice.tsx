import { FC, useEffect, useState } from 'react'
import { PriceFormat } from '../../components/ui/PriceFormat/PriceFormat'
import { InitialQuadrature } from './TypePrice'

interface TypeProps {
	NumberArea: number
	CurrentPrice: number
	PriceQuadrature: number
	TitleWindows?: string
}

const FinalPrice: FC<TypeProps> = ({
	NumberArea,
	CurrentPrice,
	PriceQuadrature,
	TitleWindows,
}) => {
	const [PriceQuadratureNew, setPriceQuadratureNew] = useState<number>(0)
	useEffect(() => {
		if (TitleWindows == '' || TitleWindows == undefined) {
			if (NumberArea > InitialQuadrature.Quantity) {
				setPriceQuadratureNew(
					(NumberArea - InitialQuadrature.Quantity) * PriceQuadrature
				)
			} else {
				setPriceQuadratureNew(PriceQuadrature)
			}
		} else {
			if (NumberArea > 1) {
				setPriceQuadratureNew((NumberArea - 1) * PriceQuadrature)
			} else {
				setPriceQuadratureNew(PriceQuadrature)
			}
		}
	}, [NumberArea, PriceQuadrature])
	return (
		<div className='Calculator--content--BlockResult'>
			{PriceQuadrature ? (
				<div className='Calculator--content--BlockResult--quadrature'>
					<p>
						{NumberArea}
						<span>
							{TitleWindows ? (
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

			<div className='Calculator--content--BlockResult--FinalPrice'>
				<h2>К оплате</h2>
				<p>{PriceFormat(CurrentPrice)}</p>
			</div>
		</div>
	)
}

export default FinalPrice
