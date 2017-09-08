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

const whole = v => `${START}${v}${END}`
const repeat = (v, start, finish) =>
  `${v}${start == null ? '' : `{${start}`}${finish ? `,${finish}` : ''}${start == null ? '' : '}'}`

const numeric = repeat.bind(null, NUMBER)
const alpha = repeat.bind(null, ALPHA)

const and = (...rest) => rest.join('')
const or = (...rest) => rest.join('|')

const wildcard = (v, lazy) => `${v}*${lazy ? LAZY : ''}`
const extra = (v, lazy) => `${v}+${lazy ? LAZY : ''}`

const capture = v => v && v.length ? `(${v})` : ''

const ALL = capture(or(ANY, WHITE_SPACE)) // matches any character or whitespace

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
  matchers: {
    ALL,
    ANY,
    LAZY,
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

console.log(regex(
  or(
    and(alpha(1), numeric(7)),
    and(alpha(1), numeric(18)),
    and(numeric(8, 9)),
    and(numeric(16)),
    and(alpha(8)),
  )
));
