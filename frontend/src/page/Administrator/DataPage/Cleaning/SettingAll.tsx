import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {
	TCitiesDistancePrice,
	TParametersBD,
	TPriceBD,
} from '../../../../components/type/Services.type'
import { ROUTES } from '../../../../model/routes'
import CitiesItem from './SettingItem/SettingCitiesItem'
import MinimalPrice from './SettingItem/SettingMinPrice'
import SettingParamItem from './SettingItem/SettingParamItem'

const SettingAll = () => {
	const [AllPriceSetting, setAllPriceSetting] = useState<TPriceBD[]>([])
	const [Parameters, setParameters] = useState<TParametersBD[]>([])
	const [AllListCities, setAllListCities] = useState<TCitiesDistancePrice[]>([])

	useEffect(() => {
		const AllPrice = async () => {
			await axios
				.get<TPriceBD[]>(`${process.env.REACT_APP_SERVER}/PriceCleaning`)
				.then(res => setAllPriceSetting(res.data))
				.catch(err => console.log(err))
		}
		AllPrice()
	}, [setAllPriceSetting])

	useEffect(() => {
		const AllParam = async () => {
			await axios
				.get<TParametersBD[]>(`${process.env.REACT_APP_SERVER}/Parameters`)
				.then(res => setParameters(res.data))
				.catch(err => console.log(err))
		}
		AllParam()
	}, [setParameters])

	useEffect(() => {
		const AllListCities = async () => {
			await axios
				.get<TCitiesDistancePrice[]>(`${process.env.REACT_APP_SERVER}/Cities`)
				.then(res => setAllListCities(res.data))
				.catch(err => console.log(err))
		}
		AllListCities()
	}, [setAllListCities])

	return (
		<div className='Setting'>
			<div className='Setting_header'>
				<Link to={ROUTES.CleaningData} className='Office_header_BackLink'>
					Назад
				</Link>
				<div className='Setting_header--title'>
					<h1>Общие параметры</h1>
				</div>
			</div>
			<div className='Setting_content'>
				<h1>Минимальные цены услуг</h1>
				<div className='Setting_content--minimalPrice'>
					<div className='Setting_content--minimalPrice--Apartment'>
						<h2>Уборка квартир и домов</h2>
						{AllPriceSetting.map((data, i) => (
							<section key={i}>
								{data.Name === 'CleaningApartment' && (
									<MinimalPrice
										Title='Основная'
										minPrice={data.MinPrice}
										id={data.id}
										AllPriceSetting={AllPriceSetting}
										setAllPriceSetting={setAllPriceSetting}
									/>
								)}
								{data.Name === 'Basic' && (
									<MinimalPrice
										Title='Базовая уборка'
										TitleItem='Цена за м2'
										minPrice={data.MinPrice}
										price={data.price}
										id={data.id}
										AllPriceSetting={AllPriceSetting}
										setAllPriceSetting={setAllPriceSetting}
									/>
								)}
								{data.Name === 'General' && (
									<MinimalPrice
										Title='Генеральная уборка'
										TitleItem='Цена за м2'
										minPrice={data.MinPrice}
										price={data.price}
										id={data.id}
										AllPriceSetting={AllPriceSetting}
										setAllPriceSetting={setAllPriceSetting}
									/>
								)}
								{data.Name === 'Repair' && (
									<MinimalPrice
										Title='Уборка после ремонта'
										TitleItem='Цена за м2'
										minPrice={data.MinPrice}
										price={data.price}
										id={data.id}
										AllPriceSetting={AllPriceSetting}
										setAllPriceSetting={setAllPriceSetting}
									/>
								)}
							</section>
						))}
					</div>
					<div className='Setting_content--minimalPrice--Office'>
						<h2>Уборка офисов</h2>
						{AllPriceSetting.map((data, i) => (
							<section key={i}>
								{data.Name === 'CleaningOffice' && (
									<MinimalPrice
										Title='Основная'
										minPrice={data.MinPrice}
										id={data.id}
										AllPriceSetting={AllPriceSetting}
										setAllPriceSetting={setAllPriceSetting}
									/>
								)}
								{data.Name === 'OfficeQuadrature' && (
									<MinimalPrice
										Title=''
										TitleItem='Цена за м2'
										price={data.price}
										id={data.id}
										AllPriceSetting={AllPriceSetting}
										setAllPriceSetting={setAllPriceSetting}
									/>
								)}
							</section>
						))}
					</div>
					<div className='Setting_content--minimalPrice--Windows'>
						<h2>Мойка окон</h2>
						{AllPriceSetting.map((data, i) => (
							<section key={i}>
								{data.Name === 'CleaningWindows' && (
									<MinimalPrice
										Title='Основная'
										minPrice={data.MinPrice}
										id={data.id}
										AllPriceSetting={AllPriceSetting}
										setAllPriceSetting={setAllPriceSetting}
									/>
								)}
								{data.Name === 'Door' && (
									<MinimalPrice
										Title=''
										TitleItem='Цена за створку'
										price={data.price}
										id={data.id}
										AllPriceSetting={AllPriceSetting}
										setAllPriceSetting={setAllPriceSetting}
									/>
								)}
							</section>
						))}
					</div>
				</div>
				<h1>Дополнительные параметры</h1>
				<div className='Setting_content--QuadratureDistance'>
					{Parameters.map(
						data =>
							data.Name === 'InitialQuadrature' && (
								<SettingParamItem
									id={data.id}
									Title={data.Name}
									value={data.Value}
									key={data.id}
									Parameters={Parameters}
									setParameters={setParameters}
								/>
							),
					)}
					{Parameters.map(
						data =>
							data.Name === 'DistancePrice' && (
								<SettingParamItem
									id={data.id}
									Title={data.Name}
									value={data.Value}
									key={data.id}
									Parameters={Parameters}
									setParameters={setParameters}
								/>
							),
					)}
				</div>
				<h1>Города выезда</h1>
				<div className='Setting_content--CitiesAll'>
					{AllListCities.map((data, i) => (
						<CitiesItem
							key={i}
							id={data.id}
							Name={data.Name}
							Distance={data.Distance}
							AllListCities={AllListCities}
							setAllListCities={setAllListCities}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default SettingAll
