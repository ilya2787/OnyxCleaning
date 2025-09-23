import axios from 'axios'
import { useEffect, useState } from 'react'
import {
	TypeBdCat,
	TypeListServices,
	WindowsList,
} from '../../components/ListDataCleaning/ListDataCleaning'
import BackBTN from '../../components/ui/BackBTN/BackBTN'
import BlockInformText from '../../components/ui/BlockInfoServices/BlockInformText'
import HeaderServices from '../../components/ui/HeaderServices/HeaderServices'
import { IconList } from '../../components/ui/IconList'
import ModalWindows from '../../components/ui/ModalWindows/ModalWindows'
import { PriceFormat } from '../../components/ui/PriceFormat/PriceFormat'
import './StyleWindowsCleaning.scss'

const WindowsCleaning = () => {
	const [ArrayData, setArrayData] = useState<TypeListServices[]>([])
	const [OpenModal, setOpenModal] = useState<boolean>(false)
	const [OpenModalDop, setOpenModalDop] = useState<boolean>(false)
	const [TitleModalDop, setTitleModalDop] = useState<string>('')
	const [ArrayDataDop, setArrayDataDop] = useState<TypeBdCat[]>([])
	const [ArrayFullListDop, setArrayFullListDop] = useState<TypeBdCat[]>([])

	useEffect(() => {
		async function ListBD() {
			axios
				.get<TypeBdCat[]>('/DopCleaningWindows')
				.then(res => {
					setArrayFullListDop(res.data)
				})
				.catch(err => console.log(err))
		}
		ListBD()
	}, [setArrayFullListDop])

	return (
		<div className='WindowsCleaning'>
			<BackBTN />
			<HeaderServices
				title='Мойка окон'
				BackgroundUrl='./img/poster/Windows/Header.jpg'
				Tp={0.5}
			>
				<div className='WindowsCleaning--headerText'>
					<p>
						От <span>{PriceFormat(350)}</span> / створка
					</p>
					<p>
						Минимальный заказ <span>от {PriceFormat(2500)}</span>
					</p>
					<ul>
						<li>
							<span>{IconList.Check}</span>Используем только специализированные
							профессиональные средства
						</li>
						<li>
							<span>{IconList.Check}</span>
							Обеспечиваем бережную работу с остеклением любой сложности
						</li>
					</ul>
				</div>
			</HeaderServices>
			<div className='WindowsCleaning--content'>
				<h1 className='WindowsCleaning--content--h1'>Что входит</h1>
				<BlockInformText
					positions='row-reverse'
					deg={-90}
					Title=''
					LinkImg='./img/poster/Windows/WindowsList.jpg'
					ArrayDataCleaning={WindowsList}
					setArrayData={setArrayData}
					setOpenModal={setOpenModal}
					setOpenModalDop={setOpenModalDop}
					setTitleModalDop={setTitleModalDop}
					setArrayDataDop={setArrayDataDop}
					ArrayDopServices={ArrayFullListDop}
				/>
			</div>
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
		</div>
	)
}

export default WindowsCleaning
