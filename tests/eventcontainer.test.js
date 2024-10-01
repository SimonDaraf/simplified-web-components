import { expect, test } from 'vitest'
import { EventContainer } from '../src/eventContainer.js'

test('Assert valid event name', () => {
  // Arrange
  const validName = 'click'

  // Act
  const eventContainer = new EventContainer(validName, '#test', () => { return true })

  // Assert
  expect(eventContainer.eventName).toStrictEqual(validName)
})

test('Assert invalid event name', () => {
  // Arrange
  const invalidName = { }

  // Act, Assert
  expect(() => { return new EventContainer(invalidName, '#test', () => { return true }) }).toThrowError()
})

test('Assert valid event listener element id name', () => {
  // Arrange
  const validELEID = '#test'

  // Act
  const eventContainer = new EventContainer('click', validELEID, () => { return true })

  // Assert
  expect(eventContainer.eventListenerElementID).toStrictEqual(validELEID)
})

test('Assert invalid event listener element id name', () => {
  // Arrange
  const invalidELEID = { }

  // Act, Assert
  expect(() => { return new EventContainer('click', invalidELEID, () => { return true }) }).toThrowError()
})

test('Assert append prefix if missing on id', () => {
  // Arrange
  const missingPrefix = 'test'
  const expected = '#test'

  // Act
  const eventContainer = new EventContainer('click', missingPrefix, () => { return true })

  // Assert
  expect(eventContainer.eventListenerElementID).toStrictEqual(expected)
})

test('Assert valid event function', () => {
  // Arrange
  // eslint-disable-next-line jsdoc/require-jsdoc
  const validFunctionOne = function () {
    return true
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  const validFunctionTwo = async function () {
    return true
  }

  // Act
  const eventContainerOne = new EventContainer('click', 'test', validFunctionOne)
  const eventContainerTwo = new EventContainer('click', 'test', validFunctionTwo)

  // Assert
  expect(eventContainerOne.eventFunction).toStrictEqual(validFunctionOne)
  expect(eventContainerTwo.eventFunction).toStrictEqual(validFunctionTwo)
})

test('Assert invalid event function', () => {
  // Arrange
  const invalidFunction = 'invalid'

  // Act, Assert
  expect(() => { return new EventContainer('click', '#test', invalidFunction) }).toThrowError()
})
