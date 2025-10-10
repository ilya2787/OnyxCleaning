import { Dispatch, SetStateAction } from 'react'
import { TDopCurrent } from '../../type/Services.type'

export const UpdateFinalPriceDop = (
	UpdateCart: TDopCurrent[],
	id: number,
	setDopCurrentPrice: Dispatch<SetStateAction<TDopCurrent[]>>
) => {
	const itemsIndex = UpdateCart.findIndex(value => value.id === id)
	const NewItem = {
		...UpdateCart[itemsIndex],
		FinalPriceDop:
			(UpdateCart[itemsIndex].quantity - 1) * UpdateCart[itemsIndex].price +
			UpdateCart[itemsIndex].MinPrice,
	}
	const newCard = UpdateCart.slice()
	newCard.splice(itemsIndex, 1, NewItem)
	setDopCurrentPrice(newCard)
}
