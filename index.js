const ALPHA = '[A-z]'
const NOT_ALPHA = '[^A-z]'
const WORD = '\\w'
const NOT_WORD = '\\W'
const NUMBER = '\\d'
const NOT_NUMBER = '\\D'
const WHITE_SPACE = '\\s'
const NOT_WHITE_SPACE = '\\S'
const ANY = '.'
const START = '^'
const END = '$'
const LAZY = '?'
const GROUP = '?:'

const whole = v => `${START}${v}${END}`
const repeat = (v, start, end) => {
  const finish = end === Infinity ? '' : end

  return `${v}${start == null ? '' : `{${start}`}${finish != null ? `,${finish}` : ''}${
    start == null ? '' : '}'
  }`
}

const numeric = repeat.bind(null, NUMBER)
const alpha = repeat.bind(null, ALPHA)

const and = (...rest) => rest.join('')
const or = (...rest) => rest.join('|')

const wildcard = (v, lazy) => `${v}*${lazy ? LAZY : ''}`
const extra = (v, lazy) => `${v}+${lazy ? LAZY : ''}`

const capture = (v, name) =>
  v && v.length ? `(${typeof name === 'string' ? `?<${name}>` : ''}${v})` : ''

const group = v => (v && v.length ? `(${GROUP}${v})` : '')

const ALL = capture(or(ANY, WHITE_SPACE)) // matches any character or whitespace

const look = (posOrNeg, behindOrAhead) => text =>
  `(?${behindOrAhead ? '<' : ''}${posOrNeg ? '=' : '!'}${text})`

const regex = (...args) => new RegExp(...args)

module.exports = exports.default = {
  whole,
  repeat,
  alpha,
  numeric,
  and,
  or,
  wildcard,
  extra,
  capture,
  group,
  look: {
    ahead: Object.assign(look(true, false), {
      positive: look(true, false),
      negative: look(false, false)
    }),
    behind: Object.assign(look(true, true), {
      positive: look(true, true),
      negative: look(false, true)
    })
  },
  matchers: {
    ALL,
    ANY,
    LAZY,
    GROUP,
    ALPHA,
    NUMBER,
    WORD,
    WHITE_SPACE,
    START,
    END,
    not: {
      ALPHA: NOT_ALPHA,
      NUMBER: NOT_NUMBER,
      WORD: NOT_WORD,
      WHITE_SPACE: NOT_WHITE_SPACE
    }
  },
  flags: {
    GLOBAL: 'g',
    MULTI_LINE: 'm',
    INSENSITIVE: 'i',
    STICKY: 'y',
    UNICODE: 'u'
  },
  regex
}
