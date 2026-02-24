import axios from 'axios'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TListServices } from '../../../components/type/Services.type'
import ModalWindows from '../../../components/ui/ModalWindows/ModalWindows'
import './StyleModalWindows.scss'

interface TypeProps {
	OpenModalListCleaning: boolean
	setOpenModalListCleaning: Dispatch<SetStateAction<boolean>>
	CurrentServicesSingle: string
	CurrentCatCleaning: string
}

const ModalWindowsListCleaning: FC<TypeProps> = ({
	OpenModalListCleaning,
	setOpenModalListCleaning,
	CurrentServicesSingle,
	CurrentCatCleaning,
}) => {
	const [ArrayListCleaning, setArrayListCleaning] = useState<TListServices[]>(
		[],
	)

	useEffect(() => {
		async function ArrayDataList() {
			await axios
				.get<TListServices[]>(`${process.env.REACT_APP_SERVER}/ListCleaning`)
				.then(res => setArrayListCleaning(res.data))
				.catch(err => console.log(err))
		}
		ArrayDataList()
	}, [setArrayListCleaning])

	return (
		<ModalWindows
			Title='Что входит в уборку'
			modalIsOpen={OpenModalListCleaning}
			onClose={() => setOpenModalListCleaning(false)}
		>
			<div className='ModalCalculator_ListCleaning'>
				<ul>
					{CurrentServicesSingle === 'CleaningApartment' && (
						<>
							<h2>Уборка в квартирах и домах</h2>
							<h3>
								{CurrentCatCleaning === 'Basic' && 'Базовая уборка'}
								{CurrentCatCleaning === 'General' && 'Генеральная уборка'}
								{CurrentCatCleaning === 'Repair' && 'После ремонта'}
							</h3>
							{ArrayListCleaning.map(
								data =>
									CurrentCatCleaning === data.Name_cleaning && (
										<li key={data.id}>{data.Text}</li>
									),
							)}
							{CurrentCatCleaning === '' && <h2>Вы не выбрали тип уборки</h2>}
						</>
					)}

					{CurrentServicesSingle === 'CleaningOffice' && (
						<>
							<h2>Уборка офисных помещений</h2>
							{ArrayListCleaning.map(
								data =>
									data.Name_cleaning === 'Office' && (
										<li key={data.id}>{data.Text}</li>
									),
							)}
						</>
					)}

					{CurrentServicesSingle === 'CleaningWindows' && (
						<>
							<h2>Мойка окон</h2>
							{ArrayListCleaning.map(
								data =>
									data.Name_cleaning === 'Windows' && (
										<li key={data.id}>{data.Text}</li>
									),
							)}
						</>
					)}

					{CurrentServicesSingle === '' && <h2>Вы не выбрали услугу</h2>}
				</ul>
			</div>
		</ModalWindows>
	)
}

export default ModalWindowsListCleaning
