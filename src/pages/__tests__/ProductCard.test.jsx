import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductCard from '../../components/ProductCard'

// context mock - simulate the funtion addtocart 
const addToCartMock = vi.fn()

vi.mock('../../context/ProductContext', () => ({
  useCart: () => ({
    addToCart: addToCartMock //replace the real context with this mock
  })
}))

describe('ProductCard', () => {

  const product = {
    id: 1,
    title: 'Test Product',
    price: 99,
    image: 'test.png'
  }

  it('Render product data', () => {
    render(<ProductCard {...product} />)//Render the component
    //Verify that the data is shown 
    expect(screen.getByText(product.title)).toBeInTheDocument()
    expect(screen.getByText(`$ ${product.price}`)).toBeInTheDocument()
  })

  it('Add to the cart with a valid quantity', () => {
    render(<ProductCard {...product} />)
    //Find the input the quantity
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: '2' } }) //Simulate the change of the quantity to 2
    //Simulate the click to add to cart
    fireEvent.click(screen.getByText(/add to cart/i))
    //Verify that the function is called
    expect(addToCartMock).toHaveBeenCalled()
  })
})
