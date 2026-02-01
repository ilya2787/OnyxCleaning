import axios from 'axios'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { TReviews } from '../../components/type/Services.type'
import { IconList } from '../../components/ui/IconList'

const Reviews = () => {
	const [ListReviews, setListReviews] = useState<TReviews[]>([])
	useEffect(() => {
		async function ListBDDop() {
			axios
				.get<TReviews[]>(`${process.env.REACT_APP_SERVER}/ReviewsUser`)
				.then(res => {
					setListReviews(res.data)
				})
				.catch(err => console.log(err))
		}
		ListBDDop()
	}, [ListReviews])

	const ArrayStar = [
		{
			number: 0,
			icon: IconList.Star,
		},
		{
			number: 1,
			icon: IconList.Star,
		},
		{
			number: 2,
			icon: IconList.Star,
		},
		{
			number: 3,
			icon: IconList.Star,
		},
		{
			number: 4,
			icon: IconList.Star,
		},
	]

	const params = {
		spaceBetween: 30,
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
		},
		pagination: {
			clickable: true,
		},
		loop: true,
		slidesPerView: 1,
		breakpoints: {
			640: {
				slidesPerView: 1,
			},
			1024: {
				slidesPerView: 3,
			},
		},
	}

	return (
		<div className='Reviews'>
			<h1>Отзывы</h1>
			<div className='Reviews_card-list'>
				<Swiper {...params} modules={[Pagination, Autoplay]}>
					{ListReviews.map((data, i) => (
						<SwiperSlide className='Reviews_card-list--item' key={i}>
							<div className='Reviews_card-list--item--title'>
								<h2>{data.Name}</h2>
								<div
									className='Reviews_card-list--item--title--rating'
									data-total-value={String(data.QuantityStar)}
								>
									{ArrayStar.map((data, i) => (
										<div
											className='Reviews_card-list--item--title--rating--star'
											data-item-value={String(data.number)}
											key={i}
										>
											{data.icon}
										</div>
									))}
								</div>
							</div>
							<div className='Reviews_card-list--item--Text'>{data.Text}</div>
							<div className='Reviews_card-list--item--inform'>
								<a href={data.Link}>{data.LinkName}</a>
								<p>
									{new Intl.DateTimeFormat('ru-Ru', {
										year: 'numeric',
										month: 'long',
										day: '2-digit',
									}).format(new Date(data.Date))}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}

export default Reviews
