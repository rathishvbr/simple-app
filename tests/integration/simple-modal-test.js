import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | simple-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('simple-modal renders', async function (assert) {
    assert.expect(2);

    await render(hbs`<SimpleModal />`);
    assert.equal(
      this.element.textContent.trim(),
      '×',
      'close button display default'
    );
    await render(hbs`
      <SimpleModal>
        foo
      </SimpleModal>
    `);

    assert.ok(
      this.element.textContent.includes('foo'),
      'yield content from outside'
    );
  });

  test('should open & close modal', async function (assert) {
    this.set('isModalOpen', true);
    this.set('onClose', () => {
      this.set('isModalOpen', false);
    });
    await render(
      hbs`<SimpleModal @openModal={{this.isModalOpen}} @onClose={{this.onClose}}/>`
    );
    assert.equal(
      this.element.querySelector('#base-modal').getAttribute('style'),
      'display: block;',
      'modal opened'
    );

    await click('[data-test-modal-close]');
    assert.equal(
      this.element.querySelector('#base-modal').getAttribute('style'),
      'display: none;',
      'modal closed'
    );
  });
});
