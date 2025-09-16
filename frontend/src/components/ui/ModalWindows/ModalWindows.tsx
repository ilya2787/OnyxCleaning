import { FC, PropsWithChildren, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { IconList } from '../IconList'
import './ModalStyle.scss'

interface ModalContentType extends PropsWithChildren {
	modalIsOpen: boolean
	onClose: () => void
	Title: string
}

const ModalWindows: FC<ModalContentType> = ({
	modalIsOpen,
	onClose,
	Title,
	children,
}) => {
	useEffect(() => {
		if (modalIsOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflowY = 'scroll'
			document.body.style.overflowX = 'hidden'
		}
	}, [modalIsOpen])

	return (
		<>
			<Transition in={modalIsOpen} timeout={350} unmountOnExit={true}>
				{state => (
					<div
						className={`Modal_background ${state}`}
						id='ContentModal'
						onClick={() => onClose()}
					>
						<div className='Modal_container' onClick={e => e.stopPropagation()}>
							<button onClick={() => onClose()} className='btnClosed'>
								{IconList.Exit}
							</button>
							<h1 className='Modal_container--title'>{Title}</h1>
							<div className='Modal_content'>{children}</div>
						</div>
					</div>
				)}
			</Transition>
		</>
	)
}

export default ModalWindows
