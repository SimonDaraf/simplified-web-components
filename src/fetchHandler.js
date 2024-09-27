/**
 * A fetch helper class.
 */
export class FetchHandler {
  /**
   * Fetches and returns the text content from given local url.
   *
   * @throws {Error} - If fetch failed.
   * @param {string} url - The url to the local file.
   * @param {object} fetchOptions - The fetch options.
   * @returns {Promise<string>} - The fetched content as a string.
   */
  async fetchLocal (url, fetchOptions) {
    // Fetch content.
    const response = await fetch(url, fetchOptions)

    // Validate response.
    if (!response.ok) {
      throw new Error(`Failed to fetch file from: ${url}`)
    }

    // Return the response as a string.
    return await response.text()
  }
}
