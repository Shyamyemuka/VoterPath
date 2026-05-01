import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
}))

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    const headings = screen.getAllByRole('heading', { name: /VoterPath/i })
    expect(headings.length).toBeGreaterThan(0)
  })

  it('has accessible buttons', () => {
    render(<Home />)
    // Check if the "Talk to us and start chat" button exists
    const chatButtons = screen.getAllByRole('button', { name: /Talk to us/i })
    expect(chatButtons.length).toBeGreaterThan(0)
  })
})
