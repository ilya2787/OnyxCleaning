import { useEffect } from 'react'

export const UseClickOut = (
	ref: React.RefObject<HTMLDivElement>,
	callback: () => void
) => {
	const handleClick = (e: any) => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback()
		}
	}
	useEffect(() => {
		document.addEventListener('mousedown', handleClick)
		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	})
}
