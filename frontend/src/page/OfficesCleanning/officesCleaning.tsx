import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
	TCategories,
	TListServices,
	TListServicesRoom,
	TPriceBD,
} from '../../components/type/Services.type'
import BackBTN from '../../components/ui/BackBTN/BackBTN'
import BlockInformText from '../../components/ui/BlockInfoServices/BlockInformText'
import HeaderServices from '../../components/ui/HeaderServices/HeaderServices'
import { IconList } from '../../components/ui/IconList'
import ModalWindows from '../../components/ui/ModalWindows/ModalWindows'
import { PriceFormat } from '../../components/ui/PriceFormat/PriceFormat'
import './StyleOfficesCleaning.scss'

const OfficesCleaning = () => {
	const [ArrayData, setArrayData] = useState<TListServicesRoom[]>([])
	const [OpenModal, setOpenModal] = useState<boolean>(false)
	const [OpenModalDop, setOpenModalDop] = useState<boolean>(false)
	const [TitleModalDop, setTitleModalDop] = useState<string>('')
	const [ArrayDataDop, setArrayDataDop] = useState<TCategories[]>([])
	const [ArrayFullListDop, setArrayFullListDop] = useState<TCategories[]>([])
	const [ArrayListCleaning, setArrayListCleaning] = useState<TListServices[]>(
		[],
	)
	const [ArrayOfficeList, setArrayOfficeList] = useState<TListServices[]>([])
	const [PriceAll, setPriceAll] = useState<TPriceBD[]>([])
	const [MinPrice, setMinPrice] = useState<number>(0)
	const [PriceQuadrature, setPriceQuadrature] = useState<number>(0)

	useEffect(() => {
		async function ListBD() {
			axios
				.get<TCategories[]>(`${process.env.REACT_APP_SERVER}/DopCleaningOffice`)
				.then(res => {
					setArrayFullListDop(res.data)
				})
				.catch(err => console.log(err))
		}
		ListBD()
	}, [setArrayFullListDop])

	useEffect(() => {
		async function ArrayDataList() {
			await axios
				.get<TListServices[]>(`${process.env.REACT_APP_SERVER}/ListCleaning`)
				.then(res => setArrayListCleaning(res.data))
				.catch(err => console.log(err))
		}
		ArrayDataList()
	}, [setArrayListCleaning])

	useEffect(() => {
		ArrayListCleaning.map(data => {
			data.Name_cleaning === 'Office' &&
				setArrayOfficeList(ArrayOfficeList => [...ArrayOfficeList, data])
		})
	}, [ArrayListCleaning])

	useEffect(() => {
		async function PriceAllBD() {
			await axios
				.get<TPriceBD[]>(`${process.env.REACT_APP_SERVER}/PriceCleaning`)
				.then(res => setPriceAll(res.data))
				.catch(err => console.log(err))
		}
		PriceAllBD()
	}, [setPriceAll])

	useEffect(() => {
		PriceAll.map(data => {
			data.Name === 'CleaningOffice' && setMinPrice(data.MinPrice)
			data.Name === 'OfficeQuadrature' && setPriceQuadrature(data.price)
		})
	}, [PriceAll])

	return (
		<motion.div
			className='OfficesCleaning'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.3 } }}
			exit={{ opacity: 0, transition: { duration: 0.3 } }}
		>
			<BackBTN />
			<HeaderServices
				params='CleaningOffice'
				title='Уборка офисов'
				BackgroundUrl='./img/poster/Office/Header.jpg'
				Tp={0.5}
			>
				<div className='OfficesCleaning--Header--text'>
					<p>
						От <span>{PriceFormat(PriceQuadrature)}</span> /m <sup>2</sup>
					</p>
					<p>
						Минимальный заказ <span>от {PriceFormat(MinPrice)}</span>
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
				<section>
					<BlockInformText
						positions='row-reverse'
						deg={-90}
						Title=''
						LinkImg='./img/poster/Office/OfficeList.jpg'
						ArrayDataCleaning={ArrayOfficeList}
						setArrayData={setArrayData}
						setOpenModal={setOpenModal}
						setOpenModalDop={setOpenModalDop}
						setTitleModalDop={setTitleModalDop}
						setArrayDataDop={setArrayDataDop}
						ArrayDopServices={ArrayFullListDop}
					/>
				</section>
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
		</motion.div>
	)
}

export default OfficesCleaning
