import axios from 'axios'
import { useEffect, useState } from 'react'
import {
	CatCleaning,
	Services,
} from '../../components/ui/SelectItems/ListSelectCleaning'
import SelectItems from '../../components/ui/SelectItems/SelectItems'
import FinalPrice from './FinalPrice'
import './StyleCalculator.scss'
import { TypePriceBD, TypeRootPrice } from './TypePrice'

const Calculator = () => {
	const [CurrentServicesSingle, setCurrentServicesSingle] = useState<string>('')
	const [CurrentCatCleaning, setCurrentCatCleaning] = useState<string>('')
	const [NumberArea, setNumberArea] = useState<number>(0)

	const [TitleWindows, setTitleWindows] = useState<string>('')

	const [CurrentPrice, setCurrentPrice] = useState<number>(0)
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

	const PlusNumberArea = () => {
		setNumberArea(NumberArea + 1)
	}
	const MinusNumberArea = () => {
		setNumberArea(NumberArea - 1)
	}

	useEffect(() => {
		async function BdPrice() {
			axios
				.get<TypePriceBD[]>('/PriceCleaning')
				.then(res => setPrice(res.data))
				.catch(err => console.log(err))
		}
		BdPrice()
	}, [setPrice])

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

	useEffect(() => {
		NumberArea == 0 && setNumberArea(1)
	}, [NumberArea])

	useEffect(() => {
		CurrentServicesSingle != 'CleaningApartment' && setCurrentCatCleaning('')
		setPriceRootApartment(0)
		CurrentServicesSingle == 'CleaningWindows' && setNumberArea(1)
	}, [CurrentServicesSingle])

	useEffect(() => {
		NumberArea == 1 && setTitleWindows('створка')
		NumberArea > 1 && setTitleWindows('створки')
		NumberArea >= 5 && setTitleWindows('створок')
	}, [NumberArea])

	useEffect(() => {
		CurrentServicesSingle == 'CleaningOffice' &&
			setCurrentPrice(
				NumberArea > 30
					? (NumberArea - 29) * PriceQuadratureOffice
					: PriceQuadratureOffice
			)
		CurrentServicesSingle == 'CleaningWindows' &&
			setCurrentPrice(NumberArea * DoorPriceWindows)
		CurrentServicesSingle == 'CleaningApartment' &&
			PriceCleaningApartment_DOP.map(data => {
				data.Name == CurrentCatCleaning &&
					setCurrentPrice(
						NumberArea > 30 ? (NumberArea - 29) * data.price : data.price
					)
			})
	}, [NumberArea, CurrentServicesSingle, CurrentCatCleaning])

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
						<div className='Calculator--content--BlockPosition--quadrature--content'>
							<button
								className='Calculator--content--BlockPosition--quadrature--content--BTNMinus'
								onClick={() => MinusNumberArea()}
							>
								-
							</button>
							<div className='Calculator--content--BlockPosition--quadrature--content--number'>
								<input
									onChange={event => {
										setNumberArea(Number(event.target.value))
									}}
									value={NumberArea}
									type='number'
									name=''
									id=''
								/>

								{CurrentServicesSingle != 'CleaningWindows' ? (
									<p>
										m<sup>2</sup>
									</p>
								) : (
									<p>{TitleWindows}</p>
								)}
							</div>
							<button
								className='Calculator--content--BlockPosition--quadrature--content--BTNPlus'
								onClick={() => PlusNumberArea()}
							>
								+
							</button>
						</div>
					</div>

					<button className='Calculator--content--BlockPosition--structure'>
						Что входит в уборку ?
					</button>
				</div>
				{CurrentServicesSingle == 'CleaningApartment' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						minPrice={MinPriceCleaningApartment}
						PriceQuadrature={PriceRootApartment}
					/>
				)}
				{CurrentServicesSingle == 'CleaningOffice' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						minPrice={MinPriceOffice}
						PriceQuadrature={PriceQuadratureOffice}
					/>
				)}
				{CurrentServicesSingle == 'CleaningWindows' && (
					<FinalPrice
						NumberArea={NumberArea}
						CurrentPrice={CurrentPrice}
						minPrice={MinPriceWindows}
						PriceQuadrature={DoorPriceWindows}
						TitleWindows={TitleWindows}
					/>
				)}
			</div>
		</div>
	)
}

export default Calculator
