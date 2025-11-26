import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { InitialQuadrature } from '../../components/type/Parameter.type'
import {
	TCitiesDistancePrice,
	TDopCurrentPrice,
	TTimeCleaning,
} from '../../components/type/Services.type'
import ModalWindows from '../../components/ui/ModalWindows/ModalWindows'
import { PriceFormat } from '../../components/ui/PriceFormat/PriceFormat'
import {
	CatCleaning,
	Services,
} from '../../components/ui/SelectItems/ListSelectCleaning'

interface TypeProps {
	NumberArea: number
	CurrentPrice: number
	PriceQuadrature: number
	C_Windows?: boolean
	DopCurrentPrice?: TDopCurrentPrice[]
	setDopCurrentPrice?: Dispatch<SetStateAction<TDopCurrentPrice[]>>
	MinimumPrice: number
	ArrayIdDopWindows?: TDopCurrentPrice[]
	DegreeTitle: string
	CurrentDistance?: TCitiesDistancePrice[]
	TimeCleaning: TTimeCleaning[]
	OpenModal: boolean
	setOpenModal: Dispatch<SetStateAction<boolean>>
	CurrentServices: string
	CurrentCatCleaning: string
	Date: string
	Time: string
	ValueStreet: string
	ValueName: string
	ValueTel: string
}

