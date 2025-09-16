import { useParams } from 'react-router-dom'
import { PathParams, ROUTES } from '../../model/routes'

const ServicesPage = () => {
	const params = useParams<PathParams[typeof ROUTES.SERVICE]>()
	return <p>{params.nameServices}</p>
}

export default ServicesPage
