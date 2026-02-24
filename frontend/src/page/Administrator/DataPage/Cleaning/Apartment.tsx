import axios from 'axios'
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
import { Link } from 'react-router'
import {
	TCategories,
	TListServices,
} from '../../../../components/type/Services.type'
import ModalWindows from '../../../../components/ui/ModalWindows/ModalWindows'
import {
	AddDopSuccess,
	AddStringBasicSuccess,
} from '../../../../components/ui/natificationMesseg/natificationMessag'
import {
	CatCleaning,
	RoomCleaning,
} from '../../../../components/ui/SelectItems/ListSelectCleaning'
import SelectItems from '../../../../components/ui/SelectItems/SelectItems'
import { ROUTES } from '../../../../model/routes'
import ApartmentListItem from './ListBasic/AraptmentListItem'
import ApartmentDopList from './ListDop/ApartmentDopItem'

interface TypeContext {
	AllBasicListCleaning: TListServices[]
	setAllBasicListCleaning: Dispatch<SetStateAction<TListServices[]>>
	AllListDopApartment: TCategories[]
	setAllListDopApartment: Dispatch<SetStateAction<TCategories[]>>
}

export const Context = createContext<TypeContext>({
	AllBasicListCleaning: [],
	setAllBasicListCleaning: () => {},
	AllListDopApartment: [],
	setAllListDopApartment: () => {},
})

