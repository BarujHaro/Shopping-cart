import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import NavBar from '../../components/NavBar'

vi.mock('../../context/ProductContext', () => ({
    useCart: () => ({
        getTotalItems: () => 3
    })
}))

describe('NavBar', () => {
        const renderNav = () =>
        render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
        )


        it('Render main links', () => {
            renderNav()

            expect(screen.getByText('Home')).toBeInTheDocument()
            expect(screen.getByText('Shop')).toBeInTheDocument()
            expect(screen.getByText('Cart')).toBeInTheDocument()
        })

        it('Shows badge when there are items', () => {
            renderNav()
            expect(screen.getByText('3')).toBeInTheDocument()
            expect(document.querySelector('.cartBadge')).toBeTruthy()
        })

        it('the links have the correct routes', () => {
            renderNav()

            expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
            expect(screen.getByText('Shop').closest('a')).toHaveAttribute('href', '/shop')
            expect(screen.getByText('Cart').closest('a')).toHaveAttribute('href', '/cart')
        })


})