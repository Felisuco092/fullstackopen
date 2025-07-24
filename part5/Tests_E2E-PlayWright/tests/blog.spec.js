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
})