const Apartment = () => {
	const [Current_ChoosingPositions, setCurrent_ChoosingPositions] =
		useState<string>('ChoosingPositionsBasic')
	const [CurrentCleaning, setCurrentCleaning] = useState<string>('Basic')
	const [CurrentCleaningAdd, setCurrentCleaningAdd] = useState<string>('Basic')
	const [CurrentRoomAdd, setCurrentRoomAdd] = useState<string>('AllRoom')
	const [AllBasicListCleaning, setAllBasicListCleaning] = useState<
		TListServices[]
	>([])
	const [OpenModalAdd, setOpenModalAdd] = useState<boolean>(false)
	const [OpenModalAddDop, setOpenModalAddDop] = useState<boolean>(false)
	const [ValueTextAddString, setValueTextAddString] = useState<string>('')

	//Добавление допов
	const [AllListDopApartment, setAllListDopApartment] = useState<TCategories[]>(
		[],
	)
	const [CurrentCleaningAddDop, setCurrentCleaningAddDop] =
		useState<string>('Basic')
	const [CurrentRoomAddDop, setCurrentRoomAddDop] = useState<string>('AllRoom')
	const [ValueTextAddDop, setValueTextAddDop] = useState<string>('')
	const [CurrentUnitAdd, setCurrentUnitAdd] = useState<string>('')
	const [CurrentPriceAdd, setCurrentPriceAdd] = useState<number>(0)

	const BDListBasic = () => {
		axios
			.get<TListServices[]>(`${process.env.REACT_APP_SERVER}/ListCleaning`)
			.then(res => {
				setAllBasicListCleaning(res.data)
			})
			.catch(err => console.log(err))
	}
	useEffect(() => {
		BDListBasic()
	}, [setAllBasicListCleaning])

	const [IdNumberAddStringBase, setIdNumberAddStringBase] = useState<number>(0)
	const [IdNumberAddDop, setIdNumberAddDop] = useState<number>(0)

	useEffect(() => {
		const UpdateId = async () => {
			axios
				.get<TListServices[]>(`${process.env.REACT_APP_SERVER}/ListCleaning`)
				.then(res => {
					const idFirst = res.data.length - 1
					const idList = res.data[idFirst].id
					setIdNumberAddStringBase(idList + 1)
					const valueId = { value: res.data.length }
					axios
						.post(`${process.env.REACT_APP_SERVER}/AutoIncr`, valueId)
						.then()
						.catch(err => console.log(err))
				})
				.catch(err => console.log(err))
		}
		UpdateId()
	}, [setAllBasicListCleaning])

	useEffect(() => {
		const UpdateIdDop = async () => {
			await axios
				.get<TCategories[]>(
					`${process.env.REACT_APP_SERVER}/DopCleaningApartment`,
				)
				.then(res => {
					const idFirst = res.data.length - 1
					const idList = res.data[idFirst].id
					setIdNumberAddDop(idList + 1)
					const valueId = { value: res.data.length }
					axios
						.post(
							`${process.env.REACT_APP_SERVER}/AutoIncrDopApartment`,
							valueId,
						)
						.then()
						.catch(err => console.log(err))
				})
				.catch(err => console.log(err))
		}
		UpdateIdDop()
	}, [setAllListDopApartment])

	const AddStringBasic = () => {
		const value = {
			Name_cleaning: CurrentCleaningAdd,
			Name_Room: CurrentRoomAdd,
			Text: ValueTextAddString,
		}
		axios
			.post(`${process.env.REACT_APP_SERVER}/AddStringBase`, value)
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					AddStringBasicSuccess()
					setAllBasicListCleaning(Array => [
						...Array,
						{
							id: IdNumberAddStringBase,
							Name_cleaning: CurrentCleaningAdd,
							Name_Room: CurrentRoomAdd,
							Text: ValueTextAddString,
						},
					])
				}
			})
			.catch(err => console.log(err))
	}

	const CleanerForm = () => {
		setValueTextAddString('')
		setCurrentUnitAdd('')
		setValueTextAddDop('')
	}

	useEffect(() => {
		const AllListDop = async () => {
			await axios
				.get<
					TCategories[]
				>(`${process.env.REACT_APP_SERVER}/DopCleaningApartment`)
				.then(res => setAllListDopApartment(res.data))
		}
		AllListDop()
	}, [setAllListDopApartment])

	const AddDopBasic = () => {
		const value = {
			text: ValueTextAddDop,
			price: CurrentPriceAdd,
			NameCatCleaning: CurrentCleaningAddDop,
			NameCatRooms: CurrentRoomAddDop,
			unit: CurrentUnitAdd,
		}
		axios
			.post(`${process.env.REACT_APP_SERVER}/AddDopCleaningApartment`, value)
			.then((res: any) => {
				if (res.data.Status === 'Success') {
					AddDopSuccess()
					setAllListDopApartment(array => [
						...array,
						{
							id: IdNumberAddDop,
							text: ValueTextAddDop,
							price: CurrentPriceAdd,
							NameCatCleaning: CurrentCleaningAddDop,
							NameCatRooms: CurrentRoomAddDop,
							unit: CurrentUnitAdd,
						},
					])
				}
			})
	}
	return (
		<Context.Provider
			value={{
				AllBasicListCleaning: AllBasicListCleaning,
				setAllBasicListCleaning: setAllBasicListCleaning,
				AllListDopApartment: AllListDopApartment,
				setAllListDopApartment: setAllListDopApartment,
			}}
		>
			<div className='Apartment'>
				<div className='Apartment_header'>
					<Link to={ROUTES.CleaningData} className='Apartment_header_BackLink'>
						Назад
					</Link>
					<div className='Apartment_header--title'>
						<h1>Уборка квартир и домов</h1>
					</div>
				</div>
				<div className='Apartment_content'>
					<div className='Apartment_content__ChoosingPositions'>
						<div className='Apartment_content__ChoosingPositions--Basic'>
							<input
								type='radio'
								name='ChoosingPositions'
								id='ChoosingPositions_Basic'
								defaultChecked
							/>
							<label
								htmlFor='ChoosingPositions_Basic'
								onClick={() =>
									setCurrent_ChoosingPositions('ChoosingPositionsBasic')
								}
							>
								Базовые услуги
							</label>
						</div>
						<div className='Apartment_content__ChoosingPositions--Dop'>
							<input
								type='radio'
								name='ChoosingPositions'
								id='ChoosingPositions_Dop'
							/>
							<label
								htmlFor='ChoosingPositions_Dop'
								onClick={() =>
									setCurrent_ChoosingPositions('ChoosingPositionsDop')
								}
							>
								Дополнительные услуги
							</label>
						</div>
					</div>
					<div className='Apartment_content__CurrentCleaning'>
						<div className='Apartment_content__CurrentCleaning--Basic'>
							<input
								type='radio'
								name='CurrentCleaning'
								id='CurrentCleaningBasic'
								defaultChecked
							/>
							<label
								htmlFor='CurrentCleaningBasic'
								onClick={() => setCurrentCleaning('Basic')}
							>
								Базовая уборка
							</label>
						</div>
						<div className='Apartment_content__CurrentCleaning--General'>
							<input
								type='radio'
								name='CurrentCleaning'
								id='CurrentCleaningGeneral'
							/>
							<label
								htmlFor='CurrentCleaningGeneral'
								onClick={() => setCurrentCleaning('General')}
							>
								Генеральная уборка
							</label>
						</div>
						<div className='Apartment_content__CurrentCleaning--Repair'>
							<input
								type='radio'
								name='CurrentCleaning'
								id='CurrentCleaningRepair'
							/>
							<label
								htmlFor='CurrentCleaningRepair'
								onClick={() => setCurrentCleaning('Repair')}
							>
								Уборка после ремонта
							</label>
						</div>
					</div>
					<div className='Apartment_content__ListCleaningAll'>
						{Current_ChoosingPositions === 'ChoosingPositionsBasic' && (
							<div className='Apartment_content__ListCleaningAll--basic'>
								<div className='Apartment_content_BTNAddString'>
									<button onClick={() => setOpenModalAdd(true)}>
										Добавить запись
									</button>
								</div>
								<div className='ApartmentCleaningItem_AllRoom'>
									<h1>Комнаты</h1>
									{AllBasicListCleaning.map(
										(data, i) =>
											data.Name_cleaning === CurrentCleaning &&
											data.Name_Room === 'AllRoom' && (
												<ApartmentListItem
													id={data.id}
													Text={data.Text}
													key={i}
												/>
											),
									)}
								</div>
								<div className='ApartmentCleaningItem_Food'>
									<h1>Кухня</h1>
									{AllBasicListCleaning.map(
										(data, i) =>
											data.Name_cleaning === CurrentCleaning &&
											data.Name_Room === 'Food' && (
												<ApartmentListItem
													id={data.id}
													Text={data.Text}
													key={i}
												/>
											),
									)}
								</div>
								<div className='ApartmentCleaningItem_WC'>
									<h1>Санузел</h1>
									{AllBasicListCleaning.map(
										(data, i) =>
											data.Name_cleaning === CurrentCleaning &&
											data.Name_Room === 'WC' && (
												<ApartmentListItem
													id={data.id}
													Text={data.Text}
													key={i}
												/>
											),
									)}
								</div>
							</div>
						)}
						{Current_ChoosingPositions === 'ChoosingPositionsDop' && (
							<div className='Apartment_content__ListCleaningAll--Dop'>
								<div className='Apartment_content_BTNAddString'>
									<button onClick={() => setOpenModalAddDop(true)}>
										Добавить запись
									</button>
								</div>
								<div className='Apartment_content__ListCleaningAll--Dop_AllRoom'>
									<h1>Комнаты</h1>
									{AllListDopApartment.map(
										(data, i) =>
											data.NameCatCleaning === CurrentCleaning &&
											data.NameCatRooms === 'AllRoom' && (
												<ApartmentDopList
													key={i}
													id={data.id}
													price={data.price}
													text={data.text}
													unit={data.unit}
												/>
											),
									)}
								</div>
								<div className='Apartment_content__ListCleaningAll--Dop_Food'>
									<h1>Кухня</h1>
									{AllListDopApartment.map(
										(data, i) =>
											data.NameCatCleaning === CurrentCleaning &&
											data.NameCatRooms === 'Food' && (
												<ApartmentDopList
													key={i}
													id={data.id}
													price={data.price}
													text={data.text}
													unit={data.unit}
												/>
											),
									)}
								</div>
								<div className='Apartment_content__ListCleaningAll--Dop_WC'>
									<h1>Санузел</h1>
									{AllListDopApartment.map(
										(data, i) =>
											data.NameCatCleaning === CurrentCleaning &&
											data.NameCatRooms === 'WC' && (
												<ApartmentDopList
													key={i}
													id={data.id}
													price={data.price}
													text={data.text}
													unit={data.unit}
												/>
											),
									)}
								</div>
							</div>
						)}
					</div>
				</div>
				<ModalWindows
					Title='Добавление новой записи'
					modalIsOpen={OpenModalAdd}
					onClose={() => setOpenModalAdd(false)}
				>
					<div className='ModalWindowsAdBasic'>
						<div className='ModalWindowsAdBasic--Select'>
							<div className='ModalWindowsAdBasic--Select--NameCleaning'>
								<h2>Выберите вид уборки</h2>
								<SelectItems
									options={CatCleaning}
									CurrentServicesSingle={CurrentCleaningAdd}
									setCurrentServicesSingle={setCurrentCleaningAdd}
									Placeholder={'Выберите вид уборки'}
									isMulti={false}
									isSearch={false}
								/>
							</div>
							<div className='ModalWindowsAdBasic--Select--NameRoom'>
								<h2>Выберите комнату</h2>
								<SelectItems
									options={RoomCleaning}
									CurrentServicesSingle={CurrentRoomAdd}
									setCurrentServicesSingle={setCurrentRoomAdd}
									Placeholder={'Выберите комнату'}
									isMulti={false}
									isSearch={false}
								/>
							</div>
						</div>
						<div className='ModalWindowsAdBasic--Text'>
							<textarea
								name=''
								id='Text'
								placeholder=''
								onChange={event => setValueTextAddString(event.target.value)}
								value={ValueTextAddString}
								rows={2}
							></textarea>
							<label htmlFor='Text'>Введите услугу</label>
						</div>
						<div className='ModalWindowsAdBasic--AddBTN'>
							<button
								onClick={() => {
									AddStringBasic()
									CleanerForm()
								}}
							>
								Добавить
							</button>
						</div>
					</div>
				</ModalWindows>

				<ModalWindows
					Title='Добавление новой записи'
					modalIsOpen={OpenModalAddDop}
					onClose={() => setOpenModalAddDop(false)}
				>
					<div className='ModalWindowsAddDop'>
						<div className='ModalWindowsAddDop--Select'>
							<div className='ModalWindowsAddDop--Select--NameCleaning'>
								<h2>Выберите вид уборки</h2>
								<SelectItems
									options={CatCleaning}
									CurrentServicesSingle={CurrentCleaningAddDop}
									setCurrentServicesSingle={setCurrentCleaningAddDop}
									Placeholder={'Выберите вид уборки'}
									isMulti={false}
									isSearch={false}
								/>
							</div>
							<div className='ModalWindowsAddDop--Select--NameRoom'>
								<h2>Выберите комнату</h2>
								<SelectItems
									options={RoomCleaning}
									CurrentServicesSingle={CurrentRoomAddDop}
									setCurrentServicesSingle={setCurrentRoomAddDop}
									Placeholder={'Выберите комнату'}
									isMulti={false}
									isSearch={false}
								/>
							</div>
						</div>
						<div className='ModalWindowsAddDop--content'>
							<div className='ModalWindowsAddDop--content--text'>
								<textarea
									name=''
									id='Text'
									placeholder=''
									onChange={event => setValueTextAddDop(event.target.value)}
									value={ValueTextAddDop}
									rows={2}
								></textarea>
								<label htmlFor='Text'>Введите услугу</label>
							</div>
							<div className='ModalWindowsAddDop--content--unitPrice'>
								<div className='ModalWindowsAddDop--content--unitPrice--unit'>
									<p>Единица измерения: </p>
									<input
										type='text'
										name=''
										id=''
										value={CurrentUnitAdd}
										onChange={e => setCurrentUnitAdd(e.target.value)}
									/>
								</div>
								<div className='ModalWindowsAddDop--content--unitPrice--price'>
									<p>Цена: </p>
									<input
										type='number'
										defaultValue={CurrentPriceAdd}
										onChange={e => setCurrentPriceAdd(Number(e.target.value))}
									/>
									<p>RUB</p>
								</div>
							</div>
						</div>
						<div className='ModalWindowsAddDop--AddBTN'>
							<button
								onClick={() => {
									AddDopBasic()
									CleanerForm()
								}}
							>
								Добавить
							</button>
						</div>
					</div>
				</ModalWindows>
			</div>
		</Context.Provider>
	)
}
export default Apartment
