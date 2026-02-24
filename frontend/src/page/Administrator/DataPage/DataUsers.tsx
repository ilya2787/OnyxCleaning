import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { TAllListUser } from '../../../components/type/Services.type'
import { formatDate } from '../../../components/ui/FormatDate/FormatDate'
import { IconList } from '../../../components/ui/IconList'
import { DeleteUsersMessage } from '../../../components/ui/natificationMesseg/natificationMessag'
import { ROUTES } from '../../../model/routes'

const DataUser = () => {
	const [ListUsers, setListUsers] = useState<TAllListUser[]>([])

	const ListAllData = async () => {
		await axios
			.get<TAllListUser[]>(`${process.env.REACT_APP_SERVER}/AllListUsers`)
			.then(res => setListUsers(res.data))
			.catch(err => console.log(err))
	}
	useEffect(() => {
		ListAllData()
	}, [ListUsers])

	const DeleteUser = (id: number) => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/DeleteUser`, { id: id })
			.then((res: any) => {
				if (res.data.STATUS === 'TRUE') {
					DeleteUsersMessage(id)
				}
			})
			.catch(err => console.log(err))

		setListUsers(ListUsers.filter(item => item.id !== id))
	}

	return (
		<div className='DataUser'>
			<Link to={ROUTES.AdminHome} className='DataUser_BackLink'>
				На главную
			</Link>
			{ListUsers.map(data => (
				<div className='DataUser_item' key={data.id}>
					<h2>{data.Name}</h2>
					<div className='DataUser_item_Phone'>
						<span>{IconList.Phone}</span> <p>{data.Phone}</p>
					</div>
					<p>
						Вид уборки: <span>{data.Name_cleaning}</span>
					</p>
					<p>
						Количество заказов: <span>{data.OrderQuantity}</span>
					</p>
					<p>
						Дата последнего заказа: <span>{formatDate(data.Date)}</span>
					</p>
					<button
						className='DataUser_item_delete'
						onClick={() => DeleteUser(data.id)}
					>
						{IconList.Delete}
					</button>
				</div>
			))}
		</div>
	)
}

export default DataUser
