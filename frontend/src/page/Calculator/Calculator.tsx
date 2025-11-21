import axios from 'axios'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'
import TitlePage from '../../components/Title/TitlePage'
import {
	DistancePrice,
	InitialQuadrature,
} from '../../components/type/Parameter.type'
import type {
	TCategories,
	TCities,
	TCitiesDistancePrice,
	TDopCurrentPrice,
	TPriceBD,
	TRootPrice,
	TTimeCleaning,
} from '../../components/type/Services.type'
import BTNFinalPrice from '../../components/ui/BTNFinalPrice/BTNFinalPrice'
import { IconList } from '../../components/ui/IconList'
import { ErrorOrderNewt } from '../../components/ui/natificationMesseg/natificationMessag'
import NumberPlusMinus from '../../components/ui/NumberPlusMinus/NumberPlusMinus'
import {
	CatCleaning,
	Services,
} from '../../components/ui/SelectItems/ListSelectCleaning'
import SelectItems from '../../components/ui/SelectItems/SelectItems'
import { IOption } from '../../components/ui/SelectItems/TypeSelect'
import { PathParams, ROUTES } from '../../model/routes'
import FinalPrice from './FinalPrice'
import ItemDop from './ItemDop/ItemDop'
import ModalWindowsListCleaning from './ModalWindows/ModalWindowsListCleaning'
import './StyleCalculator.scss'

