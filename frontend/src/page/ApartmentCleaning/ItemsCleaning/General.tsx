import { FC, useEffect, useState } from 'react'
import {
	TCategories,
	TListServices,
	TListServicesRoom,
} from '../../../components/type/Services.type'
import BlockInformText from '../../../components/ui/BlockInfoServices/BlockInformText'
import { IconList } from '../../../components/ui/IconList'
import ModalWindows from '../../../components/ui/ModalWindows/ModalWindows'
import { PriceFormat } from '../../../components/ui/PriceFormat/PriceFormat'
import './StyleItemCleaning.scss'
interface TypeProps {
	ArrayDopGeneral: TCategories[]
	ArrayCleaning: TListServices[]
}

const General: FC<TypeProps> = ({ ArrayDopGeneral, ArrayCleaning }) => {
	const [OpenModal, setOpenModal] = useState<boolean>(false)
	const [OpenModalDop, setOpenModalDop] = useState<boolean>(false)
	const [TitleModalDop, setTitleModalDop] = useState<string>('')
	const [ArrayData, setArrayData] = useState<TListServicesRoom[]>([])
	const [ArrayDataDop, setArrayDataDop] = useState<TCategories[]>([])
	const [ArrayBasicAllRoom, setArrayBasicAllRoom] = useState<TCategories[]>([])
	const [ArrayBasicFood, setArrayBasicFood] = useState<TCategories[]>([])
	const [ArrayBasicWC, setArrayBasicWC] = useState<TCategories[]>([])

	const [ArrayListAllRoom, setArrayListAllRoom] = useState<TListServicesRoom[]>(
		[],
	)
	const [ArrayListFood, setArrayListFood] = useState<TListServicesRoom[]>([])
	const [ArrayListWC, setArrayListWC] = useState<TListServicesRoom[]>([])

	const ListRoomCleaning = async () => {
		await ArrayCleaning.map(data => {
			data.Name_Room === 'AllRoom' &&
				setArrayListAllRoom(ArrayListAllRoom => [
					...ArrayListAllRoom,
					{ id: data.id, Text: data.Text },
				])
			data.Name_Room === 'Food' &&
				setArrayListFood(ArrayListFood => [
					...ArrayListFood,
					{ id: data.id, Text: data.Text },
				])
			data.Name_Room === 'WC' &&
				setArrayListWC(ArrayListWC => [
					...ArrayListWC,
					{ id: data.id, Text: data.Text },
				])
		})
	}
	useEffect(() => {
		ListRoomCleaning()
	}, [ArrayCleaning])

	useEffect(() => {
		ArrayDopGeneral.map(data => {
			data.NameCatRooms === 'AllRoom' &&
				setArrayBasicAllRoom(ArrayBasicAllRoom => [...ArrayBasicAllRoom, data])
			data.NameCatRooms === 'Food' &&
				setArrayBasicFood(ArrayBasicFood => [...ArrayBasicFood, data])
			data.NameCatRooms === 'WC' &&
				setArrayBasicWC(ArrayBasicWC => [...ArrayBasicWC, data])
		})
	}, [ArrayDopGeneral])

	return (
		<div className='General'>
			<section>
				<BlockInformText
					positions='row'
					deg={90}
					Title='Комнаты'
					LinkImg='./img/poster/Apartment/Rooms.jpg'
					ArrayDataCleaning={ArrayListAllRoom}
					setArrayData={setArrayData}
					setOpenModal={setOpenModal}
					setOpenModalDop={setOpenModalDop}
					setTitleModalDop={setTitleModalDop}
					ArrayDopServices={ArrayBasicAllRoom}
					setArrayDataDop={setArrayDataDop}
				/>

				<BlockInformText
					positions='row-reverse'
					deg={-90}
					Title='Кухня'
					LinkImg='./img/poster/Apartment/Food.jpg'
					ArrayDataCleaning={ArrayListFood}
					setArrayData={setArrayData}
					setOpenModal={setOpenModal}
					setOpenModalDop={setOpenModalDop}
					setTitleModalDop={setTitleModalDop}
					ArrayDopServices={ArrayBasicFood}
					setArrayDataDop={setArrayDataDop}
				/>

				<BlockInformText
					positions='row'
					deg={90}
					Title='Санузел'
					LinkImg='./img/poster/Apartment/WC.jpg'
					ArrayDataCleaning={ArrayListWC}
					setArrayData={setArrayData}
					setOpenModal={setOpenModal}
					setOpenModalDop={setOpenModalDop}
					setTitleModalDop={setTitleModalDop}
					ArrayDopServices={ArrayBasicWC}
					setArrayDataDop={setArrayDataDop}
				/>
				<ModalWindows
					Title='Полный список'
					modalIsOpen={OpenModal}
					onClose={() => setOpenModal(false)}
				>
					<ul className='ModalContentUL'>
						{ArrayData.map(data => (
							<li key={data.id}>
								<span className='ModalContentUL-Icon'>{IconList.Check}</span>
								<p>{data.Text}</p>
							</li>
						))}
					</ul>
				</ModalWindows>
				<ModalWindows
					Title={TitleModalDop}
					modalIsOpen={OpenModalDop}
					onClose={() => setOpenModalDop(false)}
				>
					<div className='ModalDopServices'>
						<h2 className='ModalDopServices--title'>Дополнительные услуги</h2>
						<div className='ModalDopServices--content'>
							{ArrayDataDop.map(data => (
								<div
									key={data.id}
									className='ModalDopServices--content--informBlock'
								>
									<p className='ModalDopServices--content--informBlock--text'>
										{data.text}
									</p>
									<p className='ModalDopServices--content--informBlock--price'>
										{data.price &&
											` от ${PriceFormat(data.price ? data.price : 0)} `}
										{!data.price ? ` ` : data.unit && '/ '}
										{data.unit && `${data.unit}`}
									</p>
								</div>
							))}
						</div>
					</div>
				</ModalWindows>
			</section>
		</div>
	)
}

export default General