const FinalPrice: FC<TypeProps> = ({
	NumberArea,
	CurrentPrice,
	PriceQuadrature,
	C_Windows,
	DopCurrentPrice,
	ArrayIdDopWindows,
	MinimumPrice,
	DegreeTitle,
	CurrentDistance,
	TimeCleaning,
	OpenModal,
	setOpenModal,
	CurrentServices,
	CurrentCatCleaning,
	Date,
	Time,
	ValueStreet,
	ValueName,
	ValueTel,
}) => {
	const [PriceQuadratureNew, setPriceQuadratureNew] = useState<number>(0)
	const [FinalPrice, setFinalPrice] = useState<number>(CurrentPrice)
	const [TitleWindows, setTitleWindows] = useState<string>('')
	const [FinalTimeCleaning, setFinalTimeCleaning] = useState<number>(0)
	useEffect(() => {
		if (C_Windows === false) {
			if (NumberArea > InitialQuadrature.Quantity) {
				setPriceQuadratureNew(
					(NumberArea - InitialQuadrature.Quantity) * PriceQuadrature
				)
			} else {
				setPriceQuadratureNew(0)
			}
		} else {
			if (NumberArea > 1) {
				setPriceQuadratureNew((NumberArea - 1) * PriceQuadrature)
			} else {
				setPriceQuadratureNew(0)
			}
		}
	}, [NumberArea, PriceQuadrature, C_Windows])

	useEffect(() => {
		if (DopCurrentPrice && CurrentDistance) {
			if (ArrayIdDopWindows) {
				setFinalPrice(
					CurrentPrice +
						DopCurrentPrice?.reduce(
							(a, v) => a + (v.quantity - 1) * v.price + v.MinPrice,
							0
						) +
						ArrayIdDopWindows?.reduce(
							(a, v) => a + (v.quantity - 1) * v.price + v.MinPrice,
							0
						) +
						CurrentDistance?.reduce((a, v) => a + v.price, 0)
				)
			} else {
				setFinalPrice(
					CurrentPrice +
						DopCurrentPrice?.reduce(
							(a, v) => a + (v.quantity - 1) * v.price + v.MinPrice,
							0
						) +
						CurrentDistance?.reduce((a, v) => a + v.price, 0)
				)
			}
		} else {
			setFinalPrice(CurrentPrice)
		}
	}, [DopCurrentPrice, CurrentPrice, CurrentDistance, ArrayIdDopWindows])

	useEffect(() => {
		NumberArea === 1 && setTitleWindows('створка')
		NumberArea > 1 && setTitleWindows('створки')
		NumberArea >= 5 && setTitleWindows('створок')
	}, [NumberArea])

	useEffect(() => {
		setFinalTimeCleaning(TimeCleaning?.reduce((a, v) => a + v.quantity, 0))
	}, [TimeCleaning])

	const SearchUnit = (unit: string, quantity: number) => {
		let SymbolSearchUnit = unit.indexOf('степени')
		if (SymbolSearchUnit >= 0) {
			return DegreeTitle
		} else {
			return quantity
		}
	}

	return (
		<div className='Calculator--content--BlockResult--item'>
			<div className='Calculator--content--BlockResult--item--FinalPriceMobile'>
				<p>К оплате: {PriceFormat(FinalPrice)}</p>
			</div>

			<div className='Calculator--content--BlockResult--item--MinimumPrice'>
				<p>Минимальная стоимость</p>
				<div className='Calculator--content--BlockResult--item--MinimumPrice--price'>
					{PriceFormat(MinimumPrice)}
				</div>
			</div>
			{PriceQuadrature ? (
				<div className='Calculator--content--BlockResult--item--quadrature'>
					<p>
						{NumberArea}
						<span>
							{C_Windows ? (
								TitleWindows
							) : (
								<>
									m<sup>2</sup>
								</>
							)}
						</span>
					</p>
					<div className='Calculator--content--BlockResult--item--quadrature--price'>
						<p>{PriceFormat(PriceQuadratureNew)}</p>
					</div>
				</div>
			) : null}
			{CurrentDistance &&
				CurrentDistance.map((data, i) => (
					<div
						key={i}
						className='Calculator--content--BlockResult--item--Distance'
					>
						<p>{data.Name}</p>
						<div className='Calculator--content--BlockResult--item--Distance--distance'>
							{data.Distance > 0 ? <p>Расстояния: {data.Distance} км.</p> : ''}
						</div>
						<div className='Calculator--content--BlockResult--item--Distance--price'>
							{data.price ? PriceFormat(data.price) : 'Бесплатно'}
						</div>
					</div>
				))}
			{ArrayIdDopWindows && ArrayIdDopWindows.length > 0 && (
				<div className='Calculator--content--BlockResult--item--DopServices'>
					<h2>Услуги по мойке окон</h2>
					{ArrayIdDopWindows.map((data, i) => (
						<div
							key={i}
							className='Calculator--content--BlockResult--item--DopServices--item'
						>
							<div className='Calculator--content--BlockResult--item--DopServices--item--text'>
								<p>{data.value}</p>
								<p>
									{data.unit &&
										`${data.unit} x ${SearchUnit(data.unit, data.quantity)}`}
								</p>
							</div>
							<div className='Calculator--content--BlockResult--item--DopServices--item--price'>
								{PriceFormat(
									data.FinalPriceDop ? data.FinalPriceDop : data.MinPrice
								)}
							</div>
						</div>
					))}
				</div>
			)}
			{DopCurrentPrice && DopCurrentPrice.length > 0 && (
				<div className='Calculator--content--BlockResult--item--DopServices'>
					<h2>Дополнительные услуги</h2>
					{DopCurrentPrice.map((data, i) => (
						<div
							key={i}
							className='Calculator--content--BlockResult--item--DopServices--item'
						>
							<div className='Calculator--content--BlockResult--item--DopServices--item--text'>
								<p>{data.value}</p>
								<p>{data.unit && `${data.unit} x ${data.quantity}`}</p>
							</div>
							<div className='Calculator--content--BlockResult--item--DopServices--item--price'>
								{PriceFormat(
									data.FinalPriceDop ? data.FinalPriceDop : data.MinPrice
								)}
							</div>
						</div>
					))}
				</div>
			)}

			<div className='Calculator--content--BlockResult--item--FinalPrice'>
				<h2>К оплате</h2>
				<p>{PriceFormat(FinalPrice)}</p>
			</div>
			<div className='Calculator--content--BlockResult--item--TimeCleaning'>
				<p>Примерное время уборки:</p>
				<p>{FinalTimeCleaning} часа</p>
			</div>

			<ModalWindows
				Title='Давайте проверим ваш заказ'
				modalIsOpen={OpenModal}
				onClose={() => setOpenModal(false)}
			>
				<div className='Calculator--content--BlockResult--item--ModalOrder'>
					<div className='Calculator--content--BlockResult--item--ModalOrder--BlockMain'>
						<section className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--Services'>
							<p>Выбранная услуга:</p>
							{Services.map(
								(data, i) =>
									data.value === CurrentServices && <p key={i}>{data.label}</p>
							)}
						</section>
						<section className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--CatServices'>
							{CurrentCatCleaning &&
								CatCleaning.map(
									(data, i) =>
										data.value === CurrentCatCleaning && (
											<div
												key={i}
												className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--CatServices--item'
											>
												<p>Вид уборки:</p>
												<p>{data.label}</p>
											</div>
										)
								)}
						</section>
						<section className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--MinPrice'>
							<p>Минимальная сумма заказа: </p>
							<p>{PriceFormat(MinimumPrice)}</p>
						</section>
						<section className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--Quadrature'>
							<p>
								{C_Windows ? 'Количество створок :' : 'Квадратура : '}
								{NumberArea}
								<span>
									{C_Windows ? (
										''
									) : (
										<>
											m<sup>2</sup>
										</>
									)}
								</span>
							</p>
							<p>{PriceFormat(PriceQuadratureNew)}</p>
						</section>
						<section className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--DateUser'>
							<p>Имя:</p>
							<p> {ValueName} </p>
							<p>Телефон: </p>
							<p>{ValueTel}</p>
						</section>
						<section className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--DateAndTime'>
							<p>Дата / Время : </p>
							<p>
								{Date} / {Time}
							</p>
						</section>
						<section className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--Cites'>
							<h2>Адрес</h2>
							{CurrentDistance?.map((data, i) => (
								<div
									key={i}
									className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--Cites--item'
								>
									<div className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--Cites--item--inform'>
										<p>
											Город: {data.Name} <br />
											Улица: {ValueStreet}
										</p>
										{data.Distance > 0 ? (
											<p>Расстояния: {data.Distance} км.</p>
										) : (
											''
										)}
									</div>
									<p className='Calculator--content--BlockResult--item--ModalOrder--BlockMain--Cites--item--price'>
										{data.price ? PriceFormat(data.price) : 'Бесплатно'}
									</p>
								</div>
							))}
						</section>
					</div>
					<div className='Calculator--content--BlockResult--item--ModalOrder--BlockDop'>
						<h2>Выбранные дополнительные услуги</h2>
						{DopCurrentPrice &&
							DopCurrentPrice.map((data, i) => (
								<div
									key={i}
									className='Calculator--content--BlockResult--item--ModalOrder--BlockDop--item'
								>
									<div className='Calculator--content--BlockResult--item--ModalOrder--BlockDop--item--inform'>
										<p>{data.value}</p>
										<p>{data.unit && `${data.unit} x ${data.quantity}`}</p>
									</div>
									<p>
										{PriceFormat(
											data.FinalPriceDop ? data.FinalPriceDop : data.MinPrice
										)}
									</p>
								</div>
							))}
						{ArrayIdDopWindows &&
							ArrayIdDopWindows.map((data, i) => (
								<div
									key={i}
									className='Calculator--content--BlockResult--item--ModalOrder--BlockDop--item'
								>
									<div className='Calculator--content--BlockResult--item--ModalOrder--BlockDop--item--inform'>
										<p>{data.value}</p>
										<p>
											{data.unit &&
												`${data.unit} x ${SearchUnit(
													data.unit,
													data.quantity
												)}`}
										</p>
									</div>
									<p>
										{PriceFormat(
											data.FinalPriceDop ? data.FinalPriceDop : data.MinPrice
										)}
									</p>
								</div>
							))}
						{DopCurrentPrice &&
							DopCurrentPrice?.length <= 0 &&
							ArrayIdDopWindows &&
							ArrayIdDopWindows?.length <= 0 && (
								<h3>Нет необходимости в дополнительных услугах</h3>
							)}
					</div>
					<div className='Calculator--content--BlockResult--item--ModalOrder--TimeCleaning'>
						<p>Примерное время уборки: </p>
						<p>{FinalTimeCleaning} часа</p>
					</div>
					<div className='Calculator--content--BlockResult--item--ModalOrder--FinalPrice'>
						<h2>Общая сумма заказа</h2>
						<p>{PriceFormat(FinalPrice)}</p>
					</div>
					<div className='Calculator--content--BlockResult--item--ModalOrder--BTN'>
						<button onClick={() => setOpenModal(false)}>Изменить</button>
						<button>Отправить</button>
					</div>
				</div>
			</ModalWindows>
		</div>
	)
}

export default FinalPrice
