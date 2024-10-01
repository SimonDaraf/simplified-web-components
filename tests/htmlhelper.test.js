import { expect, test } from 'vitest'
import { createHtmlElement, createCssTemplateElement, isValidHtmlName, noForbiddenHtmlNames } from '../src/htmlHelper.js'

test('Assert can create html element', () => {
  // Arrange
  const html = '<div>My html code.</div>'

  // Act
  const htmlTemplateElement = createHtmlElement(html, 'template')

  // Assert
  expect(htmlTemplateElement).instanceOf(HTMLTemplateElement)
  expect(htmlTemplateElement.innerHTML).toStrictEqual(html)
})

test('Assert can create CSS Template element', () => {
  // Arrange
  const cssCode = `
  #test-text {
    font-size: 20px;
  }
  `

  // Act
  const cssElement = createCssTemplateElement(cssCode)
  const htmlElement = createHtmlElement('Hello', 'p')
  htmlElement.id = 'test-text'

  document.body.appendChild(cssElement.content.cloneNode(true))
  document.body.appendChild(htmlElement)

  const computedElement = document.querySelector('#test-text')
  const fontSize = parseFloat(window.getComputedStyle(computedElement, null).getPropertyValue('font-size'))

  // Assert
  expect(fontSize).toEqual(20)
})

test('Assert valid html name', () => {
  // Arrange
  const validNameOne = 'test-component'
  const validNameTwo = 'test-component-other'

  // Act
  const isValidOne = isValidHtmlName(validNameOne)
  const isValidTwo = isValidHtmlName(validNameTwo)

  // Assert
  expect(isValidOne).toBeTruthy()
  expect(isValidTwo).toBeTruthy()
})

test('Assert invalid html name', () => {
  // Arrange
  const invalidNameOne = 'div'
  const invalidNameTwo = 'customComponent'
  const invalidNameThree = 'my-Custom-Component'

  // Act
  const isInvalidOne = isValidHtmlName(invalidNameOne)
  const isInvalidTwo = isValidHtmlName(invalidNameTwo)
  const isInvalidThree = isValidHtmlName(invalidNameThree)

  // Assert
  expect(isInvalidOne).toBeFalsy()
  expect(isInvalidTwo).toBeFalsy()
  expect(isInvalidThree).toBeFalsy()
})

test('Assert no forbidden html name', () => {
  // Arrange
  const noForbiddenOne = 'my-component'
  const noForbiddenTwo = 'test-one-two'

  // Act
  const isValidOne = noForbiddenHtmlNames(noForbiddenOne)
  const isValidTwo = noForbiddenHtmlNames(noForbiddenTwo)

  // Assert
  expect(isValidOne).toBeTruthy()
  expect(isValidTwo).toBeTruthy()
})

test('Assert forbidden html name', () => {
  // Arrange
  const forbiddenNames = Object.freeze({
    'annotation-xml': 1,
    'color-profile': 2,
    'font-face': 3,
    'font-face-src': 4,
    'font-face-uri': 5,
    'font-face-format': 6,
    'font-face-name': 7,
    'missing-glyph': 8
  })

  const status = [] // store results.

  // Act
  for (const name in forbiddenNames) {
    status.push(noForbiddenHtmlNames(name))
  }

  // Assert
  for (let i = 0; i < status.length; i++) {
    expect(status[i]).toBeFalsy()
  }
})
