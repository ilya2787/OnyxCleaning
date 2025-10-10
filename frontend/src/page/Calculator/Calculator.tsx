import axios from 'axios'
import { useEffect, useState } from 'react'
import { InitialQuadrature } from '../../components/type/Parameter.type'
import type {
	TCategories,
	TDopCurrent,
	TPriceBD,
	TRootPrice,
} from '../../components/type/Services.type'
import NumberPlusMinus from '../../components/ui/NumberPlusMinus/NumberPlusMinus'
import {
	CatCleaning,
	Services,
} from '../../components/ui/SelectItems/ListSelectCleaning'
import SelectItems from '../../components/ui/SelectItems/SelectItems'
import FinalPrice from './FinalPrice'
import ItemDop from './ItemDop/ItemDop'
import ModalWindowsListCleaning from './ModalWindows/ModalWindowsListCleaning'
import './StyleCalculator.scss'

const Calculator = () => {
	//Модальное окно
	const [OpenModalListCleaning, setOpenModalListCleaning] =
		useState<boolean>(false)
	//Состояния текущий значений
	const [CurrentServicesSingle, setCurrentServicesSingle] = useState<string>('')
	const [CurrentCatCleaning, setCurrentCatCleaning] = useState<string>('')
	const [NumberArea, setNumberArea] = useState<number>(0)

	//Наименование "Створок"
	const [DopClearWindowsState, setDopClearWindowsState] =
		useState<boolean>(false)
	const [NumWindowsDop, setNumWindowsDop] = useState<number>(0)
	const [C_Windows, setC_Windows] = useState<boolean>(false)

	//Текущий прайс по выбранным категориям

	const [CurrentPrice, setCurrentPrice] = useState<number>(0)
	const [DopCurrentPrice, setDopCurrentPrice] = useState<TDopCurrent[]>([])

	//Прайс из БД по позициям сервиса
	const [Price, setPrice] = useState<TPriceBD[]>([])
	const [MinPriceCleaningApartment, setMinPriceCleaningApartment] =
		useState<number>(0)
	const [PriceCleaningApartment_DOP, setPriceCleaningApartment_DOP] = useState<
		TRootPrice[]
	>([])
	const [PriceRootApartment, setPriceRootApartment] = useState<number>(0)
	const [MinPriceOffice, setMinPriceOffice] = useState<number>(0)
	const [PriceQuadratureOffice, setPriceQuadratureOffice] = useState<number>(0)
	const [MinPriceWindows, setMinPriceWindows] = useState<number>(0)
	const [DoorPriceWindows, setDoorPriceWindows] = useState<number>(0)

	//Переменный по доп услугам из БД
	const [ArrayBDApartment, setArrayBDApartment] = useState<TCategories[]>([])
	const [ArrayDopBasic, setArrayDopBasic] = useState<TCategories[]>([])
	const [ArrayDopGeneral, setArrayDopGeneral] = useState<TCategories[]>([])
	const [ArrayDopRepair, setArrayDopRepair] = useState<TCategories[]>([])

	const [ArrayBDOfficeCleaning, setArrayBDOfficeCleaning] = useState<
		TCategories[]
	>([])

	const [ArrayBDWindowsCleaning, setArrayBDWindowsCleaning] = useState<
		TCategories[]
	>([])

	//Выгрузка прайса минимальных и цену за квадратный метр из БД
	const ArrayBDPrice = async () => {
		await axios
			.get<TPriceBD[]>('/PriceCleaning')
			.then(res => setPrice(res.data))
			.catch(err => console.log(err))
	}
	useEffect(() => {
		ArrayBDPrice()
	}, [setPrice])

	//Сортировка цен по позициям сервиса
	const SortingPrices = () => {
		Price.map(data => {
			data.Name === 'CleaningApartment' &&
				setMinPriceCleaningApartment(data.MinPrice)
			data.Name === 'Basic' &&
				setPriceCleaningApartment_DOP(PriceCleaningApartment_DOP => [
					...PriceCleaningApartment_DOP,
					{ Name: data.Name, price: data.price },
				])
			data.Name === 'General' &&
				setPriceCleaningApartment_DOP(PriceCleaningApartment_DOP => [
					...PriceCleaningApartment_DOP,
					{ Name: data.Name, price: data.price },
				])
			data.Name === 'Repair' &&
				setPriceCleaningApartment_DOP(PriceCleaningApartment_DOP => [
					...PriceCleaningApartment_DOP,
					{ Name: data.Name, price: data.price },
				])
			data.Name === 'CleaningOffice' && setMinPriceOffice(data.MinPrice)
			data.Name === 'OfficeQuadrature' && setPriceQuadratureOffice(data.price)
			data.Name === 'CleaningWindows' && setMinPriceWindows(data.MinPrice)
			data.Name === 'Door' && setDoorPriceWindows(data.price)
		})
	}
	useEffect(() => {
		SortingPrices()
	}, [Price])

	//Отчистка позиций
	useEffect(() => {
		ClearDop()
		if (CurrentServicesSingle !== 'CleaningApartment') {
			setCurrentCatCleaning('')
			setPriceRootApartment(0)
		}
		if (CurrentServicesSingle === 'CleaningWindows') {
			setNumberArea(1)
			setNumWindowsDop(1)
			setC_Windows(true)
		} else {
			setC_Windows(false)
		}
		CalculatorPriceAndQuantity()
	}, [CurrentServicesSingle, CurrentCatCleaning])

	const ClearDop = () => {
		setDopClearWindowsState(false)
		setNumWindowsDop(1)
		setDopCurrentPrice([])
	}

	const OnClickInputWindows = () => {
		if (DopClearWindowsState === false) {
			setDopClearWindowsState(true)
			setDopCurrentPrice(DopCurrentPrice => [
				...DopCurrentPrice,
				{
					id: 500,
					title: 'DopCleaningWindows_minPrice',
					value: 'Мойка окон',
					quantity: 1,
					unit: 'Створок',
					price: DoorPriceWindows,
					MinPrice: MinPriceWindows,
				},
			])
		} else {
			setDopClearWindowsState(false)
			setNumWindowsDop(1)
		}
	}
	//Производимые расчеты количества на сумму из БД
	const CalculatorPriceAndQuantity = () => {
		if (NumberArea > InitialQuadrature.Quantity) {
			if (CurrentServicesSingle === 'CleaningOffice') {
				setCurrentPrice(
					(NumberArea - InitialQuadrature.Quantity) * PriceQuadratureOffice +
						MinPriceOffice
				)
			}
			if (CurrentServicesSingle === 'CleaningApartment') {
				PriceCleaningApartment_DOP.map(data => {
					data.Name === CurrentCatCleaning &&
						setCurrentPrice(
							(NumberArea - InitialQuadrature.Quantity) * data.price +
								MinPriceCleaningApartment
						)
				})
			}
		} else {
			if (CurrentServicesSingle === 'CleaningOffice') {
				setCurrentPrice(MinPriceOffice)
			}
			if (CurrentServicesSingle === 'CleaningApartment') {
				setCurrentPrice(MinPriceCleaningApartment)
			}
		}

		if (CurrentServicesSingle === 'CleaningWindows') {
			if (NumberArea > 1) {
				setCurrentPrice((NumberArea - 1) * DoorPriceWindows + MinPriceWindows)
			} else {
				setCurrentPrice(MinPriceWindows)
			}
		}
	}

	//Присвоение цены за квадратный метр (Категория уборки квартир)
	useEffect(() => {
		PriceCleaningApartment_DOP.map(data => {
			data.Name === CurrentCatCleaning && setPriceRootApartment(data.price)
		})
	}, [PriceCleaningApartment_DOP, CurrentCatCleaning])

	//Выгрузка доп услуг из БД
	const ArrayDopServicesBD = async () => {
		await axios
			.get<TCategories[]>('/DopCleaningApartment')
			.then(res => {
				setArrayBDApartment(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		ArrayDopServicesBD()
	}, [setArrayBDApartment])

	const SortingDopServicesApartment = async () => {
		await ArrayBDApartment.map(data => {
			data.NameCatCleaning === 'Basic' &&
				setArrayDopBasic(ArrayDopBasic => [...ArrayDopBasic, data])
			data.NameCatCleaning === 'General' &&
				setArrayDopGeneral(ArrayDopGeneral => [...ArrayDopGeneral, data])
			data.NameCatCleaning === 'Repair' &&
				setArrayDopRepair(ArrayDopRepair => [...ArrayDopRepair, data])
		})
	}
	useEffect(() => {
		SortingDopServicesApartment()
	}, [ArrayBDApartment])

	const LandingDopServicesOffice = async () => {
		await axios
			.get<TCategories[]>('/DopCleaningOffice')
			.then(res => {
				setArrayBDOfficeCleaning(res.data)
			})
			.catch(err => console.log(err))
	}
	useEffect(() => {
		LandingDopServicesOffice()
	}, [setArrayBDOfficeCleaning])

	const LandingDopServicesWindowsCleaning = async () => {
		await axios
			.get<TCategories[]>('/DopCleaningWindows')
			.then(res => {
				setArrayBDWindowsCleaning(res.data)
			})
			.catch(err => console.log(err))
	}
	useEffect(() => {
		LandingDopServicesWindowsCleaning()
	}, [setArrayBDWindowsCleaning])

	return (
		<div className='Calculator'>
			<h1 className='Calculator--h1'>Рассчитать стоимость уборки</h1>
			<div className='Calculator--content'>
				<div className='Calculator--content--BlockPosition'>
					<div className='Calculator--content--BlockPosition--Services'>
						<h2>Услуга</h2>
						<SelectItems
							options={Services}
							CurrentServicesSingle={CurrentServicesSingle}
							setCurrentServicesSingle={setCurrentServicesSingle}
							Placeholder={'Выберите услугу'}
							isMulti={false}
							CalculatorPriceAndQuantity={CalculatorPriceAndQuantity}
						/>
					</div>
					{CurrentServicesSingle === 'CleaningApartment' && (
						<div className='Calculator--content--BlockPosition--CatServices'>
							<h2>Вид уборки</h2>
							<SelectItems
								options={CatCleaning}
								CurrentServicesSingle={CurrentCatCleaning}
								setCurrentServicesSingle={setCurrentCatCleaning}
								Placeholder={'Выберите вид уборки'}
								isMulti={false}
								CalculatorPriceAndQuantity={CalculatorPriceAndQuantity}
							/>
						</div>
					)}
					<div className='Calculator--content--BlockPosition--quadrature'>
						<h2>
							{CurrentServicesSingle !== 'CleaningWindows'
								? 'Квадратура помещения'
								: 'Количество створок'}
						</h2>
						<NumberPlusMinus
							CurrentServicesSingle={CurrentServicesSingle}
							Num={NumberArea}
							setNum={setNumberArea}
							CalculatorPriceAndQuantity={CalculatorPriceAndQuantity}
						/>
					</div>

					{CurrentServicesSingle !== 'CleaningWindows' && (
						<div className='Calculator--content--BlockPosition--CleaningWinDop'>
							<div className='Calculator--content--BlockPosition--CleaningWinDop--checkbox'>
								<input
									type='checkbox'
									name=''
									id='CheckboxWindows'
									onChange={() => OnClickInputWindows()}
									checked={DopClearWindowsState}
								/>
								<label htmlFor='CheckboxWindows'>Необходима мойка окон</label>
							</div>
							{DopClearWindowsState && (
								<section>
									<NumberPlusMinus
										CurrentServicesSingle='CleaningWindows'
										Num={NumWindowsDop}
										setNum={setNumWindowsDop}
										id={500}
										DopCurrentPrice={DopCurrentPrice}
										setDopCurrentPrice={setDopCurrentPrice}
										CalculatorPriceAndQuantity={CalculatorPriceAndQuantity}
									/>
									<div className='Calculator--content--BlockPosition--CleaningWinDop--ListDop'>
										<h3 className='Calculator--content--BlockPosition--CleaningWinDop--ListDop--h3'>
											Дополнительны услуги по мойке окон
										</h3>
										<div className='Calculator--content--BlockPosition--CleaningWinDop--ListDop--content'>
											{ArrayBDWindowsCleaning.map(data => (
												<ItemDop
													key={data.id}
													Text={data.text}
													id={data.id + 400}
													DopCurrentPrice={DopCurrentPrice}
													setDopCurrentPrice={setDopCurrentPrice}
													price={data.price}
													unit={data.unit}
													minW={150}
													fsH3={18}
												/>
											))}
										</div>
									</div>
								</section>
							)}
						</div>
					)}

					<button
						className='Calculator--content--BlockPosition--structure'
						onClick={() => {
							setOpenModalListCleaning(true)
						}}
					>
						Что входит в уборку ?
					</button>

					<h2 className='Calculator--content--BlockPosition--h2'>
						Выбор дополнительных опций
					</h2>
					<div className='Calculator--content--BlockPosition--DopServices'>
						{CurrentServicesSingle === 'CleaningApartment' && (
							<>
								{CurrentCatCleaning === 'Basic' &&
									ArrayDopBasic.map(data => (
										<ItemDop
											key={data.id}
											Text={data.text}
											id={data.id}
											DopCurrentPrice={DopCurrentPrice}
											setDopCurrentPrice={setDopCurrentPrice}
											price={data.price}
											unit={data.unit}
											minW={200}
											fsH3={20}
										/>
									))}
								{CurrentCatCleaning === 'General' &&
									ArrayDopGeneral.map(data => (
										<ItemDop
											key={data.id}
											Text={data.text}
											id={data.id}
											DopCurrentPrice={DopCurrentPrice}
											setDopCurrentPrice={setDopCurrentPrice}
											price={data.price}
											unit={data.unit}
											minW={200}
											fsH3={20}
										/>
									))}
								{CurrentCatCleaning === 'Repair' &&
									ArrayDopRepair.map(data => (
										<ItemDop
											key={data.id}
											Text={data.text}
											id={data.id}
											DopCurrentPrice={DopCurrentPrice}
											setDopCurrentPrice={setDopCurrentPrice}
											price={data.price}
											unit={data.unit}
											minW={200}
											fsH3={20}
										/>
									))}
							</>
						)}
						{CurrentServicesSingle === 'CleaningOffice' &&
							ArrayBDOfficeCleaning.map(data => (
								<ItemDop
									key={data.id}
									Text={data.text}
									id={data.id}
									DopCurrentPrice={DopCurrentPrice}
									setDopCurrentPrice={setDopCurrentPrice}
									price={data.price}
									unit={data.unit}
									minW={200}
									fsH3={20}
								/>
							))}
						{CurrentServicesSingle === 'CleaningWindows' &&
							ArrayBDWindowsCleaning.map(data => (
								<ItemDop
									key={data.id}
									Text={data.text}
									id={data.id}
									DopCurrentPrice={DopCurrentPrice}
									setDopCurrentPrice={setDopCurrentPrice}
									price={data.price}
									unit={data.unit}
									minW={200}
									fsH3={20}
								/>
							))}
					</div>
				</div>
				{CurrentServicesSingle === 'CleaningApartment' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						PriceQuadrature={PriceRootApartment}
						DopCurrentPrice={DopCurrentPrice}
						setDopCurrentPrice={setDopCurrentPrice}
						MinimumPrice={MinPriceCleaningApartment}
						C_Windows={C_Windows}
					/>
				)}
				{CurrentServicesSingle === 'CleaningOffice' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						PriceQuadrature={PriceQuadratureOffice}
						DopCurrentPrice={DopCurrentPrice}
						setDopCurrentPrice={setDopCurrentPrice}
						MinimumPrice={MinPriceOffice}
						C_Windows={C_Windows}
					/>
				)}
				{CurrentServicesSingle === 'CleaningWindows' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						PriceQuadrature={DoorPriceWindows}
						DopCurrentPrice={DopCurrentPrice}
						setDopCurrentPrice={setDopCurrentPrice}
						C_Windows={C_Windows}
						MinimumPrice={MinPriceWindows}
					/>
				)}
			</div>

			<ModalWindowsListCleaning
				OpenModalListCleaning={OpenModalListCleaning}
				setOpenModalListCleaning={setOpenModalListCleaning}
				CurrentServicesSingle={CurrentServicesSingle}
				CurrentCatCleaning={CurrentCatCleaning}
			/>
		</div>
	)
}

export default Calculator
