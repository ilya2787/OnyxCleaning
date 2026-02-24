import { Link } from 'react-router'
import { IconList } from '../../../components/ui/IconList'
import { ROUTES } from '../../../model/routes'

const DataCleaning = () => {
	return (
		<div className='DataCleaning'>
			<Link to={ROUTES.AdminHome} className='DataCleaning_BackLink'>
				На главную
			</Link>
			<div className='DataCleaning_content'>
				<Link
					to={ROUTES.ApartmentData}
					className='DataCleaning_content_Apartment'
				>
					<h2>Уборка квартир и домой</h2>
					<span>{IconList.House}</span>
				</Link>
				<div className='DataCleaning_content_Office'>
					<h2>Уборка офисов</h2>
					<span>{IconList.OfficeHouse}</span>
				</div>
				<div className='DataCleaning_content_Windows'>
					<h2>Мойка окон</h2>
					<span>{IconList.Window}</span>
				</div>
				<div className='DataCleaning_content_General'>
					<h2>Общие параметры</h2>
					<span>{IconList.ServicesIcon}</span>
				</div>
			</div>
		</div>
	)
}

export default DataCleaning
