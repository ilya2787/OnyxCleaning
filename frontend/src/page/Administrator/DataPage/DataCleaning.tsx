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
				<Link to={ROUTES.OfficeData} className='DataCleaning_content_Office'>
					<h2>Уборка офисов</h2>
					<span>{IconList.OfficeHouse}</span>
				</Link>
				<Link to={ROUTES.WindowsData} className='DataCleaning_content_Windows'>
					<h2>Мойка окон</h2>
					<span>{IconList.Window}</span>
				</Link>
				<Link
					to={ROUTES.SettingAllData}
					className='DataCleaning_content_General'
				>
					<h2>Общие параметры</h2>
					<span>{IconList.ServicesIcon}</span>
				</Link>
			</div>
		</div>
	)
}

export default DataCleaning
