# EventContainer : Class
## Description
The EventContainer is used to encapsulate events and any relating properties so that the web component can correctly assemble event listeners.

## Construction

### `constructor(eventName : string, eventListenerElementID : string, eventFunction : Function)`
* `eventName : string` - The name of the event to listen for.
* `eventListenerElementID : string` - The id of the element to attach the listener to, if omitted attach listener to custom component.
* `eventFunction : Function` - The function to invoke when the event is fired.

## Properties

### `eventName : string`
The name of the event to listen for.

### `eventListenerElementID : string`
The id of the element to attach the listener to, if omitted attach listener to custom component.

### `eventFunction : Function`
The function to invoke when the event is fired.

## Example

### Creating an EventContainer
```js
// Define event function.
// Make sure to include the event object as an argument.
/**
 * The event function.
 *
 * @param {MouseEvent} event - The click event object. 
 */
const evtFunc = function(event) {
  // Event logic...
}

const myEventContainer = new EventContainer('click', '#my-button', evtFunc);
```
[Read more regarding events...](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)