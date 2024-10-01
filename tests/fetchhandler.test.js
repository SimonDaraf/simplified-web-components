import { expect, test, vi } from 'vitest'
import { FetchHandler } from '../src/fetchHandler.js'

global.fetch = vi.fn()
const fetchHandler = new FetchHandler()

/**
 * Function used to help with mocking a fetch response for tests.
 *
 * @param {string} data - The data to fetch.
 * @param {boolean} ok - Mock response status.
 * @returns {object} - The response data.
 */
function createFetchResponse (data, ok = true) {
  /* eslint-disable jsdoc/require-jsdoc */
  return {
    ok,
    text: () => new Promise((resolve) => resolve(data))
  }
}

test('Assert can fetch html', async () => {
  const fetchResponse = '<div>Mock html</div>'
  const url = './sometesturl/myfile.html' // This can be whatever, we mock the actual fetch.
  const options = {
    headers: {
      Accept: 'text/html'
    }
  }

  fetch.mockResolvedValue(createFetchResponse(fetchResponse, true))

  const response = await fetchHandler.fetchLocal(url, options)

  expect(fetch).toHaveBeenCalledWith(url, options)
  expect(response).toStrictEqual(fetchResponse)
})

test('Assert can fetch css', async () => {
  const fetchResponse = `
  body {
    margin: 0;
  }
  `
  const url = './sometesturl/myfile.css'
  const options = {
    headers: {
      Accept: 'text/css'
    }
  }

  fetch.mockResolvedValue(createFetchResponse(fetchResponse, true))

  const response = await fetchHandler.fetchLocal(url, options)

  expect(fetch).toHaveBeenCalledWith(url, options)
  expect(response).toStrictEqual(fetchResponse)
})
