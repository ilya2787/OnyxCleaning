import axios from 'axios'
import { useEffect, useState } from 'react'
import { TCategories } from '../../components/type/Services.type'
import BackBTN from '../../components/ui/BackBTN/BackBTN'
import HeaderServices from '../../components/ui/HeaderServices/HeaderServices'
import { IconList } from '../../components/ui/IconList'
import CategoryCleaning from './CategoryCleaning/CategoryCleaning'
import Basic from './ItemsCleaning/Basic'
import General from './ItemsCleaning/General'
import Repair from './ItemsCleaning/Repair'
import './StyleApartmentCleaning.scss'

const ApartmentCleaning = () => {
	const [CatCleaning, setCatCleaning] = useState<string>('Basic')

	const [ArrayBD, setArrayBd] = useState<TCategories[]>([])
	const [ArrayDopBasic, setArrayDopBasic] = useState<TCategories[]>([])
	const [ArrayDopGeneral, setArrayDopGeneral] = useState<TCategories[]>([])
	const [ArrayDopRepair, setArrayDopRepair] = useState<TCategories[]>([])

	useEffect(() => {
		async function ListBDDop() {
			axios
				.get<TCategories[]>('/DopCleaningApartment')
				.then(res => {
					setArrayBd(res.data)
				})
				.catch(err => console.log(err))
		}
		ListBDDop()
	}, [setArrayBd])

	useEffect(() => {
		async function ListDop() {
			ArrayBD.map(data => {
				data.NameCatCleaning === 'Basic' &&
					setArrayDopBasic(ArrayDopBasic => [...ArrayDopBasic, data])
				data.NameCatCleaning === 'General' &&
					setArrayDopGeneral(ArrayDopGeneral => [...ArrayDopGeneral, data])
				data.NameCatCleaning === 'Repair' &&
					setArrayDopRepair(ArrayDopRepair => [...ArrayDopRepair, data])
			})
		}
		ListDop()
	}, [ArrayBD])
	return (
		<div className='ApartmentCleaning'>
			<BackBTN />
			<HeaderServices
				title='Уборка квартир и домов'
				BackgroundUrl='./img/poster/Apartment/Main.jpg'
				Tp={0.5}
				params={'CleaningApartment'}
			>
				<div className='ApartmentCleaning--Header--text'>
					<ul>
						<li>
							<span>{IconList.Check}</span> Генеральная — глубокая уборка всех
							поверхностей и зон.
						</li>
						<li>
							<span>{IconList.Check}</span> Базовая — регулярная уборка для
							поддержания чистоты.
						</li>
						<li>
							<span>{IconList.Check}</span> После ремонта — удаление
							строительной пыли и грязи.
						</li>
					</ul>
				</div>
			</HeaderServices>

			<div className='ApartmentCleaning-content'>
				<h1 className='ApartmentCleaning-content--h1'>Что входит в уборку ?</h1>
				<CategoryCleaning setCatCleaning={setCatCleaning} />
				{CatCleaning === 'Basic' && <Basic ArrayDopBasic={ArrayDopBasic} />}
				{CatCleaning === 'General' && (
					<General ArrayDopGeneral={ArrayDopGeneral} />
				)}
				{CatCleaning === 'Repair' && <Repair ArrayDopRepair={ArrayDopRepair} />}
			</div>
		</div>
	)
}

export default ApartmentCleaning
