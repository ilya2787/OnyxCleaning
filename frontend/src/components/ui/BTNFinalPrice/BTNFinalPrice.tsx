import { FC } from 'react'
import { Link } from 'react-router-dom'

interface TypeProps {
	Text: string
	FunctionOnClick: () => void
	Links: string
}

const BTNFinalPrice: FC<TypeProps> = ({ Links, Text, FunctionOnClick }) => {
	return (
		<Link
			to={Links}
			className='Calculator--content--BlockResult--BTN'
			onClick={FunctionOnClick}
		>
			{Text}
		</Link>
	)
}

export default BTNFinalPrice
