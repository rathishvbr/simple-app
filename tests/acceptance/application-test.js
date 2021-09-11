import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting / should re-direct to file-list', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/file-list');
  });
});
