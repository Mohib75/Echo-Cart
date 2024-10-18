import { FaEdit, FaStar } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const ProductCard = ({ product, onDelete, onUpdate, isVisible }) => {
	const { images, title, price, description, category, id, rating } = product

	return (
		<div
			className={`rounded-lg p-4 shadow-xl flex flex-col w-64 sm:w-96 overflow-hidden h-full hover:scale-110 transform transition-all duration-500 ease-out
        ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
			<div className='h-80 bg-[#EFEBE9] rounded-lg hover:scale-110 transform transition-all duration-500'>
				<img src={images} alt={title} className='h-full w-full object-cover rounded-lg' />
			</div>
			<div className='flex justify-between items-center h-20 my-2'>
				<h2 className='font-bold text-lg w-64'>{title}</h2>
				<p className='text-gray-600'>${price}</p>
			</div>
			<hr className='w-full border-[1px] border-dashed border-[#13131326] mb-4' />
			<div className='flex flex-col justify-between h-full'>
				<p className='text-gray-600 text-sm'>{description}</p>
				<div className='flex flex-col'>
					<hr className='w-full border-[1px] border-dashed border-[#13131326] mb-2' />
					<div className='flex justify-between items-center'>
						<div className='bg-[#EFEBE9] text-sm flex justify-center items-center rounded-[30px] p-2 px-8 w-[100px]'>
							<p className='text-[#22C55E] font-medium leading-5'>{category}</p>
						</div>
						<p className='text-gray-600 flex gap-2 items-center'>
							{rating} <FaStar className='mb-1 text-yellow-400' />
						</p>
					</div>
				</div>

				<div className='mt-2 flex justify-between items-center gap-4'>
					<button onClick={() => onUpdate(product)} className='hover:scale-110 transform transition-all duration-500'>
						<FaEdit className='text-blue-600 text-3xl' />
					</button>
					<button onClick={() => onDelete(id)} className='hover:scale-110 transform transition-all duration-500'>
						<MdDelete className='text-red-600 text-3xl' />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
