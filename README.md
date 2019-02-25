# 🐺 `rexrex`

> Regular Expression utils that rock!

Create regular expressions that are composable, reusable, and commentable.

## Getting started

```sh
yarn add rexrex
```

## Utils

#### `whole`

```javascript
whole('sentence to match') // -> ^sentence to match$
```

#### `repeat`

```javascript
repeat('\\d') // -> \\d
repeat('\\d', 8) // -> \\d{8}
repeat('\\d', 1, 3) // -> \\d{1,3}
repeat('\\d', 1, Infinity) // -> \\d{1,}
```

#### `numeric`

Equivalent to `rex.repeat.bind(null, '\\d')`

#### `alpha`

Equivalent to `rex.repeat.bind(null, '[A-z]')`

#### `and`

```javascript
and('a', 'b', 'c') // -> 'abc'
```

#### `or`

```javascript
or('a', 'b', 'c') // -> 'a|b|c'
```

#### `wildcard` and `extra`

```javascript
wildcard('.') // -> '.*'
wildcard('.', true) // -> '.*?'
extra('.', matchers.LAZY) // -> '.+?'
extra('.', false) // -> '.+'
```

#### `capture`

```javascript
capture('\\d+?') // -> (\\d+?)
```

or you can name your capture group with `capture(pattern, name)`

```javascript
capture('\\d+?', 'number') // -> (?<number>\\d+?)
```

#### `group`

Similar to a capture(...), but won't keep the capture within the parentheses

```javascript
group('.|\\s') // -> (?:.|\\s)
```

### `look.(ahead|behind).(positive|negative)`

Creates a [negative or positive look-ahead](https://www.stefanjudis.com/today-i-learned/the-complicated-syntax-of-lookaheads-in-javascript-regular-expressions/)

```javascript
look.ahead.positive('Y') === look.ahead('Y') // -> '(?=y)'
look.ahead.negative('Y') // -> '(?!y)'
look.behind.positive('Y') === look.behind('Y') // -> '(?<=y)'
look.behind.negative('Y') // -> '(?<!y)'
```

#### `regex`

Equal to `RegExp` constructor

### Matchers

- `ALPHA`: `'[A-z]'`
- `WORD`: `'\\w'`
- `NUMBER`: `'\\d'`
- `WHITE_SPACE`: `'\\s'`
- `ANY`: `'.'`
- `START`: `'^'`
- `END`: `'$'`
- `LAZY`: `'?'`

### `not`

Matches opposite of `matchers`

```javascript
regex(matchers.not.ALPHA) // -> '[^A-z]'
```

### Flags

- `GLOBAL`: `'g'`
- `MULTI_LINE`: `'m'`
- `INSENSITIVE`: `'i'`
- `STICKY`: `'y'`
- `UNICODE`: `'u'`

### Examples

See `index.spec.js` for all the uses!

```javascript
// found in `graphql-types-drivers-license`

// Matches all New York Driver's licenses
regex(
  or(
    and(alpha(1), numeric(7)),
    and(alpha(1), numeric(18)),
    and(numeric(8, 9)),
    and(numeric(16)),
    and(alpha(8))
  )
)
// -> /[A-z]{1}\d{7}|[A-z]{1}\d{18}|\d{8,9}|\d{16}|[A-z]{8}/
```

```javascript
// matches GraphQL queries/mutations

regex(
  and(
    capture(
      and(
        capture(or(...GQL_TYPES)),
        extra(SPACE),
        extra(WORD),
        extra(SPACE),
        wildGroup(and('on', extra(SPACE), extra(WORD)))
      )
    ),
    wildcard(SPACE),
    wildGroup(
      and(extraGroup(and('{', extraGroup(CHARS))), extraGroup(and('}', extraGroup(CHARS))))
    ),
    '}'
  ),
  flags.GLOBAL
)

// -> /((fragment|query|mutation|subscription)\s+\w+\s+(on\s+\w+)*)\s*(({(\s|\w|(".*")|:|,|\.|\)|\()+)+(}(\s|\w|(".*")|:|,|\.|\)|\()+)+)+}/g
```

### Bonus

- Tiny!
- Super-readable!
- Changes make sense!
