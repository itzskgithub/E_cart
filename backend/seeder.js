import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

const importData = async () => {
  try {
    await connectDB()

    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    let productsFromApi = []

    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error(`Fake Store API returned ${response.status}`)
      }
      productsFromApi = await response.json()
      if (!Array.isArray(productsFromApi)) {
        throw new Error('Fake Store API returned an unexpected response format')
      }
    } catch (error) {
      console.error(`Failed to fetch Fake Store API products: ${error}`.red)
      productsFromApi = products
    }

    const sampleProducts = productsFromApi.map((product) => ({
      user: adminUser,
      name: product.title || product.name || 'Untitled Product',
      image: product.image || '/images/sample.jpg',
      brand: product.category || 'Sample brand',
      category: product.category || 'Miscellaneous',
      description: product.description || 'No description available',
      price: Number(product.price || 0),
      countInStock: 10,
      numReviews: Number(product.rating?.count || 0),
      rating: Number(product.rating?.rate || 0),
      likes: 1,
    }))

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await connectDB()

    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
