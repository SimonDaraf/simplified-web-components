import { expect, test } from 'vitest'
import { WebComponent } from '../src/webComponent.js'
import { EventContainer } from '../src/eventContainer.js'

test('Assert component name is valid', () => {
  // Arrange
  const validName = 'my-component'

  // Act
  const webComp = new WebComponent(validName, 'url/test', 'url/test')

  // Assert
  expect(webComp.componentName).toStrictEqual(validName)
})

test('Assert component name is invalid', () => {
  // Arrange
  const invalidNameOne = 'div'
  const invalidNameTwo = 'myComponent'

  // Act, Assert
  expect(() => { return new WebComponent(invalidNameOne, 'test/url', 'test/url') }).toThrowError()
  expect(() => { return new WebComponent(invalidNameTwo, 'test/url', 'test/url') }).toThrowError()
})

test('Assert html is valid', () => {
  // Arrange
  const validOne = document.createElement('template')
  const validTwo = 'test/url'
  const validThree = new URL('./test/url', import.meta.url)

  // Act, Assert
  expect(new WebComponent('test-component', validOne, 'test/url')).instanceOf(WebComponent)
  expect(new WebComponent('test-component', validTwo, 'test/url')).instanceOf(WebComponent)
  expect(new WebComponent('test-component', validThree, 'test/url')).instanceOf(WebComponent)
})

test('Assert html is invalid', () => {
  // Arrange
  const invalidHtml = { }

  // Act, Assert
  expect(() => { return new WebComponent('my-component', invalidHtml, 'test/url') }).toThrowError()
})

test('Assert css is valid', () => {
  // Arrange
  const validOne = document.createElement('template')
  const validTwo = 'test/url'
  const validThree = new URL('./test/url', import.meta.url)

  // Act, Assert
  expect(new WebComponent('test-component', 'test/url', validOne)).instanceOf(WebComponent)
  expect(new WebComponent('test-component', 'test/url', validTwo)).instanceOf(WebComponent)
  expect(new WebComponent('test-component', 'test/url', validThree)).instanceOf(WebComponent)
})

test('Assert css is invalid', () => {
  // Arrange
  const invalidCss = { }

  // Act, Assert
  expect(() => { return new WebComponent('my-component', 'test/url', invalidCss) }).toThrowError()
})

test('Creates a custom web component and ensures it has been added to the DOM.', () => {
  // Arrange
  const name = 'test-creation'
  const htmlTemplate = document.createElement('template')
  htmlTemplate.innerHTML = `
  <div>This element has been added.</div>
  `
  // Not necessary for this test.
  const cssTemplate = document.createElement('template')

  // Create component.
  const component = new WebComponent(name, htmlTemplate, cssTemplate)

  // Act
  component.defineComponent()
  const elementInstance = document.createElement(name)
  document.body.appendChild(elementInstance)
  const element = document.querySelector(name)

  // Assert
  expect(element).toBeDefined()
})

test('Ensure custom web component content is correctly set.', () => {
  // Arrange
  const name = 'test-html'

  // Create html template.
  const htmlTemplate = document.createElement('template')
  htmlTemplate.innerHTML = `
  <div>This element has been added.</div>
  `

  // Not necessary for this test.
  const cssTemplate = document.createElement('template')

  // Create component.
  const component = new WebComponent(name, htmlTemplate, cssTemplate)

  // Act
  component.defineComponent()
  const elementInstance = document.createElement(name)
  document.body.appendChild(elementInstance)
  const element = document.querySelector(name)

  // Assert
  expect(element.shadowRoot.innerHTML).equal(htmlTemplate.innerHTML)
})

test('Ensure registered events can fire', () => {
  // Arrange
  let wasClicked = false
  let idOfTarget = ''

  const name = 'test-event'

  // Create html template.
  const htmlTemplate = document.createElement('template')
  htmlTemplate.innerHTML = `
  <button id="test-button">A Button.</button>
  `

  // Not necessary for this test.
  const cssTemplate = document.createElement('template')

  // Create component.
  const component = new WebComponent(name, htmlTemplate, cssTemplate)

  /**
   * The event function to use.
   *
   * @param {object} event - The event object.
   */
  const eventFunction = function (event) {
    event.stopPropagation()

    // Set was clicked to indicate logic has been executed.
    wasClicked = true
    idOfTarget = event.target.id
  }

  // Act
  component.registerEvent(new EventContainer('click', '#test-button', eventFunction))
  component.defineComponent()
  const elementInstance = document.createElement(name)
  document.body.appendChild(elementInstance)
  const element = document.querySelector(name)
  const button = element.shadowRoot.querySelector('#test-button')

  const clickEvent = new Event('click') // Used to simulate the actual event.
  button.dispatchEvent(clickEvent)

  // Assert
  expect(wasClicked).equal(true)
  expect(idOfTarget).equal('test-button')
})
