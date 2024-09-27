# WebComponent : Class
## Description
The WebComponent class allows users to more easily create user-defined elements based on the web component practice, removing most of the duplicate code needed for every custom web component.
[Read more...](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

## Construction

### `constructor(componentName : string, html : HTMLTemplateElement|string, css : HTMLTemplateElement|string) : WebComponent`
* `componentName : string` - The name to be used when initializing the HTML element.
* `html : HTMLTemplateElement|string` - A template element containing the HTML content. | The local URL to the html file.
* `css : HTMLTemplateElement|string` - A template element containing the CSS content. | The local URL to the CSS file.

## Properties

### `componentName : string`
The component name. This is what's used to initialize the element.

## Methods

### `registerEvent(event : EventContainer) : void`
Registers an event to the web component.

* `event : EventContainer` - The event container to register.

### `async defineComponent() : void`
Registers the web component allowing users to create instances of the custom element within the DOM.

## Examples

### Example Using Template Elements.
```js
// Define a html template.
const htmlTemplate = document.createElement('template');
htmlTemplate.innerHtml = `
<h1 class="my-header">My Component</h1>
<button id="my-button">Click Me!</button>
`;

// Define a css template.
const cssTemplate = document.createElement('template');
cssTemplate.innerHtml = `
<style>
  .my-header {
    font-size: 20px;
  }
</style>
`;

// Create web component.
const component = new WebComponent('my-component', htmlTemplate, cssTemplate);

// Register the component.
await component.defineComponent();

// The element can then be created.
const myElement = document.createElement('my-component');
```

### Example Using URL.
```js
// Local URL to HTML file.
const html = './template.html';

// Local URL to CSS file.
const css = './template.css';

// Create web component.
const component = new WebComponent('my-component', html, css);

// Register the component.
await component.defineComponent();

// The element can then be created.
const myElement = document.createElement('my-component');
```

### Register Events.
```js
// Create web component.
const component = new WebComponent('my-component', html, css);

// Create event function.
const evtFunc = function(event) {
  // Event logic...
}

// Create event.
const myEvent = new EventContainer('click', '#my-button', evtFunc);

// Make sure to register any events before defining.
component.registerEvent(myEvent);

// Register the component.
await component.defineComponent();

// The element can then be created.
const myElement = document.createElement('my-component');
```