//Типизация для списка услуг входящих
export interface TListServices {
	id: number
	Name_cleaning: string
	Name_Room: string
	Text: string
}

export interface TListServicesRoom {
	id: number
	Text: string
}

//Типизация для выгрузки данных дополнительных услуг из БД
export interface TCategories {
	id: number
	text: string
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

export interface TReviews {
	id: number
	Name: string
	QuantityStar: number
	Text: string
	Link: string
	LinkName: string
	Date: Date
}

export interface TBasaCustomer {
	id?: Number
	Name: string
	Phone: string
	Name_cleaning: string
	Date: string
	OrderQuantity: number
}

export interface TAllListUser extends TBasaCustomer {
	id: number
}

export interface TParametersBD {
	id: number
	Name: string
	Value: number
}

export interface TDegree {
	id: number
	Name: string
	Price: number
}

export interface TContact {
	id: number
	Name: string
	Value: string
}
