# pwix:toggle-switch

## What is it

A simple toggle switch Blaze component for Meteor.

Why this package?

Well because we cannot just copy a Blaze component in each and every package or application which would need it:
- first, because this vwould be bad as just duplicating code and thus bugs
- second, because Blaze has a single namespace per application, and so refuses to have a duplicated component name.

## Usage

Very simple:

### In your HTML template

```
    {{> toggleSwitch (switchParms) }}
```

### In your template helper

```
    switchParms(){
        return {
            labelLeft: 'my label'
        }
    }
```

## Configuration

None at the moment.

## Provides

### Blaze components

### `toggleSwitch`

A simple toggle switch.

The component is configurable with an object passed as an argument, which may contain:

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

## NPM peer dependencies

This package has no NPM dependencies.

---
P. Wieser
- Last updated on 2023, Apr. 20th
