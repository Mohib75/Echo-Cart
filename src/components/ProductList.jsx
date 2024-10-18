import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"

const ProductList = ({ products, onDelete, onUpdate }) => {
	const [visibleCards, setVisibleCards] = useState([]) // Track visible product IDs

	// Show products one-by-one based on the index
	useEffect(() => {
		const timers = products?.map(
			(_, index) =>
				setTimeout(() => {
					setVisibleCards((prev) => [...prev, index])
				}, index * 700) // 700ms delay between each card
		)

		// Cleanup on unmount to avoid memory leaks
		return () => timers.forEach((timer) => clearTimeout(timer))
	}, [products])

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center'>
			{products.map((product, index) => (
				<ProductCard
					key={index}
					product={product}
					onDelete={onDelete}
					onUpdate={onUpdate}
					isVisible={visibleCards?.includes(index)} // Control visibility
				/>
			))}
		</div>
	)
}

export default ProductList
