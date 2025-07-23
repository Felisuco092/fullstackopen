import Blog from './Blog'
import { render, screen } from '@testing-library/react'

describe('<Blog />', () => {
    test('First render blog shows title and author but not the url or likes', async () => {
        render(<Blog blog={ {title: 'React blog', author: 'Felix', likes: 5, url: 'https://ey.com'} }/>)

        const element = screen.getByText('React blog Felix')
        const url = await screen.queryByText('https://ey.com')
        const likes = await screen.queryByText('5')
        expect(element).toBeDefined()
        expect(url, likes).toBeNull()
    })
    
})