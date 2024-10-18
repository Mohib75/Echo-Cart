import { useEffect, useRef, useState } from "react"
import ProductList from "./components/ProductList"
import ProductForm from "./components/ProductForm"
import { RxCross2 } from "react-icons/rx"
import SearchBox from "./components/SearchBox"
import FIlterBox from "./components/FIlterBox"

const App = () => {
	const [products, setProducts] = useState([]) // All products from API
	const [searchTerm, setSearchTerm] = useState("")
	const [categories, setCategories] = useState([])
	const [categoryFilter, setCategoryFilter] = useState("All")
	const [sortBy, setSortBy] = useState("name")
	const [editProduct, setEditProduct] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [loading, setLoading] = useState(true) // Loading state

	// Fetch products on page load
	useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((response) => response.json())
			.then((data) => {
				setProducts(data?.products || [])
				extractCategories(data?.products)
				waitForImagesToLoad(data?.products) // Wait for all images to load
			})
			.catch((error) => {
				console.error("Failed to fetch products:", error)
				setLoading(false) // Stop loading on error
			})
	}, [])

	// Extract unique categories from products
	const extractCategories = (products) => {
		const uniqueCategories = [...new Set(products?.map((p) => p?.category))]
		setCategories(uniqueCategories)
	}

	// Wait for all product images to load
	const waitForImagesToLoad = (products) => {
		const imagePromises = products?.map(
			(product) =>
				new Promise((resolve) => {
					const img = new Image()
					img.src = product.images[0] // Load the first image of each product
					img.onload = resolve // Resolve when the image loads
					img.onerror = resolve // Also resolve on error to prevent blocking
				})
		)

		// When all images are loaded, stop the loader
		Promise.all(imagePromises).then(() => setLoading(false))
	}

	// Filter, search, and sort the products
	const getDisplayedProducts = () => {
		let filtered = products

		if (categoryFilter !== "All") {
			filtered = filtered?.filter((p) => p?.category === categoryFilter)
		}

		if (searchTerm) {
			filtered = filtered?.filter((p) => p?.title.toLowerCase().includes(searchTerm.toLowerCase()))
		}

		filtered?.sort((a, b) => {
			if (sortBy === "price") return a.price - b.price
			if (sortBy === "rating") return b.rating - a.rating
			return a.title.localeCompare(b.title)
		})

		return filtered
	}

	const handleSearch = (e) => setSearchTerm(e.target.value)
	const handleCategoryChange = (e) => setCategoryFilter(e.target.value)
	const handleSortChange = (e) => setSortBy(e.target.value)

	const handleAddOrUpdate = (product) => {
		const updatedProducts = editProduct
			? products?.map((p) => (p?.id === product?.id ? product : p))
			: [...products, { ...product, id: products?.length + 1 }]

		setProducts(updatedProducts)
		setEditProduct(null)
	}

	const handleDelete = (id) => {
		const updatedProducts = products?.filter((p) => p?.id !== id)
		setProducts(updatedProducts)
	}

	const handleUpdate = (product) => {
		setEditProduct(product)
		setIsModalOpen(true)
	}

	const handleSave = (updatedProduct) => {
		const updatedProducts = products?.map((p) => (p?.id === updatedProduct?.id ? updatedProduct : p))
		setProducts(updatedProducts)
		setIsModalOpen(false)
		setEditProduct(null)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setEditProduct(null)
	}

	return (
		<div className='container mx-auto p-4 poppins my-8 flex flex-col gap-8'>
			<h1 className='text-3xl font-bold mb-4 text-center'>Echo Cart</h1>
			<div className='w-full sm:w-1/2 self-center'>
				<ProductForm onSubmit={handleAddOrUpdate} initialProduct={editProduct} submitTitle='Add' />
			</div>

			{/* Search & Filter */}
			<div className='flex flex-col sm:flex-row items-center justify-center gap-12 my-8'>
				<SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
				<FIlterBox
					categoryFilter={categoryFilter}
					handleCategoryChange={handleCategoryChange}
					categories={categories}
					sortBy={sortBy}
					handleSortChange={handleSortChange}
				/>
			</div>

			{/* Loader */}
			{loading ? (
				<div className='flex justify-center items-center h-64'>
					<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900'></div>
				</div>
			) : (
				<ProductList products={getDisplayedProducts()} onDelete={handleDelete} onUpdate={handleUpdate} />
			)}

			{/* Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white p-2 sm:p-6 rounded shadow-lg w-full sm:w-1/2 relative'>
						<button
							onClick={closeModal}
							className='absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-black hover:scale-110 transform transition-all duration-500'>
							<RxCross2 />
						</button>
						<h2 className='text-xl font-bold mb-4'>Edit Product</h2>
						<ProductForm initialProduct={editProduct} onSubmit={handleSave} onCancel={closeModal} submitTitle='Update' />
					</div>
				</div>
			)}
		</div>
	)
}

export default App
