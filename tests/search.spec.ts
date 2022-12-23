import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
})

test.describe('Should allow me to ...', () => {
  test('Should allow me to search for a book', async ({ page }) => {
    const input = page.getByPlaceholder('O Senhor dos Anéis')
    await input.type('Harry Potter')
    await input.press('Enter')
    await expect(page).toHaveURL(
      'http://localhost:5173/buscar?query=Harry+Potter&page=1&limit=10'
    )

    const titleInput = page.getByLabel('Título:')
    expect(titleInput).toHaveValue('Harry Potter')

    await page
      .getByRole('link', { name: 'Harry Potter: A Coleção Completa (1-7)' })
      .filter({ hasText: 'Harry Potter: A Coleção Completa (1-7)' })
      .click()

    await expect(page).toHaveURL('http://localhost:5173/livro/-bF2CwAAQBAJ')
  })

  test('Should save advanced search params', async ({ page }) => {
    const input = page.getByPlaceholder('O Senhor dos Anéis')
    await input.type('Harry Potter')
    await input.press('Enter')
    await expect(page).toHaveURL(
      'http://localhost:5173/buscar?query=Harry+Potter&page=1&limit=10'
    )

    await expect(page.getByRole('listitem')).toHaveCount(10)
    await page.getByLabel('Livros por página').selectOption('40')
    await page.getByRole('button', { name: 'Buscar Livro' }).click()
    await expect(page.getByRole('listitem')).toHaveCount(40)

    const titleInput = page.getByLabel('Título:')
    expect(titleInput).toHaveValue('Harry Potter')

    await page
      .getByRole('link', { name: 'Harry Potter: A Coleção Completa (1-7)' })
      .filter({ hasText: 'Harry Potter: A Coleção Completa (1-7)' })
      .click()

    await expect(page).toHaveURL('http://localhost:5173/livro/-bF2CwAAQBAJ')
    await page.getByRole('link', { name: 'J.K. Rowling' }).click()
    await expect(page).toHaveURL(
      'http://localhost:5173/buscar?author=J.K.%20Rowling'
    )
    await expect(page.getByPlaceholder('Tolkien')).toHaveValue('J.K. Rowling')
    await page.getByPlaceholder('O Senhor dos Anéis').fill('Harry Potter')
    await page.getByPlaceholder('O Senhor dos Anéis').press('Enter')
    await expect(page).toHaveURL(
      'http://localhost:5173/buscar?query=Harry+Potter&author=J.K.+Rowling&limit=40&page=1'
    )
  })
  test('Should save favorites, and delete them.', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await page.getByPlaceholder('O Senhor dos Anéis').click()
    await page.getByPlaceholder('O Senhor dos Anéis').fill('habit')
    await page.getByPlaceholder('O Senhor dos Anéis').press('Enter')
    await page
      .getByRole('listitem')
      .filter({
        hasText:
          'O poder do hábitopor Charles Duhigg⭐⭐⭐⭐⭐ (6)FavoritarInformações',
      })
      .getByRole('button', { name: 'Favoritar' })
      .click()
    await page.getByRole('button', { name: 'Remover' }).click()
    await page
      .getByRole('listitem')
      .filter({
        hasText:
          'O poder do hábitopor Charles Duhigg⭐⭐⭐⭐⭐ (6)FavoritarInformações',
      })
      .getByRole('button', { name: 'Favoritar' })
      .click()
    await page.getByRole('link', { name: '⭐Favoritos' }).click()
    await page.getByRole('button', { name: 'Remover' }).click()
  })
  test('Should show how many books I`ve added to favorites.', async ({
    page,
  }) => {
    await page.getByPlaceholder('O Senhor dos Anéis').click()
    await page.getByPlaceholder('O Senhor dos Anéis').fill('habit')
    await page.getByPlaceholder('O Senhor dos Anéis').press('Enter')
    await page
      .getByRole('listitem')
      .filter({
        hasText:
          'The Coaching Habitpor Michael Bungay Stanier⭐⭐⭐⭐ (2)FavoritarInformações',
      })
      .getByRole('button', { name: 'Favoritar' })
      .click()
    await page
      .getByRole('listitem')
      .filter({
        hasText:
          'The Leader Habitpor Martin Lanik⭐⭐⭐⭐⭐ (1)FavoritarInformações',
      })
      .getByRole('button', { name: 'Favoritar' })
      .click()
    await page
      .getByRole('listitem')
      .filter({
        hasText: 'The Now Habitpor Neil Fiore⭐⭐⭐⭐ (9)FavoritarInformações',
      })
      .getByRole('button', { name: 'Favoritar' })
      .click()
    await page.getByRole('link', { name: '⭐Favoritos' }).click()
    await page.getByRole('heading', { name: '⭐Favoritos (3)' }).click()
    await page
      .getByRole('listitem')
      .filter({
        hasText:
          'The Coaching Habitpor Michael Bungay Stanier⭐⭐⭐⭐ (2)RemoverInformações',
      })
      .getByRole('button', { name: 'Remover' })
      .click()
    await page.getByRole('heading', { name: '⭐Favoritos (2)' }).click()
    await page
      .getByRole('listitem')
      .filter({
        hasText:
          'The Leader Habitpor Martin Lanik⭐⭐⭐⭐⭐ (1)RemoverInformações',
      })
      .getByRole('button', { name: 'Remover' })
      .click()
    await page.getByRole('heading', { name: '⭐Favoritos (1)' }).click()
    await page.getByRole('button', { name: 'Remover' }).click()
    await page.getByRole('heading', { name: '⭐Favoritos (0)' }).click()
    await page
      .getByText(
        'Adicione livros aos seus favoritos para que eles apareçam aqui.'
      )
      .click()
  })
  test('Show a message when nothing returns from the search.', async ({
    page,
  }) => {
    await page.goto(
      'http://localhost:5173/buscar?query=wdhshdfjf&author=wdhshdfjf&limit=10&page=1'
    )
    await expect(page.getByText('Nenhum resultado')).toBeVisible()
  })
})
