# pwix:toggle-switch

## What is it ?

A simple toggle switch Blaze component for Meteor.

Why this package?

Well because we cannot just copy a Blaze component in each and every package or application which would need it:
- first, because this is always a bad idea to just duplicate code, as this obviously also duplicates maintenance efforts and bugs
- second, because Blaze has a single namespace per application, and so refuses to have a duplicated component name.

## Installation

This Meteor package is installable with the usual command:

```sh
    meteor add pwix:toggle-switch
```

## Usage

Very simple:

### In your HTML template

```html
    {{> toggleSwitch (switchParms) }}
```

### In your template helper

```js
    switchParms(){
        return {
            labelLeft: 'my label'
        }
    }
```

## Provides

### Blaze components

#### `toggleSwitch`

A simple toggle switch:

- an example with a `labelBottom` set, switch is « On »

    ![switch on](/maintainer/png/toggle-switch-on.png)

- an example with a `labelBottom` set, switch is « Off »

    ![switch on](/maintainer/png/toggle-switch-off.png)

- an example with `labelTop` and `labelBottom` set

    ![switch top+bottom](/maintainer/png/toggle-switch-top.png)

- an example with `labelLeft` and `labelRight` set

    ![switch left+right](/maintainer/png/toggle-switch-left.png)

The component is configurable with an object passed as an argument, which may contain:

- `name`

    A string which is expected to uniquely identify the toggle switch.

- `labelTop`
- `labelRight`
- `labelBottom`
- `labelLeft`

    An HTML string to be displayed above (resp. on the right, below, on the left) of the button, defaulting to none.

- `title`

    A string to be used as the button title, defaulting to none.

- `state`

    Whether the switch is initially « On », defaulting to `true`.

- `enabled`

    Whether the switch is enabled, defaulting to `true`.

#### Informational events

- `ts-answer`

    The message is triggered as an answer to `ts-request` received event.

    It holds associated `{ name: <name>, state: <state>, enable: <enabled> }` data.

- `ts-state`

    The message is triggered each time the state of the toggle switch changes.

    It holds associated `{ name: <name>, state: <new_state> }` data, where &lt;new_state&gt; is `true` (resp. `false`) when switch is « On » (resp. « Off »).

#### Action events

- `ts-request`

    The message can be sent to the `toggleSwitch` component class to request a `ts-answer` answer.

## Configuration

None at the moment.

## NPM peer dependencies

None at the moment.

## Translations

None at the moment.

## Cookies and comparable technologies

None at the moment.

## Issues & help

In case of support or error, please report your issue request to our [Issues tracker](https://github.com/trychlos/pwix-toggle-switch/issues).

---
P. Wieser
- Last updated on 2025, Jul. 8th