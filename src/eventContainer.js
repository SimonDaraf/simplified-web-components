/**
 * Used to bind events to specific element within a web component.
 */
export class EventContainer {
  /**
   * The name of the event.
   *
   * @type {string}
   */
  #eventName

  /**
   * The id of the element that should catch the dispatched event.
   *
   * @type {string}
   */
  #eventListenerElementID

  /**
   * The function to be invoked when the event is catched.
   *
   * @type {Function}
   */
  #eventFunction

  /**
   * Constructs a new instance of the EventContainer.
   *
   * @param {string} eventName - The name of the event to listen for.
   * @param {string} eventListenerElementID - The id of the element to catch the event.
   * @param {Function} eventFunction - The function to invoke when the event is catched, the function passed needs an argument for the event object.
   */
  constructor (eventName, eventListenerElementID, eventFunction) {
    this.#eventName = eventName
    this.#eventListenerElementID = eventListenerElementID
    this.#eventFunction = eventFunction
  }

  /**
   * Getter for event name.
   *
   * @readonly
   * @returns {string} - The event name.
   */
  get eventName () {
    return this.#eventName
  }

  /**
   * Getter for event listener element id.
   *
   * @readonly
   * @returns {string} - The event listener element id.
   */
  get eventListenerElementID () {
    return this.#eventListenerElementID
  }

  /**
   * Getter for the event function.
   *
   * @readonly
   * @returns {Function} - The event function.
   */
  get eventFunction () {
    return this.#eventFunction
  }
}
