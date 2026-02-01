import { BiMessageDetail, BiSolidContact } from 'react-icons/bi'
import {
	BsFillClipboardCheckFill,
	BsListCheck,
	BsPersonFillCheck,
} from 'react-icons/bs'
import { CiCalculator1 } from 'react-icons/ci'
import {
	FaCalculator,
	FaRubleSign,
	FaStar,
	FaTelegramPlane,
} from 'react-icons/fa'
import { FaCheck, FaLocationDot } from 'react-icons/fa6'
import { GiFamilyHouse, GiOfficeChair, GiVacuumCleaner } from 'react-icons/gi'
import { GrServices } from 'react-icons/gr'
import {
	IoIosArrowBack,
	IoIosArrowDown,
	IoLogoWhatsapp,
	IoMdArrowDropup,
	IoMdPricetag,
} from 'react-icons/io'
import {
	IoCloseOutline,
	IoDocumentLockSharp,
	IoGlobeOutline,
	IoMailOpenOutline,
	IoMenu,
	IoWarningOutline,
} from 'react-icons/io5'
import { LuCopyright, LuMousePointerClick } from 'react-icons/lu'
import { MdDeleteForever, MdSmartphone } from 'react-icons/md'
import { TbChecklist, TbMessageUser } from 'react-icons/tb'

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
	CursorClick: <LuMousePointerClick />,
	Contact: <BiSolidContact />,
	Phone: <MdSmartphone />,
	Star: <FaStar />,
	House: <GiFamilyHouse />,
	OfficeHouse: <GiOfficeChair />,
	ServicesIcon: <GrServices />,
	PriceTag: <IoMdPricetag />,
	RUB: <FaRubleSign />,
	DocumentLock: <IoDocumentLockSharp />,
	Clear: <GiVacuumCleaner />,
	PersonalCheck: <BsPersonFillCheck />,
	UsedReviews: <TbMessageUser />,
	JobOfficially: <TbChecklist />,
	Mail: <IoMailOpenOutline />,
	global: <IoGlobeOutline />,
}
