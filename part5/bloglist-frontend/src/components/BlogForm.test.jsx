import BlogForm from './BlogForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
    test('The form calls 1 time the handler when submited', async () => {
        const mockFunction = vi.fn()

        const container = render(<BlogForm createBlog={mockFunction}/>).container

        const titleInput = container.querySelector('#title-input')
        const authorInput = container.querySelector('#author-input')
        const urlInput = container.querySelector('#url-input')
        const submit = screen.getByText('create')

        const user = userEvent.setup()

        await user.type(titleInput, 'React form title')
        await user.type(authorInput, 'React form author')
        await user.type(urlInput, 'React form url')

        await user.click(submit)


        expect(mockFunction.mock.calls).toHaveLength(1)
    })
    
})