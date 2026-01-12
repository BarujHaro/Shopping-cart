import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CartCard from '../../components/CartCard'

describe('CartCard', () =>{
    const product = {
        title: 'Test Item',
        price: 12.5,
        quantity: 2,
        image: 'test.png'
    }

    it('shows product info', () =>{
        render(<CartCard {...product} onClick={() => {}}/>)
        expect(screen.getByText(product.title)).toBeInTheDocument()
        expect(screen.getByText(/qty: 2/i)).toBeInTheDocument()
        expect(screen.getByText('$ 12.5')).toBeInTheDocument()
        expect(screen.getByAltText(product.title)).toHaveAttribute('src', product.image)
    
    })

    it('runs onClick to press delete', () => {
        const clickMock = vi.fn()
        render(<CartCard {...product} onClick={clickMock}/>)
        const removeIcon = document.querySelector('.removeIcon')
        fireEvent.click(removeIcon)
        expect(clickMock).toHaveBeenCalled()
    
    })

})