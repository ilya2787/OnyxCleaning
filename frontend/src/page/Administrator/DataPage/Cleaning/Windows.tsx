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
	TDegree,
	TListServices,
} from '../../../../components/type/Services.type'
import ModalWindows from '../../../../components/ui/ModalWindows/ModalWindows'
import {
	AddDopSuccess,
	AddStringBasicSuccess,
	ErrorOrderAdd,
} from '../../../../components/ui/natificationMesseg/natificationMessag'
import { ROUTES } from '../../../../model/routes'
import WindowsListItem from './ListBasic/WindowsListItem'
import WindowsDopList from './ListDop/WindowsDopItem'
import WindowsItemDegree from './ListDop/WindowsItemDegree'

interface TypeContext {
	AllBasicListCleaning: TListServices[]
	setAllBasicListCleaning: Dispatch<SetStateAction<TListServices[]>>
	AllListDopWindows: TCategories[]
	setAllListDopWindows: Dispatch<SetStateAction<TCategories[]>>
}

export const Context = createContext<TypeContext>({
	AllBasicListCleaning: [],
	setAllBasicListCleaning: () => {},
	AllListDopWindows: [],
	setAllListDopWindows: () => {},
})

const Windows = () => {
	const [Current_ChoosingPositions, setCurrent_ChoosingPositions] =
		useState<string>('ChoosingPositionsBasic')
	const [AllBasicListCleaning, setAllBasicListCleaning] = useState<
		TListServices[]
	>([])
	const [OpenModalAddString, setOpenModalAddString] = useState<boolean>(false)
	const [OpenModalAddDop, setOpenModalAddDop] = useState<boolean>(false)
	const [ValueTextAddString, setValueTextAddString] = useState<string>('')
	const [AllListDopWindows, setAllListDopWindows] = useState<TCategories[]>([])

	const [ListDegree, setListDegree] = useState<TDegree[]>([])

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
					`${process.env.REACT_APP_SERVER}/DopCleaningWindows`,
				)
				.then(res => {
					const idFirst = res.data.length - 1
					const idList = res.data[idFirst].id
					setIdNumberAddDop(idList + 1)
					const valueId = { value: res.data.length }
					axios
						.post(`${process.env.REACT_APP_SERVER}/AutoIncrDopWindows`, valueId)
						.then()
						.catch(err => console.log(err))
				})
				.catch(err => console.log(err))
		}
		UpdateIdDop()
	}, [setAllListDopWindows])

	const AddStringBasic = () => {
		const value = {
			Name_cleaning: 'Windows',
			Name_Room: null,
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
							Name_cleaning: 'Windows',
							Name_Room: '',
							Text: ValueTextAddString,
						},
					])
				}
			})
			.catch(err => console.log(err))
	}

	const CleanerForm = () => {
		setValueTextAddString('')
		setValueTextAddDop('')
		setCurrentPriceAdd(0)
		setCurrentUnitAdd('')
	}

	useEffect(() => {
		const AllListDop = async () => {
			await axios
				.get<
					TCategories[]
				>(`${process.env.REACT_APP_SERVER}/DopCleaningWindows`)
				.then(res => setAllListDopWindows(res.data))
		}
		AllListDop()
	}, [setAllListDopWindows])

	const AddDopBasic = () => {
		if (ValueTextAddDop !== '') {
			const value = {
				text: ValueTextAddDop,
				price: CurrentPriceAdd,
				unit: CurrentUnitAdd,
			}
			axios
				.post(`${process.env.REACT_APP_SERVER}/AddDopCleaningWindows`, value)
				.then((res: any) => {
					if (res.data.Status === 'Success') {
						AddDopSuccess()
						setAllListDopWindows(array => [
							...array,
							{
								id: IdNumberAddDop,
								text: ValueTextAddDop,
								price: CurrentPriceAdd,
								unit: CurrentUnitAdd,
							},
						])
					}
				})
		} else {
			ErrorOrderAdd()
		}
	}

	useEffect(() => {
		const AllList = async () => {
			axios
				.get<TDegree[]>(`${process.env.REACT_APP_SERVER}/DegreeCleaning`)
				.then(res => setListDegree(res.data))
				.catch(err => console.log(err))
		}
		AllList()
	}, [setListDegree])

	return (
		<Context.Provider
			value={{
				AllBasicListCleaning: AllBasicListCleaning,
				setAllBasicListCleaning: setAllBasicListCleaning,
				AllListDopWindows: AllListDopWindows,
				setAllListDopWindows: setAllListDopWindows,
			}}
		>
			<div className='Windows'>
				<div className='Windows_header'>
					<Link to={ROUTES.CleaningData} className='Windows_header_BackLink'>
						Назад
					</Link>
					<div className='Windows_header--title'>
						<h1>Мойка окон</h1>
					</div>
				</div>
				<div className='Windows_content'>
					<div className='Windows_content__ChoosingPositions'>
						<div className='Windows_content__ChoosingPositions--Basic'>
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
					<div className='Windows_content_ListCleaningAll'>
						{Current_ChoosingPositions === 'ChoosingPositionsBasic' && (
							<div className='Windows_content_ListCleaningAll--basic'>
								<div className='Windows_content_ListCleaningAll_BTNAddString'>
									<button onClick={() => setOpenModalAddString(true)}>
										Добавить запись
									</button>
								</div>
								{AllBasicListCleaning.map(
									(data, i) =>
										data.Name_cleaning === 'Windows' && (
											<WindowsListItem key={i} id={data.id} Text={data.Text} />
										),
								)}
							</div>
						)}
						{Current_ChoosingPositions === 'ChoosingPositionsDop' && (
							<div className='Windows_content_ListCleaningAll--Dop'>
								<div className='Windows_content_ListCleaningAll_BTNAddString'>
									<button onClick={() => setOpenModalAddDop(true)}>
										Добавить запись
									</button>
								</div>
								<div className='Windows_content_ListCleaningAll--Dop--Degree'>
									<h1>Выставление стоимости за степень загрязнения</h1>
									<div className='Windows_content_ListCleaningAll--Dop--Degree--WindowsDegree'>
										{ListDegree.map(data => (
											<WindowsItemDegree
												name={data.Name}
												price={data.Price}
												key={data.id}
												id={data.id}
												ListDegree={ListDegree}
												setListDegree={setListDegree}
											/>
										))}
									</div>
								</div>
								{AllListDopWindows.map((data, i) => (
									<WindowsDopList
										key={i}
										id={data.id}
										price={data.price}
										unit={data.unit}
										text={data.text}
									/>
								))}
							</div>
						)}
					</div>
				</div>
				<ModalWindows
					Title='Добавление новой записи'
					modalIsOpen={OpenModalAddString}
					onClose={() => setOpenModalAddString(false)}
				>
					<div className='ModalWindowsAdBasic'>
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

export default Windows
