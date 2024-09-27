# L2-1DV610-SimpleWebComponents

## Table of contents
* [Introduction](#introduction)
    * [Dependencies](#dependencies)
    * [Known Issues](#known-issues)
* [Installation](#installation)
    * [Manual](#manual)
    * [Using NPM](#using-npm)
* [Documentation](#documentation)
    * [WebComponent](./documentation/WebComponent.md)
    * [EventContainer](./documentation/EventContainer.md)
* [Example Usage](#example-usage)
* [Licence](#licence)

## Introduction <a name="introduction"></a>
The SimpleWebComponents package simplifies the process of using custom web components. Decreasing the amount of boilerplate code needed for each component.

* ### Dependencies <a name="dependencies"></a>
  * `ES2020`
  * `(dev): @rollup/plugin-node-resolve`
  * `(dev): rollup`

## Installation <a name="installation"></a>

* ### Using NPM <a name="using-npm"></a>
  `npm i simple-web-components`

## Documentation <a name="documentation"></a>

* ### [WebComponent](./documentation/WebComponent.md)
* ### [EventContainer](./documentation/EventContainer.md)

## Example Usage <a name="example-usage"></a>
```js
// Local URL's to files.
const MODULE_PATH = import.meta.url
const html = new URL('./button.html', MODULE_PATH)
const css = new URL('./button.css', MODULE_PATH)

// Create web component.
const buttonComponent = new WebComponent('button-component', html, css)

/**
 * Changes the container background color to a random color.
 *
 * @param {MouseEvent} event - The click event object.
 */
const clickEvent = function (event) {
  event.stopPropagation()

  // Check if our button fired event.
  if (event.target.id === 'my-button') {
    const container = event.currentTarget

    // Set a random color.
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10) // Number between [0 - 9].
    }

    container.style.backgroundColor = color
  }
}

// Register click event.
const clickEventContainer = new EventContainer('click', '#button-container', clickEvent)
buttonComponent.registerEvent(clickEventContainer)

// Define component.
await buttonComponent.defineComponent()
```

## Licence <a name=licence></a>
The source code is licensed under the MIT license, which can be found in the [LICENSE](./LICENSE) file.