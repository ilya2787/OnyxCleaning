import { useState } from 'react'
import BackBTN from '../../components/ui/BackBTN/BackBTN'
import BlockInformText from '../../components/ui/BlockInfoServices/BlockInformText'
import HeaderServices from '../../components/ui/HeaderServices/HeaderServices'
import { IconList } from '../../components/ui/IconList'
import ModalWindows from '../../components/ui/ModalWindows/ModalWindows'
import { PriceFormat } from '../../components/ui/PriceFormat/PriceFormat'
import {
	TypeBdCat,
	TypeListServices,
} from '../ApartmentCleaning/ItemsCleaning/ListDataCleaning/ListDataCleaning'
import './StyleOfficesCleaning.scss'

const OfficesCleaning = () => {
	const [ArrayData, setArrayData] = useState<TypeListServices[]>([])
	const [OpenModal, setOpenModal] = useState<boolean>(false)
	const [OpenModalDop, setOpenModalDop] = useState<boolean>(false)
	const [TitleModalDop, setTitleModalDop] = useState<string>('')
	const [ArrayDataDop, setArrayDataDop] = useState<TypeBdCat[]>([])
	const [ArrayFullListDop, setArrayFullListDop] = useState<TypeBdCat[]>([])

	return (
		<div className='OfficesCleaning'>
			<BackBTN />
			<HeaderServices
				title='Уборка офисов'
				BackgroundUrl='./img/poster/Office/Header.jpg'
				Tp={0.5}
			>
				<div className='OfficesCleaning--Header--text'>
					<p>
						От <span>{PriceFormat(90)}</span> /m <sup>2</sup>
					</p>
					<p>
						Минимальный заказ <span>от {PriceFormat(3500)}</span>
					</p>
					<ul>
						<li>
							<span>{IconList.Check}</span>В стоимость входит использование
							гипоаллергенных, профессиональных средств
						</li>
						<li>
							<span>{IconList.Check}</span>
							Работа с максимально деликатным отношением к интерьеру, технике,
							отделке и конфиденциальности
						</li>
						<li>
							<span>{IconList.Check}</span>
							Подходит для офисов, бутиков, салонов, шоу-румов
						</li>
					</ul>
				</div>
			</HeaderServices>
			<div className='OfficesCleaning--content'>
				<h1 className='OfficesCleaning--content--h1'> что входит в уборку</h1>
				<BlockInformText
					positions='row'
					deg={90}
					Title=''
					LinkImg='./img/poster/Office/OfficeList.jpg'
					ArrayDataCleaning={[]}
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
									от {PriceFormat(data.price ? data.price : 0)}
								</p>
							</div>
						))}
					</div>
				</div>
			</ModalWindows>
		</div>
	)
}

export default OfficesCleaning
