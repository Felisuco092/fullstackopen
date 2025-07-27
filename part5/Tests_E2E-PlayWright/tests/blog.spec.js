const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./test_helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    
    await helper.PostUser(page, request, 'Test-Felix', 'Felix Gutierrez', 'test-E2E')

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

      await helper.LogIn(page, 'Test-Felix', 'test-E2E')

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
    await helper.LogIn(page, 'Test-Felix', 'test-E2E')
  })

  test('a new blog can be created', async ({ page }) => {

    await helper.CreateBlog(page, 'First blog', 'Miguel de Cervantes', 'http://rae.es')

    await expect(page.getByText('First blog Miguel de')).toBeVisible()

  })

  describe('With one blog', () => {
    beforeEach(async ({ page }) => {
        await helper.CreateBlog(page, 'First blog', 'Miguel de Cervantes', 'http://rae.es')

        

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

    test('Only the creator of the blog can see the remove button', async ({ page, request }) => {
      
      await helper.PostUser(page, request, 'Test-Felix2', 'Felix Gutierrez', 'test-E2E')

      await page.getByRole('button', { name: 'view' }).click()
      expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()

      await helper.LogIn(page, 'Test-Felix2', 'test-E2E')


      expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })

  describe('various blogs', () => {
    beforeEach(async ({ page }) => {
      const titles = ["First blog", "Second blog", "Third blog"];

      for (const title of titles) {
        await helper.CreateBlog(page, title, 'a', 'a');
      }


      let views = await [page.locator('div').filter({ hasText: /^First blog aview$/ }).getByRole('button'),
        page.locator('div').filter({ hasText: /^Second blog aview$/ }).getByRole('button'),
        page.locator('div').filter({ hasText: /^Third blog aview$/ }).getByRole('button')
      ]

      for (const view of views) {
        await view.click();
      }
      await expect(page.getByText('Third blog a')).toBeVisible()

      const likes = await page.getByTestId('like-button').all()
      console.log(likes)
      await likes[2].click()
      await expect(page.getByText('Third blog a hide a likes 1')).toBeVisible()
      await likes[2].click()
      await likes[1].click()
      await expect(page.getByText('Second blog a hide a likes 1')).toBeVisible()

    })

    test('The three blogs are displayed', async ({ page }) => {
      await expect(page.getByText('First blog a')).toBeVisible()
      await expect(page.getByText('Second blog a')).toBeVisible()
      await expect(page.getByText('Third blog a')).toBeVisible()
    })

    test('The blogs are ordered by the quantity of likes', async ({ page }) => {
      const blogs = await page.getByTestId('like-count').allTextContents()
      const sort = [... blogs].sort((a,b) => Number(a) > Number(b))

      expect(blogs).toEqual(sort)
    })
  })


  
})
})