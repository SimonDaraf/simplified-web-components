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
    this.#setEventName(eventName)
    this.#setEventListenerElementID(eventListenerElementID)
    this.#setEventFunction(eventFunction)
  }

  /**
   * Sets the new event name.
   *
   * @throws {Error} - If invalid event name is provided.
   * @param {string} newEventName - The new event name.
   */
  #setEventName (newEventName) {
    if (typeof (newEventName) !== 'string') {
      throw new Error('Invalid type of event name, expected type: string')
    }

    this.#eventName = newEventName
  }

  /**
   * Sets the new event listener element id.
   *
   * @throws {Error} - If invalid event listener element id is provided.
   * @param {string} newEventListenerElementID - The new event listener element id.
   */
  #setEventListenerElementID (newEventListenerElementID) {
    if (typeof (newEventListenerElementID) !== 'string') {
      throw new Error('Invalid type of event listener element id, expected type: string')
    }

    // If no prefix is defined, we define it here for the user.
    if (newEventListenerElementID.charAt(0) !== '#') {
      newEventListenerElementID = '#' + newEventListenerElementID
    }

    this.#eventListenerElementID = newEventListenerElementID
  }

  /**
   * Sets the new EventFunction.
   *
   * @throws {Error} - If new event function is not a function.
   * @param {Function} newEventFunction - The new function.
   */
  #setEventFunction (newEventFunction) {
    if (!(newEventFunction instanceof Function)) {
      throw new Error('Invalid type of event function, expected type: function')
    }

    this.#eventFunction = newEventFunction
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
