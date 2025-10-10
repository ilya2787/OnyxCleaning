import React, { Dispatch, FC, SetStateAction } from 'react'
import { IconList } from '../IconList'

import { TCategories, TListServices } from '../../type/Services.type'
import './Style.scss'

interface TypeProps {
	Title: string
	LinkImg: string
	ArrayDataCleaning: TListServices[]
	ArrayDopServices: TCategories[]
	setArrayDataDop: Dispatch<SetStateAction<TCategories[]>>
	setArrayData: Dispatch<SetStateAction<TListServices[]>>
	setOpenModal: Dispatch<SetStateAction<boolean>>
	setOpenModalDop: Dispatch<SetStateAction<boolean>>
	setTitleModalDop: Dispatch<SetStateAction<string>>
	positions: string
	deg: number
}

const BlockInformText: FC<TypeProps> = ({
	deg,
	positions,
	setArrayData,
	setOpenModal,
	setOpenModalDop,
	setTitleModalDop,
	Title,
	LinkImg,
	ArrayDataCleaning,
	ArrayDopServices,
	setArrayDataDop,
}) => {
	const QuantityArray = ArrayDataCleaning.length
	const StyleBlock: React.CSSProperties = {
		flexDirection: positions as `row`,
	}
	const StyleTextBlock: React.CSSProperties = {
		background: `linear-gradient(${deg}deg, #fff, #fefaef)`,
	}

	return (
		<div className='BlockInformText' style={StyleBlock}>
			<div className='BlockInformText--img'>
				{Title != '' && <h2>{Title}</h2>}
				<img src={LinkImg} alt='' />
			</div>
			<div className='BlockInformText--text' style={StyleTextBlock}>
				<ul>
					{ArrayDataCleaning.slice(0, 5).map(data => (
						<li key={data.id}>
							<span className='Icon'>{IconList.Check}</span>
							<p>{data.text}</p>
						</li>
					))}
					<div className='BlockInformText--text--BTN'>
						{QuantityArray > 5 && (
							<button
								className='BlockInformText--text--BTN--List'
								onClick={() => {
									setArrayData(ArrayDataCleaning)
									setOpenModal(true)
								}}
							>
								Показать весь список <span>{IconList.ListIcon}</span>
							</button>
						)}
						<button
							className='BlockInformText--text--BTN--Dop'
							onClick={() => {
								setArrayDataDop(ArrayDopServices)
								setTitleModalDop(`${Title}`)
								setOpenModalDop(true)
							}}
						>
							Посмотреть дополнительные услуги
						</button>
					</div>
				</ul>
			</div>
		</div>
	)
}

export default BlockInformText
