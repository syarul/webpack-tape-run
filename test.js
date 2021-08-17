var test = require('tape')

test('test success', function(t) {
  t.plan(2)
  t.equal(1, 1)
  t.equal('foo', 'bar')
  t.end()
})