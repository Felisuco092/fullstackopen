import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    test('First render blog shows title and author but not the url or likes', () => {
        const blog = {title: 'React blog', author: 'Felix', likes: 5, url: 'https://ey.com', user:{username:"Root"}}
        render(<Blog blog={ blog }/>)

        const element = screen.getByText('React blog Felix')
        const url = screen.queryByText('https://ey.com')
        const likes = screen.queryByText('5')
        expect(element).toBeDefined()
        expect(url, likes).toBeNull()
    })

    test('When pressed view button, the url and likes are displayed', async () => {
        const blog = {title: 'React blog', author: 'Felix', likes: 5, url: 'https://ey.com', user:{username:"Root"}}
        const container = render(<Blog blog={ blog }/>).container

        const user = userEvent.setup()

        const view = screen.getByText('view')
        await user.click(view)

        const url = screen.getByText('https://ey.com', { exact: false })
        const like = screen.getByText('5', { exact: false })

        expect(url).toBeDefined()
        expect(like).toBeDefined()

    })

    test('When pressed view button and hide button, the url and likes are not displayed', async () => {
        const blog = {title: 'React blog', author: 'Felix', likes: 5, url: 'https://ey.com', user:{username:"Root"}}
        const container = render(<Blog blog={ blog }/>).container

        const user = userEvent.setup()

        const view = screen.getByText('view')
        await user.click(view)

        const hide = screen.getByText('hide')
        await user.click(hide)

        const url = screen.queryByText('https://ey.com', { exact: false })
        const like = screen.queryByText('5', { exact: false })


        expect(url).toBeNull()
        expect(like).toBeNull()

    })

    test('When liked a blog 2 times, the controller is called 2 times', async () => {
        const blog = {title: 'React blog', author: 'Felix', likes: 5, url: 'https://ey.com', user:{username:"Root"}}

        const mockFunction = vi.fn()

        const container = render(<Blog blog={ blog } put={mockFunction}/>).container

        const user = userEvent.setup()

        const view = screen.getByText('view')
        await user.click(view)

        const like = screen.getByText('like')
        await user.dblClick(like)

        expect(mockFunction.mock.calls).toHaveLength(2)

    })
    
})