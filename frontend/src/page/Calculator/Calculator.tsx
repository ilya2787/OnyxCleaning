import axios from 'axios'
import { useEffect, useState } from 'react'
import NumberPlusMinus from '../../components/ui/NumberPlusMinus/NumberPlusMinus'
import {
	CatCleaning,
	Services,
} from '../../components/ui/SelectItems/ListSelectCleaning'
import SelectItems from '../../components/ui/SelectItems/SelectItems'
import FinalPrice from './FinalPrice'
import './StyleCalculator.scss'
import { InitialQuadrature, TypePriceBD, TypeRootPrice } from './TypePrice'

const Calculator = () => {
	//Состояния текущий значений
	const [CurrentServicesSingle, setCurrentServicesSingle] = useState<string>('')
	const [CurrentCatCleaning, setCurrentCatCleaning] = useState<string>('')
	const [NumberArea, setNumberArea] = useState<number>(0)
	//Наименование "Створок"
	const [TitleWindows, setTitleWindows] = useState<string>('')
	const [DopClearWindowsSost, setDopClearWindowsSost] = useState<boolean>(false)
	const [NumWindowsDop, setNumWindowsDop] = useState<number>(0)

	//Текущий прайс по выбранным категориям
	const [CurrentPrice, setCurrentPrice] = useState<number>(0)
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
		CurrentServicesSingle != 'CleaningApartment' && setCurrentCatCleaning('')
		setPriceRootApartment(0)
		CurrentServicesSingle == 'CleaningWindows' && setNumberArea(1)
		setNumWindowsDop(1)
		CurrentServicesSingle != 'CleaningWindows' && setTitleWindows('')
	}, [CurrentServicesSingle])
	//Склонение наименования створка
	useEffect(() => {
		NumberArea == 1 && setTitleWindows('створка')
		NumberArea > 1 && setTitleWindows('створки')
		NumberArea >= 5 && setTitleWindows('створок')
	}, [NumberArea, CurrentServicesSingle])
	const OnClickInputWindows = () => {
		if (DopClearWindowsSost === false) {
			setDopClearWindowsSost(true)
		} else {
			setDopClearWindowsSost(false)
		}
	}

	//Производимые расчеты количества на сумму из БД
	useEffect(() => {
		if (NumberArea > InitialQuadrature.Quantity) {
			if (CurrentServicesSingle == 'CleaningOffice') {
				setCurrentPrice(
					(NumberArea - InitialQuadrature.Quantity) * PriceQuadratureOffice +
						MinPriceOffice
				)
			}
			if (CurrentServicesSingle == 'CleaningApartment') {
				PriceCleaningApartment_DOP.map(data => {
					data.Name == CurrentCatCleaning &&
						setCurrentPrice(
							(NumberArea - InitialQuadrature.Quantity) * data.price +
								MinPriceCleaningApartment
						)
				})
			}
		} else {
			if (CurrentServicesSingle == 'CleaningOffice') {
				setCurrentPrice(MinPriceOffice)
			}
			if (CurrentServicesSingle == 'CleaningApartment') {
				setCurrentPrice(MinPriceCleaningApartment)
			}
		}

		if (CurrentServicesSingle == 'CleaningWindows') {
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
			data.Name == CurrentCatCleaning && setPriceRootApartment(data.price)
		})
	}, [PriceCleaningApartment_DOP, CurrentCatCleaning])
	return (
		<div className='Calculator'>
			<h1>Рассчитать стоимость уборки</h1>
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
					{CurrentServicesSingle == 'CleaningApartment' && (
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
							{CurrentServicesSingle != 'CleaningWindows'
								? 'Квадратура помещения'
								: 'Количество створок'}
						</h2>
						<NumberPlusMinus
							CurrentServicesSingle={CurrentServicesSingle}
							TitleWindows={TitleWindows}
							Num={NumberArea}
							setNum={setNumberArea}
						/>
					</div>

					{CurrentServicesSingle != 'CleaningWindows' && (
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
									TitleWindows={TitleWindows}
									Num={NumWindowsDop}
									setNum={setNumWindowsDop}
								/>
							)}
						</div>
					)}

					<button className='Calculator--content--BlockPosition--structure'>
						Что входит в уборку ?
					</button>
				</div>
				{CurrentServicesSingle == 'CleaningApartment' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						PriceQuadrature={PriceRootApartment}
					/>
				)}
				{CurrentServicesSingle == 'CleaningOffice' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						PriceQuadrature={PriceQuadratureOffice}
					/>
				)}
				{CurrentServicesSingle == 'CleaningWindows' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						PriceQuadrature={DoorPriceWindows}
						TitleWindows={TitleWindows}
					/>
				)}
			</div>
		</div>
	)
}

export default Calculator
