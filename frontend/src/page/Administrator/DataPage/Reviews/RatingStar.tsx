import { Dispatch, FC, SetStateAction } from 'react'
import { IconList } from '../../../../components/ui/IconList'
interface Props {
	CountStars: number
	CurrentItem: number
	setCurrentItem: Dispatch<SetStateAction<number>>
	HoverItem: number
	setHoverItem: Dispatch<SetStateAction<number>>
	disable: boolean
}
const RatingStar: FC<Props> = ({
	CountStars = 5,
	CurrentItem,
	setCurrentItem,
	HoverItem,
	setHoverItem,
	disable,
}) => {
	const stars = Array(CountStars).fill(0)

	return (
		<div className='RatingStar'>
			{stars.map((data, i) => {
				const CurrentStyle = i <= CurrentItem ? { color: '#dcb87a' } : {}
				const HoverStyle = i <= HoverItem ? { color: '#dcb87a' } : {}
				return (
					<div
						key={i}
						className='RatingStar-item'
						style={{ ...CurrentStyle, ...HoverStyle }}
						onMouseMove={() => {
							!disable && setHoverItem(i)
						}}
						onMouseOut={() => {
							!disable && setHoverItem(0)
						}}
						onClick={() => {
							!disable && setCurrentItem(i)
						}}
					>
						{IconList.Star}
					</div>
				)
			})}
		</div>
	)
}

export default RatingStar
