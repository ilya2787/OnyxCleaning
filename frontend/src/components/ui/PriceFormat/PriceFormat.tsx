export const PriceFormat = (num: number) => {
	const Fprice = new Intl.NumberFormat('ru').format(num)
	return Fprice + ' RUB'
}
