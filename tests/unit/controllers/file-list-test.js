import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | file-list', function (hooks) {
  setupTest(hooks);

  test('file-list controller exists', function (assert) {
    let controller = this.owner.lookup('controller:file-list');
    assert.ok(controller);
  });

  test('should selectedFile length 0', function (assert) {
    let controller = this.owner.lookup('controller:file-list');
    assert.equal(
      controller.selectedFile.length,
      0,
      'initalize selected file size 0'
    );
  });
});
