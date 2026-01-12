import '@testing-library/jest-dom'

import { render, screen, waitFor, fireEvent } from '@testing-library/react'//Render to mount a fake DOM //Screen like we see the screen
import Shop from '../Shop'
import * as productService from '../../utils/productService'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// mock ProductCard
vi.mock('../../components/ProductCard', () => ({
  default: ({ title }) => <div>{title}</div>
}))

describe('Shop', () => {
  //10 product array to test
  const mockProducts = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: 100,
    image: 'img.png'
  }))

  //Before each test, mockd(simulate) teh funciton getProducts to reutrn the test products without api calls
  beforeEach(() => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue(mockProducts)
  })

  it('Show the loading at the start', () => {
    render(<Shop />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('show products after the loading', async () => {
    render(<Shop />)
    //wait for the loading of products
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
    })

    expect(screen.getByText('Product 6')).toBeInTheDocument()
    expect(screen.queryByText('Product 7')).not.toBeInTheDocument() //Doesnt show the product 7 due to the pagination
  })

  it('Change the page', async () => {
    render(<Shop />)

    await waitFor(() => screen.getByText('Product 1'))
    //find the last button with iconBtn2
    const nextBtn = document.querySelector('.iconBtn2:last-child')
    fireEvent.click(nextBtn)

    await waitFor(() => {
      expect(screen.getByText('Product 7')).toBeInTheDocument()
    })
    
  })
})