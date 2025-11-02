import { FC, useEffect } from 'react'
import { useLocation } from 'react-router'

interface Props {
	Title: string
}

const TitlePage: FC<Props> = ({ Title }) => {
	const location = useLocation()

	useEffect(() => {
		document.title = Title
	}, [location, Title])
	return null
}

export default TitlePage
