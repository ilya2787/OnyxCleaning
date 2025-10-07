import axios from 'axios'
import { useEffect, useState } from 'react'
import NumberPlusMinus from '../../components/ui/NumberPlusMinus/NumberPlusMinus'
import {
	CatCleaning,
	Services,
} from '../../components/ui/SelectItems/ListSelectCleaning'
import SelectItems from '../../components/ui/SelectItems/SelectItems'
import FinalPrice from './FinalPrice'
import ModalWindowsListCleaning from './ModalWindows/ModalWindowsListCleaning'
import './StyleCalculator.scss'
import {
	InitialQuadrature,
	TypeDopPrice,
	TypePriceBD,
	TypeRootPrice,
} from './TypePrice'

const Calculator = () => {
	//Модальное окно
	const [OpenModalListCleaning, setOpenModalListCleaning] =
		useState<boolean>(false)
	//Состояния текущий значений
	const [CurrentServicesSingle, setCurrentServicesSingle] = useState<string>('')
	const [CurrentCatCleaning, setCurrentCatCleaning] = useState<string>('')
	const [NumberArea, setNumberArea] = useState<number>(0)
	//Наименование "Створок"
	const [DopClearWindowsSost, setDopClearWindowsSost] = useState<boolean>(false)
	const [NumWindowsDop, setNumWindowsDop] = useState<number>(0)
	const [C_Windows, setC_Windows] = useState<boolean>(false)

	//Текущий прайс по выбранным категориям
	const [CurrentPrice, setCurrentPrice] = useState<number>(0)
	const [DopCurrentPrice, setDopCurrentPrice] = useState<TypeDopPrice[]>([])

	//Прайс из БД по позициям сервиса
	const [Price, setPrice] = useState<TypePriceBD[]>([])
	const [MinPriceCleaningApartment, setMinPriceCleaningApartment] =
		useState<number>(0)
	const [PriceCleaningApartment_DOP, setPriceCleaningApartment_DOP] = useState<
		TypeRootPrice[]
	>([])
	const [PriceRootApartment, setPriceRootApartment] = useState<number>(0)
	const [MinPriceOffice, setMinPriceOffice] = useState<number>(0)
	const [PriceQuadratureOffice, setPriceQuadratureOffice] = useState<number>(0)
	const [MinPriceWindows, setMinPriceWindows] = useState<number>(0)
	const [DoorPriceWindows, setDoorPriceWindows] = useState<number>(0)

	//Выгрузка прайса из БД
	useEffect(() => {
		async function BdPrice() {
			axios
				.get<TypePriceBD[]>('/PriceCleaning')
				.then(res => setPrice(res.data))
				.catch(err => console.log(err))
		}
		BdPrice()
	}, [setPrice])
	//Распредиление цен по позициям сервиса
	useEffect(() => {
		Price.map(data => {
			data.Name === 'CleaningApartment' &&
				setMinPriceCleaningApartment(data.MinPrice)
			data.Name === 'Basic' &&
				setPriceCleaningApartment_DOP(PriceCleaningApartment_DOP => [
					...PriceCleaningApartment_DOP,
					{ Name: data.Name, price: data.Price },
				])
			data.Name === 'General' &&
				setPriceCleaningApartment_DOP(PriceCleaningApartment_DOP => [
					...PriceCleaningApartment_DOP,
					{ Name: data.Name, price: data.Price },
				])
			data.Name === 'Repair' &&
				setPriceCleaningApartment_DOP(PriceCleaningApartment_DOP => [
					...PriceCleaningApartment_DOP,
					{ Name: data.Name, price: data.Price },
				])
			data.Name === 'CleaningOffice' && setMinPriceOffice(data.MinPrice)
			data.Name === 'OfficeQuadrature' && setPriceQuadratureOffice(data.Price)
			data.Name === 'CleaningWindows' && setMinPriceWindows(data.MinPrice)
			data.Name === 'Door' && setDoorPriceWindows(data.Price)
		})
	}, [Price])

	//Отчистка позиций
	useEffect(() => {
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
	}, [CurrentServicesSingle])
	//Склонение наименования створка

	const OnClickInputWindows = () => {
		if (DopClearWindowsSost === false) {
			setDopClearWindowsSost(true)
			setDopCurrentPrice(DopCurrentPrice => [
				...DopCurrentPrice,
				{
					id: 999,
					title: 'DopCleaningWindows_minPrice',
					value: 'Мойка окон',
					quantity: 1,
					unit: 'Створок',
					price: DoorPriceWindows,
					minPrice: MinPriceWindows,
				},
			])
		} else {
			setDopClearWindowsSost(false)
			DeleteItemDop(999)
			setNumWindowsDop(1)
		}
	}

	//Обновление данных по списке допов
	const DeleteItemDop = (id: number) => {
		const NewList = DopCurrentPrice.filter(item => item.id !== id)
		setDopCurrentPrice(NewList)
	}

	//Производимые расчеты количества на сумму из БД
	useEffect(() => {
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
	}, [NumberArea, CurrentServicesSingle, CurrentCatCleaning])

	//Присвоение цены за квадратный метр (Категория уборки квартир)
	useEffect(() => {
		PriceCleaningApartment_DOP.map(data => {
			data.Name === CurrentCatCleaning && setPriceRootApartment(data.price)
		})
	}, [PriceCleaningApartment_DOP, CurrentCatCleaning])

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
									checked={DopClearWindowsSost}
								/>
								<label htmlFor='CheckboxWindows'>Необходима мойка окон</label>
							</div>
							{DopClearWindowsSost && (
								<NumberPlusMinus
									CurrentServicesSingle='CleaningWindows'
									Num={NumWindowsDop}
									setNum={setNumWindowsDop}
									id={999}
									DopCurrentPrice={DopCurrentPrice}
									setDopCurrentPrice={setDopCurrentPrice}
									priceItem={DoorPriceWindows}
								/>
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
				</div>
				{CurrentServicesSingle === 'CleaningApartment' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						PriceQuadrature={PriceRootApartment}
						DopCurrentPrice={DopCurrentPrice}
						MinemumPrice={MinPriceCleaningApartment}
						C_Windows={C_Windows}
					/>
				)}
				{CurrentServicesSingle === 'CleaningOffice' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						PriceQuadrature={PriceQuadratureOffice}
						DopCurrentPrice={DopCurrentPrice}
						MinemumPrice={MinPriceOffice}
						C_Windows={C_Windows}
					/>
				)}
				{CurrentServicesSingle === 'CleaningWindows' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						PriceQuadrature={DoorPriceWindows}
						C_Windows={C_Windows}
						MinemumPrice={MinPriceWindows}
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
