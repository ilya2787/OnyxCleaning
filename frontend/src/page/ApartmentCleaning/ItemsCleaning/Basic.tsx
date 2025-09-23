import { FC, useEffect, useState } from 'react'
import {
	BasicList,
	TypeBdCat,
	TypeListServices,
} from '../../../components/ListDataCleaning/ListDataCleaning'
import BlockInformText from '../../../components/ui/BlockInfoServices/BlockInformText'
import { IconList } from '../../../components/ui/IconList'
import ModalWindows from '../../../components/ui/ModalWindows/ModalWindows'
import { PriceFormat } from '../../../components/ui/PriceFormat/PriceFormat'
import './StyleItemCleaning.scss'

interface TypeProps {
	ArrayDopBasic: TypeBdCat[]
}

const Basic: FC<TypeProps> = ({ ArrayDopBasic }) => {
	const [OpenModal, setOpenModal] = useState<boolean>(false)
	const [OpenModalDop, setOpenModalDop] = useState<boolean>(false)
	const [TitleModalDop, setTitleModalDop] = useState<string>('')
	const [ArrayData, setArrayData] = useState<TypeListServices[]>([])
	const [ArrayBasicAllRoom, setArrayBasicAllRoom] = useState<TypeBdCat[]>([])
	const [ArrayBasicFood, setArrayBasicFood] = useState<TypeBdCat[]>([])
	const [ArrayBasicWC, setArrayBasicWC] = useState<TypeBdCat[]>([])
	const [ArrayDataDop, setArrayDataDop] = useState<TypeBdCat[]>([])

	useEffect(() => {
		ArrayDopBasic.map(data => {
			data.NameCatRooms === 'Комнаты' &&
				setArrayBasicAllRoom(ArrayBasicAllRoom => [...ArrayBasicAllRoom, data])
			data.NameCatRooms === 'Кухня' &&
				setArrayBasicFood(ArrayBasicFood => [...ArrayBasicFood, data])
			data.NameCatRooms === 'Санузел' &&
				setArrayBasicWC(ArrayBasicWC => [...ArrayBasicWC, data])
		})
	}, [ArrayDopBasic])

	return (
		<div className='Basic'>
			{BasicList.map((data, i) => (
				<section key={i}>
					<BlockInformText
						key={i}
						positions='row'
						deg={90}
						Title='Комнаты'
						LinkImg='./img/poster/Apartment/Rooms.jpg'
						ArrayDataCleaning={data.AllRoom.List}
						setArrayData={setArrayData}
						setOpenModal={setOpenModal}
						setOpenModalDop={setOpenModalDop}
						setTitleModalDop={setTitleModalDop}
						setArrayDataDop={setArrayDataDop}
						ArrayDopServices={ArrayBasicAllRoom}
					/>
					<BlockInformText
						positions='row-reverse'
						deg={-90}
						Title='Кухня'
						LinkImg='./img/poster/Apartment/Food.jpg'
						ArrayDataCleaning={data.Food.List}
						setArrayData={setArrayData}
						setOpenModal={setOpenModal}
						setOpenModalDop={setOpenModalDop}
						setTitleModalDop={setTitleModalDop}
						setArrayDataDop={setArrayDataDop}
						ArrayDopServices={ArrayBasicFood}
					/>
					<BlockInformText
						positions='row'
						deg={90}
						Title='Санузел'
						LinkImg='./img/poster/Apartment/WC.jpg'
						ArrayDataCleaning={data.WC.List}
						setArrayData={setArrayData}
						setOpenModal={setOpenModal}
						setOpenModalDop={setOpenModalDop}
						setTitleModalDop={setTitleModalDop}
						setArrayDataDop={setArrayDataDop}
						ArrayDopServices={ArrayBasicWC}
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
			))}
		</div>
	)
}

export default Basic
