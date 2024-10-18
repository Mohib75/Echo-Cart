import React from "react"

const FIlterBox = ({ categoryFilter, handleCategoryChange, categories, sortBy, handleSortChange }) => {
	return (
		<div className='flex gap-4 items-center'>
			<select value={categoryFilter} onChange={handleCategoryChange} className='border rounded p-2 outline-none'>
				<option value='All'>All Categories</option>
				{categories.map((category) => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</select>

			{/* Sort Options */}
			<select value={sortBy} onChange={handleSortChange} className='border rounded p-2 outline-none'>
				<option value='name'>Sort by Name</option>
				<option value='price'>Sort by Price</option>
				<option value='rating'>Sort by Rating</option>
			</select>
		</div>
	)
}

export default FIlterBox
