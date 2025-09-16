import { Dispatch, FC, SetStateAction } from 'react'
import './CategoryCleaning.scss'
interface propsType {
	setCatCleaning: Dispatch<SetStateAction<string>>
}

const CategoryCleaning: FC<propsType> = ({ setCatCleaning }) => {
	return (
		<div className='CategoryCleaning'>
			<div className='CategoryCleaning--Basic'>
				<input
					type='radio'
					name='CatCleaning'
					value={''}
					id='Basic'
					defaultChecked
				/>
				<label
					htmlFor='Basic'
					onClick={() => {
						setCatCleaning('Basic')
					}}
				>
					Базовая уборка
				</label>
			</div>
			<div className='CategoryCleaning--General'>
				<input
					type='radio'
					name='CatCleaning'
					value={'Генеральная уборка'}
					id='General'
				/>
				<label
					htmlFor='General'
					onClick={() => {
						setCatCleaning('General')
					}}
				>
					Генеральная уборка
				</label>
			</div>
			<div className='CategoryCleaning--Repair'>
				<input
					type='radio'
					name='CatCleaning'
					value={'После ремонта'}
					id='Repair'
				/>
				<label
					htmlFor='Repair'
					onClick={() => {
						setCatCleaning('Repair')
					}}
				>
					После ремонта
				</label>
			</div>
		</div>
	)
}

export default CategoryCleaning
