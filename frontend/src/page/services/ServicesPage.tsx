import { useParams } from 'react-router-dom'
import { PathParams, ROUTES } from '../../model/routes'

const ServicesPage = () => {
	const params = useParams<PathParams[typeof ROUTES.Calculator]>()
	return <p>{params.NameCleaning}</p>
}

export default ServicesPage