const Calculator = () => {
	const params = useParams<PathParams[typeof ROUTES.Calculator]>()
	const [ParamsOrder, setParamsOrder] = useState<boolean>(false)
	const [OpenModal, setOpenModal] = useState<boolean>(false)

	//Модальное окно
	const [OpenModalListCleaning, setOpenModalListCleaning] =
		useState<boolean>(false)
	//Состояния текущий значений
	const [CurrentServicesSingle, setCurrentServicesSingle] = useState<string>(
		params.NameCleaning ? params.NameCleaning : 'CleaningApartment'
	)
	const [CurrentCatCleaning, setCurrentCatCleaning] = useState<string>('Basic')
	const [NumberArea, setNumberArea] = useState<number>(0)
	//Данные по окнам
	const [DopClearWindowsState, setDopClearWindowsState] =
		useState<boolean>(false)
	const [NumWindowsDop, setNumWindowsDop] = useState<number>(0)
	const [C_Windows, setC_Windows] = useState<boolean>(false)

	//Текущий прайс по выбранным категориям
	const [CurrentPrice, setCurrentPrice] = useState<number>(0)
	const [DopCurrentPrice, setDopCurrentPrice] = useState<TDopCurrentPrice[]>([])
	const [ArrayDopWindowsCleaning, setArrayDopWindowsCleaning] = useState<
		TDopCurrentPrice[]
	>([])

	//Перечень из БД
	const [Price, setPrice] = useState<TPriceBD[]>([])
	const [MinPriceCleaningApartment, setMinPriceCleaningApartment] =
		useState<number>(0)
	const [PriceRootApartment, setPriceRootApartment] = useState<number>(0)
	const [PriceCleaningApartment_DOP, setPriceCleaningApartment_DOP] = useState<
		TRootPrice[]
	>([])
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
	//Список городов из БД
	const [ArrayCities, setArrayCities] = useState<TCities[]>([])
	const [OptionsCities, setOptionsCities] = useState<IOption[]>([])
	const [CurrentCities, setCurrentCities] = useState<string>('Kaliningrad')
	const [CurrentDistance, setCurrentDistance] = useState<
		TCitiesDistancePrice[]
	>([
		{
			Name: 'Калининград',
			Distance: 0,
			price: 0,
		},
	])

	const [ValueStreet, setValueStreet] = useState<string>('')
	const onChangeValueStreet = (street: string) => {
		setValueStreet(street)
	}

	//Наименование для одной доп услуги из мойке окон
	const [DegreeTitle, setDegreeTitle] = useState<string>('')

	//Выбор даты и времени
	const [ValueDate, setValueDate] = useState<string>('')
	const [ValueTime, setValueTime] = useState<string>('')
	const OnChangeValueDate = (date: string) => {
		setValueDate(date)
	}

	const OnChangeValueTime = (Time: string) => {
		setValueTime(Time)
	}

	//Время уборки
	const [TimeCleaning, setTimeCleaning] = useState<TTimeCleaning[]>([
		{ id: 0, quantity: 1.3 },
	])

	useEffect(() => {
		if (CurrentServicesSingle != 'CleaningWindows') {
			if (NumberArea <= 44) {
				const itemsIndex = TimeCleaning.findIndex(value => value.id === 0)
				if (itemsIndex >= 0) {
					const NewItem = {
						...TimeCleaning[itemsIndex],
						quantity: 1.3,
					}
					const newCard = TimeCleaning.slice()
					newCard.splice(itemsIndex, 1, NewItem)
					setTimeCleaning(newCard)
				}
			}
			if (NumberArea >= 45 && NumberArea < 65) {
				const itemsIndex = TimeCleaning.findIndex(value => value.id === 0)
				if (itemsIndex >= 0) {
					const NewItem = {
						...TimeCleaning[itemsIndex],
						quantity: 2.3,
					}
					const newCard = TimeCleaning.slice()
					newCard.splice(itemsIndex, 1, NewItem)
					setTimeCleaning(newCard)
				}
			}
			if (NumberArea >= 65) {
				const itemsIndex = TimeCleaning.findIndex(value => value.id === 0)
				if (itemsIndex >= 0) {
					const NewItem = {
						...TimeCleaning[itemsIndex],
						quantity: 3.3,
					}
					const newCard = TimeCleaning.slice()
					newCard.splice(itemsIndex, 1, NewItem)
					setTimeCleaning(newCard)
				}
			}
		} else {
			if (NumberArea < 5) {
				const itemsIndex = TimeCleaning.findIndex(value => value.id === 0)
				if (itemsIndex >= 0) {
					const NewItem = {
						...TimeCleaning[itemsIndex],
						quantity: 1.3,
					}
					const newCard = TimeCleaning.slice()
					newCard.splice(itemsIndex, 1, NewItem)
					setTimeCleaning(newCard)
				}
			}
			if (NumberArea >= 5) {
				const itemsIndex = TimeCleaning.findIndex(value => value.id === 0)
				if (itemsIndex >= 0) {
					const NewItem = {
						...TimeCleaning[itemsIndex],
						quantity: 2.3,
					}
					const newCard = TimeCleaning.slice()
					newCard.splice(itemsIndex, 1, NewItem)
					setTimeCleaning(newCard)
				}
			}
			if (NumberArea >= 10) {
				const itemsIndex = TimeCleaning.findIndex(value => value.id === 0)
				if (itemsIndex >= 0) {
					const NewItem = {
						...TimeCleaning[itemsIndex],
						quantity: 3.3,
					}
					const newCard = TimeCleaning.slice()
					newCard.splice(itemsIndex, 1, NewItem)
					setTimeCleaning(newCard)
				}
			}
		}
	}, [NumberArea, CurrentServicesSingle])

	useEffect(() => {
		if (DopCurrentPrice.length > 0) {
			const itemsIndex = TimeCleaning.findIndex(value => value.id === 1)
			if (itemsIndex < 0) {
				setTimeCleaning(TimeCleaning => [
					...TimeCleaning,
					{ id: 1, quantity: 1 },
				])
			}
		} else {
			setTimeCleaning(TimeCleaning.filter(v => v.id !== 1))
		}
	}, [DopCurrentPrice])

	//Заголовок страницы
	useEffect(() => {
		if (params.Title) {
			if (params.Title === 'Calculation') {
				setParamsOrder(false)
			}
			if (params.Title === 'Order') {
				setParamsOrder(true)
			}
		}
	}, [params.Title])

	//Выгрузка данных из БД
	const ArrayBDPrice = async () => {
		await axios
			.get<TPriceBD[]>('/PriceCleaning')
			.then(res => setPrice(res.data))
			.catch(err => console.log(err))
	}
	useEffect(() => {
		ArrayBDPrice()
	}, [setPrice])

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

	//Выгрузка городов из БД

	const FCities = async () => {
		await axios
			.get<TCities[]>('/Cities')
			.then(res => {
				setArrayCities(res.data)
			})
			.catch(err => console.log(err))
	}
	const CitiesOptions = () => {
		ArrayCities.map(data => {
			setOptionsCities(OptionsCities => [
				...OptionsCities,
				{ value: data.Name_EN, label: data.Name },
			])
		})
	}
	useEffect(() => {
		CitiesOptions()
	}, [ArrayCities])
	useEffect(() => {
		FCities()
	}, [setArrayCities])

	useEffect(() => {
		ArrayCities.map(data => {
			if (data.Name_EN === CurrentCities) {
				setCurrentDistance([
					{
						Name: data.Name,
						Distance: data.Distance,
						price: data.Distance * DistancePrice.Price,
					},
				])
			}
		})
	}, [CurrentCities])

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
		setArrayDopWindowsCleaning([])
		setCurrentDistance([
			{
				Name: 'Калининград',
				Distance: 0,
				price: 0,
			},
		])
		setCurrentCities('Kaliningrad')
		setTimeCleaning([{ id: 0, quantity: 1.3 }])
	}

	const OnClickInputWindows = () => {
		if (DopClearWindowsState === false) {
			setDopClearWindowsState(true)
			setArrayDopWindowsCleaning(ArrayDopWindowsCleaning => [
				...ArrayDopWindowsCleaning,
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
			setArrayDopWindowsCleaning([])
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

	//Нажатие кнопки продолжить
	const OnClickNext = () => {
		if (!FunctionValidNext()) {
		} else {
			setOpenModal(true)
		}
	}

	const FunctionValidNext = () => {
		if (!ValueDate || !ValueTime || !ValueStreet) {
			if (!ValueDate) {
				ErrorOrderNewt('Дата')
				FunctionValidField(setErrorDateValue, 'Red')
			} else {
				FunctionValidField(setErrorDateValue, '#cccccc')
			}
			if (!ValueTime) {
				ErrorOrderNewt('Время')
				FunctionValidField(setErrorTimeValue, 'Red')
			} else {
				FunctionValidField(setErrorTimeValue, '#cccccc')
			}
			if (!ValueStreet) {
				ErrorOrderNewt('Улица')
				FunctionValidField(setErrorStreetValue, 'Red')
			} else {
				FunctionValidField(setErrorStreetValue, '#cccccc')
			}
			return false
		} else {
			FunctionValidField(setErrorDateValue, '#cccccc')
			FunctionValidField(setErrorTimeValue, '#cccccc')
			FunctionValidField(setErrorStreetValue, '#cccccc')
			return true
		}
	}

	const [ErrorStreetValue, setErrorStreetValue] = useState<
		React.CSSProperties | undefined
	>()
	const [ErrorDateValue, setErrorDateValue] = useState<
		React.CSSProperties | undefined
	>()
	const [ErrorTimeValue, setErrorTimeValue] = useState<
		React.CSSProperties | undefined
	>()

	const FunctionValidField = (
		setDate: Dispatch<SetStateAction<React.CSSProperties | undefined>>,
		Color: string
	) => {
		setDate({
			border: `1px solid ${Color}`,
		})
	}

	return (
		<div className='Calculator'>
			<HeaderMenu The_Background={true} />
			<TitlePage Title={!ParamsOrder ? 'Калькулятор' : 'Оформление заказа'} />
			<h1 className='Calculator--h1'>
				{ParamsOrder
					? 'Оформление заказа на уборку'
					: 'Рассчитать стоимость уборки'}
			</h1>
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
							isSearch={false}
						/>
					</div>
					{CurrentServicesSingle === 'CleaningApartment' && (
						<div className='Calculator--content--BlockPosition--CatServices'>
							<h2>Тип уборки</h2>
							<SelectItems
								options={CatCleaning}
								CurrentServicesSingle={CurrentCatCleaning}
								setCurrentServicesSingle={setCurrentCatCleaning}
								Placeholder={'Выберите вид уборки'}
								isMulti={false}
								CalculatorPriceAndQuantity={CalculatorPriceAndQuantity}
								isSearch={false}
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
						{CurrentServicesSingle !== 'CleaningWindows' && (
							<p>
								<span>{IconList.Warning}</span> До 30 m<sup>2</sup> бесплатно,
								далее цена зависит и выбранной услуги или типа уборки
							</p>
						)}
					</div>
					<div className='Calculator--content--BlockPosition--Cities'>
						<h2>Ваш адрес</h2>
						<div className='Calculator--content--BlockPosition--Cities--content'>
							<div className='Calculator--content--BlockPosition--Cities--content--SelectCities'>
								<SelectItems
									options={OptionsCities}
									CurrentServicesSingle={CurrentCities}
									setCurrentServicesSingle={setCurrentCities}
									Placeholder={'Выберите ваш город'}
									isMulti={false}
									CalculatorPriceAndQuantity={CalculatorPriceAndQuantity}
									isSearch={true}
								/>
								<p>
									<span>{IconList.Warning}</span>В черте города Калининград
									бесплатно, для других городов области транспортные расходы
									составляют <br /> 25₽ за 1 км
								</p>
							</div>
							<div className='Calculator--content--BlockPosition--Cities--content--street'>
								<input
									type='text'
									onChange={event => onChangeValueStreet(event.target.value)}
									value={ValueStreet}
									name=''
									id=''
									placeholder='улица / дом / квартира'
									style={ErrorStreetValue}
								/>
							</div>
						</div>
					</div>
					{ParamsOrder && (
						<div className='Calculator--content--BlockPosition--Date'>
							<h2>Выберите удобную для вас дату и время</h2>
							<input
								type='date'
								name=''
								id=''
								onChange={event => OnChangeValueDate(event.target.value)}
								value={ValueDate}
								style={ErrorDateValue}
							/>
							<input
								type='time'
								name=''
								id=''
								onChange={event => OnChangeValueTime(event.target.value)}
								value={ValueTime}
								style={ErrorTimeValue}
							/>
						</div>
					)}
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
										DopCurrentPrice={ArrayDopWindowsCleaning}
										setDopCurrentPrice={setArrayDopWindowsCleaning}
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
													DopCurrentPrice={ArrayDopWindowsCleaning}
													setDopCurrentPrice={setArrayDopWindowsCleaning}
													price={data.price}
													unit={data.unit}
													minW={150}
													fsH3={18}
													setDegreeTitle={setDegreeTitle}
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
									setDegreeTitle={setDegreeTitle}
								/>
							))}
					</div>
				</div>
				<div className='Calculator--content--BlockResult'>
					{CurrentServicesSingle === 'CleaningApartment' && (
						<FinalPrice
							NumberArea={NumberArea}
							CurrentPrice={CurrentPrice}
							PriceQuadrature={PriceRootApartment}
							DopCurrentPrice={DopCurrentPrice}
							setDopCurrentPrice={setDopCurrentPrice}
							MinimumPrice={MinPriceCleaningApartment}
							C_Windows={C_Windows}
							ArrayIdDopWindows={ArrayDopWindowsCleaning}
							DegreeTitle={DegreeTitle}
							CurrentDistance={CurrentDistance}
							TimeCleaning={TimeCleaning}
							OpenModal={OpenModal}
							setOpenModal={setOpenModal}
							CurrentServices={CurrentServicesSingle}
							CurrentCatCleaning={CurrentCatCleaning}
							Date={ValueDate}
							Time={ValueTime}
							ValueStreet={ValueStreet}
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
							ArrayIdDopWindows={ArrayDopWindowsCleaning}
							DegreeTitle={DegreeTitle}
							CurrentDistance={CurrentDistance}
							TimeCleaning={TimeCleaning}
							OpenModal={OpenModal}
							setOpenModal={setOpenModal}
							CurrentServices={CurrentServicesSingle}
							CurrentCatCleaning={CurrentCatCleaning}
							Date={ValueDate}
							Time={ValueTime}
							ValueStreet={ValueStreet}
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
							DegreeTitle={DegreeTitle}
							CurrentDistance={CurrentDistance}
							TimeCleaning={TimeCleaning}
							OpenModal={OpenModal}
							setOpenModal={setOpenModal}
							CurrentServices={CurrentServicesSingle}
							CurrentCatCleaning={CurrentCatCleaning}
							Date={ValueDate}
							Time={ValueTime}
							ValueStreet={ValueStreet}
						/>
					)}
					<BTNFinalPrice
						Text={`${ParamsOrder ? 'Продолжить' : 'Перейти к оформлению'}`}
						FunctionOnClick={() => {
							if (ParamsOrder) {
								OnClickNext()
							} else {
								setParamsOrder(true)
							}
						}}
						Links={`${`/Calculator/${CurrentServicesSingle}/Order`}`}
					/>
				</div>
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
