import ItemBlockHome from '../../../components/ui/AdminPanel/ItemBlockHome'
import { IconList } from '../../../components/ui/IconList'
import { ROUTES } from '../../../model/routes'

const AdminHome = () => {
	return (
		<div className='AdminHome'>
			<ItemBlockHome
				icon={IconList.User}
				LinkRouts={ROUTES.UserData}
				title='Пользователи сделавшие заказ услуг'
			/>

			<ItemBlockHome
				icon={IconList.Clear}
				LinkRouts={ROUTES.CleaningData}
				title='Предоставляемые услуги'
			/>
			<ItemBlockHome
				icon={IconList.Contact}
				LinkRouts={``}
				title='Контактные данные'
			/>
		</div>
	)
}

export default AdminHome
