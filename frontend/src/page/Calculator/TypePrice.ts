export interface TypePriceBD {
	Name: string
	Price: number
	MinPrice: number
}

export interface TypeRootPrice {
	Name: string
	price: number
}

export const InitialQuadrature = {
	Quantity: 30,
}

export interface TypeDopPrice {
	id: number
	title: string
	value: string
	quantity: number
	unit: string
	price: number
	minPrice: number
	FinalPriceDop?: number
}
