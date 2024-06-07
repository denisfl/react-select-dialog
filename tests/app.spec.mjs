import { test, expect } from '@playwright/test'

test.describe('App Component', () => {
  const headerLocator = '[data-test="header"]'
  const confirmButtonLocator = '[data-test="confirm-button"]'
  const hintLocator = '[data-test="hint"]'
  const modalLocator = '[data-test="modal"]'
  const modalCloseButtonLocator = '[data-test="modal-close-button"]'
  const modalSearchLocator = '[data-test="modal-search"]'
  const modalFilterLocator = '[data-test="modal-filter"]'
  const filteredItemsLocator = '[data-test="filtered-list"]'
  const filteredItemLocator = '[data-test="filtered-item"]'
  const modalSelectedListLocator = '[data-test="modal-selected-items"]'
  const modalSaveButtonLocator = '[data-test="button-save"]'
  const modalCancelButtonLocator = '[data-test="button-cancel"]'
  const selectedItemsLocator = '[data-test="selected-list"]'

  const checkVisibility = async (page, locator, isVisible) => {
    if (isVisible) {
      await expect(page.locator(locator)).toBeVisible()
    } else {
      await expect(page.locator(locator)).not.toBeVisible()
    }
  }

  const checkText = async (page, locator, text) => {
    await expect(page.locator(locator)).toHaveText(text)
  }

  const checkCount = async (page, locator, count) => {
    let itemCount = await page.locator(locator).count()
    expect(itemCount).toBe(count)
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the title, confirm button', async ({ page }) => {
    await checkText(page, headerLocator, 'Select items')
    await checkVisibility(page, confirmButtonLocator, true)
    await checkText(page, confirmButtonLocator, 'Confirm my choise')
    await checkVisibility(page, hintLocator, false)
    await checkVisibility(page, modalLocator, false)
  })

  test('should display modal by click on "Confirm my choise" button', async ({
    page,
  }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)
  })

  test('should close the modal by click on close button', async ({ page }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)
    await page.click(modalCloseButtonLocator)
    await checkVisibility(page, modalLocator, false)
  })

  test('should close button by pressing "Esc" key', async ({ page }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)
    await page.keyboard.press('Escape')
    await checkVisibility(page, modalLocator, false)
  })

  test('should search items by search query', async ({ page }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)

    await checkCount(page, filteredItemLocator, 300)
    await page.fill(modalSearchLocator, 'Element 100')
    await checkCount(page, filteredItemLocator, 1)

    await page.fill(modalSearchLocator, '10')
    await checkCount(page, filteredItemLocator, 13)

    await page.fill(modalSearchLocator, '🥦👻🚀')
    await checkVisibility(page, filteredItemLocator, false)
  })

  test('should filter items by filter option', async ({ page }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)

    await checkCount(page, filteredItemLocator, 300)
    await page.selectOption(modalFilterLocator, {
      label: '> 10',
    })
    await checkCount(page, filteredItemLocator, 289)

    await page.selectOption(modalFilterLocator, {
      label: '> 50',
    })
    await checkCount(page, filteredItemLocator, 249)

    await page.selectOption(modalFilterLocator, {
      label: '> 200',
    })
    await checkCount(page, filteredItemLocator, 99)
  })

  test('should filter items by search query and filter option', async ({
    page,
  }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)

    await checkCount(page, filteredItemLocator, 300)

    await page.selectOption(modalFilterLocator, {
      label: '> 50',
    })

    await page.fill(modalSearchLocator, '55')
    await checkCount(page, filteredItemLocator, 3)
  })

  test('should select items by click on checkbox', async ({ page }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)
    await checkVisibility(page, modalSelectedListLocator, false)

    await checkCount(page, filteredItemLocator, 300)
    await page.click(filteredItemLocator)

    await checkVisibility(page, modalSelectedListLocator, true)
  })

  test('should not select more than three items', async ({ page }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)
    await checkVisibility(page, modalSelectedListLocator, false)

    for (let i = 0; i < 3; i++) {
      await page.click(`${filteredItemLocator}:nth-child(${i + 1})`)
    }
    await checkCount(page, `${modalSelectedListLocator} li`, 3)
    const disabledItemsCount = await page
      .locator(`${filteredItemsLocator} input[disabled]`)
      .count()
    expect(disabledItemsCount).toBe(297)
  })

  test('should be not saved by click on Cancel button', async ({ page }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)
    await checkVisibility(page, modalSelectedListLocator, false)

    await page.click(`${filteredItemLocator}:nth-child(1)`)
    await checkCount(page, `${modalSelectedListLocator} li`, 1)

    await page.click(modalCancelButtonLocator)
    await checkVisibility(page, modalLocator, false)

    await checkVisibility(page, selectedItemsLocator, false)
  })

  test('should be saved by click on Save button', async ({ page }) => {
    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)
    await checkVisibility(page, modalSelectedListLocator, false)

    await page.click(`${filteredItemLocator}:nth-child(1)`)
    await checkCount(page, `${modalSelectedListLocator} li`, 1)

    await page.click(modalSaveButtonLocator)
    await checkVisibility(page, modalLocator, false)

    await checkCount(page, `${selectedItemsLocator} li`, 1)
    await checkText(page, hintLocator, 'You currently have 1 selected item.')

    await page.click(confirmButtonLocator)
    await checkVisibility(page, modalLocator, true)
    await page.click(`${filteredItemLocator}:nth-child(2)`)
    await checkCount(page, `${modalSelectedListLocator} li`, 2)

    await page.click(modalSaveButtonLocator)
    await checkVisibility(page, modalLocator, false)
    await checkCount(page, `${selectedItemsLocator} li`, 2)
    await checkText(page, hintLocator, 'You currently have 2 selected items.')
  })
})
