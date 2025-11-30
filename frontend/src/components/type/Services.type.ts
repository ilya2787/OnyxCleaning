//Типизация для списка доп услуг
export interface TListServices {
	id: number
	text: string
}

//Типизация для выгрузки данных дополнительных услуг из БД
export interface TCategories extends TListServices {
	price: number
	unit?: string
	NameCatRooms?: string
	NameCatCleaning?: string
}

export interface TRootPrice {
	Name: string
	price: number
}

export interface TPriceBD extends TRootPrice {
	id: number
	MinPrice: number
}

export interface TDopPrice extends TPriceBD {
	title: string
	value: string
	quantity: number
	unit: string
	FinalPriceDop?: number
}

export type TDopCurrentPrice = Omit<TDopPrice, 'Name'>

export interface TCities {
	id: number
	Name: string
	Name_EN: string
	Distance: number
}

export interface TCitiesDistancePrice {
	Name: string
	Distance: number
	price: number
}

export interface TTimeCleaning {
	id: number
	quantity: number
}

export interface TvalueMassage {
	Name: string
	Tel: string
	Message?: string
}
