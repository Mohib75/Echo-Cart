import { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SearchBox = ({ searchTerm, handleSearch }) => {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div className='relative flex self-end' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			{/* Search Input */}
			<input
				type='text'
				value={searchTerm}
				onChange={handleSearch}
				placeholder='Search...'
				className={`absolute right-4 top-0 h-9 p-4 bg-white border border-gray-300 rounded-full 
                    text-gray-800 outline-none transition-all duration-500 ease-in-out
                    ${isHovered ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
			/>

			{/* Search Icon */}
			<div className='p-2 bg-green-500 rounded-full cursor-pointer z-10'>
				<FaSearch className='text-white text-xl' />
			</div>
		</div>
	)
}

export default SearchBox
