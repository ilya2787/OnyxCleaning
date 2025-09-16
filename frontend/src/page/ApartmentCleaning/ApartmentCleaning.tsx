import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { IconList } from '../../components/ui/IconList'
import ServicesBtn from '../../components/ui/ServicesBtn/ServicesBtn'
import CategoryCleaning from './CategoryCleaning/CategoryCleaning'
import Basic from './ItemsCleaning/Basic'
import General from './ItemsCleaning/General'
import { TypeBdCat } from './ItemsCleaning/ListDataCleaning/ListDataCleaning'
import Repair from './ItemsCleaning/Repair'
import './StyleApartmentCleaning.scss'

const ApartmentCleaning = () => {
	const [CatCleaning, setCatCleaning] = useState<string>('Basic')

	const [ArrayBD, setArrayBd] = useState<TypeBdCat[]>([])
	const [ArrayDopBasic, setArrayDopBasic] = useState<TypeBdCat[]>([])
	const [ArrayDopGeneral, setArrayDopGeneral] = useState<TypeBdCat[]>([])
	const [ArrayDopRepair, setArrayDopRepair] = useState<TypeBdCat[]>([])

	useEffect(() => {
		async function ListBDDop() {
			axios
				.get<TypeBdCat[]>('/DopCleaningApartment')
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
			<Link to={'/'} className='ApartmentCleaning-LinkBack'>
				{' '}
				<span>{IconList.ArrowBack}</span>Вернуть назад
			</Link>
			<div className='ApartmentCleaning-header'>
				<h1>Уборка квартир и домов</h1>
				<div className='ApartmentCleaning-header-TextAndBtn'>
					<div className='ApartmentCleaning-header-TextAndBtn--text'>
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
					<ServicesBtn />
				</div>
			</div>

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
