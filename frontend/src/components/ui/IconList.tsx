import { BiMessageDetail } from 'react-icons/bi'
import { BsFillClipboardCheckFill, BsListCheck } from 'react-icons/bs'
import { CiCalculator1 } from 'react-icons/ci'
import { FaCalculator, FaTelegramPlane } from 'react-icons/fa'
import { FaCheck, FaLocationDot } from 'react-icons/fa6'
import {
	IoIosArrowBack,
	IoIosArrowDown,
	IoLogoWhatsapp,
	IoMdArrowDropup,
} from 'react-icons/io'
import { IoCloseOutline, IoMenu, IoWarningOutline } from 'react-icons/io5'
import { LuCopyright } from 'react-icons/lu'
import { MdDeleteForever } from 'react-icons/md'

export const IconList = {
	Location: <FaLocationDot />,
	ArrowDown: <IoIosArrowDown />,
	ArrowBack: <IoIosArrowBack />,
	ArrowTop: <IoMdArrowDropup />,
	Telegram: <FaTelegramPlane />,
	WhatsApp: <IoLogoWhatsapp />,
	Calculator: <CiCalculator1 />,
	Calculator_mobile: <FaCalculator />,
	Copyright: <LuCopyright />,
	Check: <FaCheck />,
	Messages: <BiMessageDetail />,
	ListIcon: <BsListCheck />,
	Exit: <IoCloseOutline />,
	Delete: <MdDeleteForever />,
	Warning: <IoWarningOutline />,
	CheckedOrder: <BsFillClipboardCheckFill />,
	BurgerMenu: <IoMenu />,
}
