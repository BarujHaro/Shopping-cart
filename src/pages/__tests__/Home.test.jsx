import '@testing-library/jest-dom'

import { render, screen, fireEvent } from '@testing-library/react'//Render to mount a fake DOM //Screen like we see the screen
import { MemoryRouter } from 'react-router-dom'  //fake router
import Home from '../Home'
import { vi } from 'vitest'  //To mocks, functions and simulate modules

const mockNavigate = vi.fn()   //fake function mock

vi.mock('react-router-dom', async () => {  //Intercepts the module and imports the real module to avoid
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

//Groups related tests
describe('Home page', () => {

  test('renders title and description', () => {
    render(     //Render the component to simulate the app running with router
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/Live your life the way you think/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/Discover products that fit your everyday life/i)
    ).toBeInTheDocument()
  })

  test('renders Start shopping button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /start shopping/i })//Look for the button, accesibility
    expect(button).toBeInTheDocument()
  })

  test('navigates to /shop when clicking button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /start shopping/i })
    fireEvent.click(button)  //Simulate click

    expect(mockNavigate).toHaveBeenCalledWith('/shop') //It calls mocknavigate to shop
  })

})