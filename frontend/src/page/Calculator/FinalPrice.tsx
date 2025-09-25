import { FC, useEffect, useState } from 'react'
import { PriceFormat } from '../../components/ui/PriceFormat/PriceFormat'

interface TypeProps {
	NumberArea: number
	CurrentPrice: number
	minPrice: number
	PriceQuadrature: number
	TitleWindows?: string
}

const FinalPrice: FC<TypeProps> = ({
	NumberArea,
	CurrentPrice,
	minPrice,
	PriceQuadrature,
	TitleWindows,
}) => {
	const [PriceQuadratureNew, setPriceQuadratureNew] = useState<number>(0)
	useEffect(() => {
		NumberArea > 30
			? setPriceQuadratureNew((NumberArea - 29) * PriceQuadrature)
			: setPriceQuadratureNew(PriceQuadrature)
	}, [NumberArea, PriceQuadrature])

	return (
		<div className='Calculator--content--BlockResult'>
			{PriceQuadrature ? (
				<div className='Calculator--content--BlockResult--quadrature'>
					<p>
						{NumberArea}
						{TitleWindows ? (
							TitleWindows
						) : (
							<>
								m<sup>2</sup>
							</>
						)}
					</p>
					<span></span>
					<p>{PriceFormat(PriceQuadratureNew)}</p>
				</div>
			) : null}
			<div className='Calculator--content--BlockResult--FinalPrice'>
				{PriceFormat(NumberArea > 30 ? CurrentPrice + minPrice : minPrice)}
			</div>
		</div>
	)
}

export default FinalPrice
