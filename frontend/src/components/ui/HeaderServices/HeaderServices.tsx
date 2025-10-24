import { FC, PropsWithChildren } from 'react'
import ServicesBtn from '../ServicesBtn/ServicesBtn'
import './HeaderServices.scss'

interface TypeProps extends PropsWithChildren {
	title: string
	BackgroundUrl: string
	Tp: number
	params: string
}

const HeaderServices: FC<TypeProps> = ({
	title,
	BackgroundUrl,
	Tp,
	children,
	params,
}) => {
	const BackgroundHeader: React.CSSProperties = {
		background: `url(${BackgroundUrl})`,
		backgroundColor: `rgba(41, 31, 20, ${Tp})`,
		backgroundBlendMode: 'Multiply',
		backgroundRepeat: `no-repeat`,
		backgroundPosition: `50% 50%`,
		backgroundSize: `Cover`,
	}
	return (
		<div className='header' style={BackgroundHeader}>
			<h1>{title}</h1>
			<div className='header--textAndBTN'>
				<div className='header--textAndBTN--text'>{children}</div>
				<ServicesBtn params={params} />
			</div>
		</div>
	)
}

export default HeaderServices
