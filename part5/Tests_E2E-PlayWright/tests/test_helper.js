const PostUser = async (page, request, username, name, password) => {
    await request.post('http:localhost:3001/api/users',
      {
        data: {
            username: username,
            name: name,
            password: password
        }
      }
    )
}

const CreateBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new note' }).click()

    const titleInput = await page.locator('#title-input')
    const authorInput = await page.locator('#author-input')
    const urlInput = await page.locator('#url-input')

    await titleInput.fill(title)
    await authorInput.fill(author)
    await urlInput.fill(url)

    await page.getByRole('button', { name: 'create' }).click()
}

const LogIn = async (page, username, password) => {
    const usernameInput = await page.locator('input[name="Username"]')
    const passwordInput = await page.locator('input[name="Password"]')

    await usernameInput.fill(username)
    await passwordInput.fill(password)

    await page.getByRole('button', { name: 'login' }).click()
}

module.exports = { PostUser, CreateBlog, LogIn }