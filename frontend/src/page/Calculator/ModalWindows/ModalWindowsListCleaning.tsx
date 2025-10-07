import { Dispatch, FC, SetStateAction } from 'react'
import {
	BasicList,
	GeneralList,
	OfficeList,
	RepairList,
	WindowsList,
} from '../../../components/ListDataCleaning/ListDataCleaning'
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
							{CurrentCatCleaning === 'Basic' &&
								BasicList.map((data, i) => (
									<>
										<h2>Комнаты</h2>
										{data.AllRoom.List.map(List => (
											<li key={List.id}>{List.Text}</li>
										))}
										<h2>Кухня</h2>
										{data.Food.List.map(List => (
											<li key={List.id}>{List.Text}</li>
										))}
										<h2>Санузел</h2>
										{data.WC.List.map(List => (
											<li key={List.id}>{List.Text}</li>
										))}
									</>
								))}

							{CurrentCatCleaning === 'General' &&
								GeneralList.map((data, i) => (
									<>
										<h2>Комнаты</h2>
										{data.AllRoom.List.map(List => (
											<li key={List.id}>{List.Text}</li>
										))}
										<h2>Кухня</h2>
										{data.Food.List.map(List => (
											<li key={List.id}>{List.Text}</li>
										))}
										<h2>Санузел</h2>
										{data.WC.List.map(List => (
											<li key={List.id}>{List.Text}</li>
										))}
									</>
								))}

							{CurrentCatCleaning === 'Repair' &&
								RepairList.map((data, i) => (
									<>
										<h2>Комнаты</h2>
										{data.AllRoom.List.map(List => (
											<li key={List.id}>{List.Text}</li>
										))}
										<h2>Кухня</h2>
										{data.Food.List.map(List => (
											<li key={List.id}>{List.Text}</li>
										))}
										<h2>Санузел</h2>
										{data.WC.List.map(List => (
											<li key={List.id}>{List.Text}</li>
										))}
									</>
								))}
							{CurrentCatCleaning === '' && <h2>Вы не выбрали тип уборки</h2>}
						</>
					)}

					{CurrentServicesSingle === 'CleaningOffice' && (
						<>
							<h2>Уборка офисных помещений</h2>
							{OfficeList.map(data => (
								<li key={data.id}>{data.Text}</li>
							))}
						</>
					)}

					{CurrentServicesSingle === 'CleaningWindows' && (
						<>
							<h2>Мойка окон</h2>
							{WindowsList.map(data => (
								<li key={data.id}>{data.Text}</li>
							))}
						</>
					)}

					{CurrentServicesSingle === '' && <h2>Вы не выбрали услугу</h2>}
				</ul>
			</div>
		</ModalWindows>
	)
}

export default ModalWindowsListCleaning
