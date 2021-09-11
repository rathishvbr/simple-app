import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | file-list', function (hooks) {
  setupTest(hooks);

  test('file-list routes exists', function (assert) {
    let route = this.owner.lookup('route:file-list');
    assert.ok(route);
  });
});
