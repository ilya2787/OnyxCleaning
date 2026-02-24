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
import './StyleWindowsCleaning.scss'

const WindowsCleaning = () => {
	const [ArrayData, setArrayData] = useState<TListServicesRoom[]>([])
	const [OpenModal, setOpenModal] = useState<boolean>(false)
	const [OpenModalDop, setOpenModalDop] = useState<boolean>(false)
	const [TitleModalDop, setTitleModalDop] = useState<string>('')
	const [ArrayDataDop, setArrayDataDop] = useState<TCategories[]>([])
	const [ArrayFullListDop, setArrayFullListDop] = useState<TCategories[]>([])
	const [ArrayListCleaning, setArrayListCleaning] = useState<TListServices[]>(
		[],
	)
	const [ArrayWindowsList, setArrayWindowsList] = useState<TListServices[]>([])
	const [PriceAll, setPriceAll] = useState<TPriceBD[]>([])
	const [MinPrice, setMinPrice] = useState<number>(0)
	const [PriceDoor, setPriceDoor] = useState<number>(0)

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
			data.Name_cleaning === 'Windows' &&
				setArrayWindowsList(ArrayWindowsList => [...ArrayWindowsList, data])
		})
	}, [ArrayListCleaning])

	useEffect(() => {
		async function ListBD() {
			axios
				.get<TCategories[]>(
					`${process.env.REACT_APP_SERVER}/DopCleaningWindows`,
				)
				.then(res => {
					setArrayFullListDop(res.data)
				})
				.catch(err => console.log(err))
		}
		ListBD()
	}, [setArrayFullListDop])

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
			data.Name === 'CleaningWindows' && setMinPrice(data.MinPrice)
			data.Name === 'Door' && setPriceDoor(data.price)
		})
	}, [PriceAll])

	return (
		<motion.div
			className='WindowsCleaning'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.3 } }}
			exit={{ opacity: 0, transition: { duration: 0.3 } }}
		>
			<BackBTN />
			<HeaderServices
				title='Мойка окон'
				BackgroundUrl='./img/poster/Windows/Header.jpg'
				Tp={0.5}
				params='CleaningWindows'
			>
				<div className='WindowsCleaning--headerText'>
					<p>
						От <span>{PriceFormat(PriceDoor)}</span> / створка
					</p>
					<p>
						Минимальный заказ <span>от {PriceFormat(MinPrice)}</span>
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
				<h1 className='WindowsCleaning--content--h1'>
					Что входит в мойку окон
				</h1>
				<section>
					<BlockInformText
						positions='row-reverse'
						deg={-90}
						Title=''
						LinkImg='./img/poster/Windows/WindowsList.jpg'
						ArrayDataCleaning={ArrayWindowsList}
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

export default WindowsCleaning
