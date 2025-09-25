import { FC } from 'react'
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
					<p>{PriceFormat(NumberArea * PriceQuadrature)}</p>
				</div>
			) : null}
			<div className='Calculator--content--BlockResult--FinalPrice'>
				{CurrentPrice < minPrice
					? PriceFormat(minPrice)
					: PriceFormat(CurrentPrice)}
			</div>
		</div>
	)
}

export default FinalPrice
