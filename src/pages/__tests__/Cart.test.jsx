import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cart from '../Cart'


vi.mock('../../assets/no.png', () => 'no-items.png')

vi.mock('../../components/CartCard', () => ({
    default: ({title, onClick}) =>(
        <div>
            <span>{title}</span>
            <button onClick={onClick}>Remove</button>
        </div>
    )
}))
const removeItemMock = vi.fn()
const getTotalItemsMock = vi.fn()
const getTotalPriceMock = vi.fn()

vi.mock('../../context/ProductContext', () =>({
    useCart: () => ({
        cart: [],
            removeItem: removeItemMock,
            getTotalItems: getTotalItemsMock,
            getTotalPrice: getTotalPriceMock
    })
}))

describe('Cart Page', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('shows message when the cart is empty', () =>{
        render(<Cart/>)
        expect(screen.getByText(/there aren't any items/i))
        expect(screen.getByAltText(/no items/i)).toBeInTheDocument()
    })

    it('Shows the products and summarize', async () => {
        vi.doMock('../../context/ProductContext', () => ({
            useCart: () => ({
                cart: [
                    {id: 1, title: 'Item 1', price: 10, quantity: 2, image: "a.png"},
                    {id: 2, title: 'Item 2', price: 20, quantity: 7, image: "b.png"}
                ],
                removeItem: removeItemMock,
                getTotalItems: () =>3,
                getTotalItems: () => 25
            })
        }))
        const { default: CartWithItems } = await import('../Cart')

        render(<CartWithItems />)

        expect(screen.getByText('Your Cart')).toBeInTheDocument()
        expect(screen.getByText('Item 1')).toBeInTheDocument()
        expect(screen.getByText('Item 2')).toBeInTheDocument()

        expect(screen.getByText(/items:/i)).toBeInTheDocument()
        expect(screen.getByText('$ 25.00')).toBeInTheDocument()
    })

    it('Calls the removeItem', async () => {

    vi.doMock('../../context/ProductContext', () => ({
        useCart: () => ({
            cart: [
            { id: 1, title: 'Item 1', price: 10, quantity: 1, image: 'a.png' }
            ],
            removeItem: removeItemMock,
            getTotalItems: () => 1,
            getTotalPrice: () => 10
        })
        }))

        const { default: CartWithItem } = await import('../Cart')

        render(<CartWithItem />)

        fireEvent.click(screen.getByText('remove'))

        expect(removeItemMock).toHaveBeenCalledWith(1)
    })

})