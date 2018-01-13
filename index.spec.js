const {
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
  matchers,
  regex,
  flags
} = require('.')
describe('rexrex', () => {
  test('regex', () => {
    const rex = regex(
      whole(
        or(
          numeric(7),
          capture(alpha(0, 3)),
          extra(matchers.ANY, matchers.LAZY)
        ),
      ),
      and(flags.GLOBAL, flags.INSENSITIVE)
    )
    expect(rex).toEqual(/^\d{7}|([A-z]{0,3})|.+?$/gi)
  })
  test('wildcard and lazy matchers', () => {
    let rex = or(
      wildcard('2', matchers.LAZY),
      extra('4', false)
    )
    expect(rex).toEqual('2*?|4+')
    rex = or(
      wildcard('2'),
      extra('4', true)
    )
    expect(rex).toEqual('2*|4+?')
  })
  test('flags', () => {
    expect(flags).toEqual({
      GLOBAL: 'g',
      MULTI_LINE: 'm',
      INSENSITIVE: 'i',
      STICKY: 'y',
      UNICODE: 'u'
    })
  })
  test('capture/group', () => {
    expect(capture('test')).toEqual('(test)')
    expect(capture('test', true)).toEqual('(?:test)')
    expect(capture('')).toEqual('')
    expect(capture()).toEqual('')
    expect(group('test')).toEqual('(?:test)')
  })
  test('ALL', () => expect(matchers.ALL).toEqual('(.|\\s)'))
  test('Repeat', () => {
    expect(repeat('8')).toEqual('8')
    expect(repeat('8', 1)).toEqual('8{1}')
    expect(repeat('8', 1, 2)).toEqual('8{1,2}')
    expect(repeat('8', 1, Infinity)).toEqual('8{1,}')
  })
})
