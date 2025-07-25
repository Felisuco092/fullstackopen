const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http:localhost:3001/api/users',
      {
        data: {
            username: 'Test-Felix',
            name: 'Felix Gutierrez',
            password: 'test-E2E'
        }
      }
    )

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const usernameInput = await page.locator('input[name="Username"]')
      const passwordInput = await page.locator('input[name="Password"]')

      await usernameInput.fill('Test-Felix')
      await passwordInput.fill('test-E2E')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Felix Gutierrez logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameInput = await page.locator('input[name="Username"]')
      const passwordInput = await page.locator('input[name="Password"]')

      await usernameInput.fill('Test-Felix')
      await passwordInput.fill('error-E2E')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.locator('.error-Message')).toBeVisible()
    })
  })

  describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    const usernameInput = await page.locator('input[name="Username"]')
    const passwordInput = await page.locator('input[name="Password"]')

    await usernameInput.fill('Test-Felix')
    await passwordInput.fill('test-E2E')

    await page.getByRole('button', { name: 'login' }).click()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'new note' }).click()

    const titleInput = await page.locator('#title-input')
    const authorInput = await page.locator('#author-input')
    const urlInput = await page.locator('#url-input')

    await titleInput.fill('First blog')
    await authorInput.fill('Miguel de Cervantes')
    await urlInput.fill('http://rae.es')

    await page.getByRole('button', { name: 'create' }).click()

    await expect(page.getByText('First blog Miguel de')).toBeVisible()

  })

  describe('With one blog', () => {
    beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new note' }).click()

        const titleInput = await page.locator('#title-input')
        const authorInput = await page.locator('#author-input')
        const urlInput = await page.locator('#url-input')

        await titleInput.fill('First blog')
        await authorInput.fill('Miguel de Cervantes')
        await urlInput.fill('http://rae.es')


        await page.getByRole('button', { name: 'create' }).click()

        await page.getByText('First blog Miguel de').waitFor()

    })

    test('a blog can be edited', async ({ page, request }) => {
        const response = await request.get('http://localhost:3001/api/blogs/');
        const blogs = await response.json()
        const id = blogs[0].id
        
        
        await request.put('http://localhost:3001/api/blogs/' + id, {
            data: {
                title: 'Second blog',
                author: 'Miguel de Cervantes',
                url: 'http://rae.es',
                likes: 0,
                user: blogs[0].user.id
            }
        })

        await page.goto('http://localhost:5173')

        

        await expect(page.getByText('Second blog Miguel de')).toBeVisible()

    })

    test('a blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('First blog Miguel de')).not.toBeVisible()
    })
  })


  
})
})