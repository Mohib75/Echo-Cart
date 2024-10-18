import { useState } from "react"

const ProductForm = ({ onSubmit, initialProduct, submitTitle }) => {
	const [product, setProduct] = useState(initialProduct || { title: "", description: "", category: "", price: "", rating: "", image: "" })

	const handleChange = (e) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(product)
		setProduct({ title: "", description: "", category: "", price: "", rating: "", images: "" })
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col bg-[#EFEBE9] p-4 sm:p-8 w-full self-center gap-4'>
			<input
				type='text'
				name='title'
				value={product?.title}
				onChange={handleChange}
				placeholder='Product Name'
				className='border rounded p-2 mb-2 outline-none'
				required
			/>
			<input
				type='text'
				name='description'
				value={product?.description}
				onChange={handleChange}
				placeholder='Product Description'
				className='border rounded p-2 mb-2 outline-none'
				required
			/>
			<input
				type='text'
				name='category'
				value={product?.category}
				onChange={handleChange}
				placeholder='Product Category'
				className='border rounded p-2 mb-2 outline-none'
				required
			/>
			<input
				type='number'
				name='price'
				value={product?.price}
				onChange={handleChange}
				placeholder='Product Price'
				className='border rounded p-2 mb-2 outline-none'
				required
			/>
			<input
				type='number'
				name='rating'
				value={product?.rating}
				onChange={handleChange}
				placeholder='Product Rating'
				className='border rounded p-2 mb-2 outline-none'
				required
			/>
			<input
				type='text'
				name='images'
				value={product?.images}
				onChange={handleChange}
				placeholder='Image URL'
				className='border rounded p-2 mb-2 outline-none'
				required
			/>
			<button type='submit' className='bg-green-500 text-white py-2 rounded '>
				{submitTitle}
			</button>
		</form>
	)
}

export default ProductForm
