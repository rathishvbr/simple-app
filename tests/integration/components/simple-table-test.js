import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';

module('Integration | Component | simple-table', function (hooks) {
  setupRenderingTest(hooks);

  test('simple-table renders', async function (assert) {
    await render(hbs`<SimpleTable />`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('should show simple table', async function (assert) {
    this.setProperties({
      columns: [{ property: 'name' }],
      rows: [{ name: 'foo' }, { name: 'bar' }],
    });
    await render(
      hbs`<SimpleTable @columns={{this.columns}} @model={{this.rows}} @selection={{false}}/>`
    );
    assert.equal(
      this.element.querySelector('th').innerText,
      'Name',
      'Header captialized'
    );
    assert.equal(
      this.element.querySelector('td').innerText,
      'foo',
      'List displayed'
    );
  });

  hooks.beforeEach(function () {
    this.setProperties({
      columns: [{ property: 'foo' }],
      rows: [{ foo: 'bar1' }, { foo: 'bar2' }],
      selectedFile: A([]),
    });
  });

  test('should show table list with checkbox', async function (assert) {
    await render(
      hbs`<SimpleTable @columns={{this.columns}} @model={{this.rows}} @selection={{true}}  @selectedModel={{this.selectedFile}}/>`
    );
    assert.dom('[data-test-checkbox-for="0"]').hasProperty('type', 'checkbox');

    assert.dom('[data-test-checkbox-for="0"]').isNotChecked();
    await click('[data-test-checkbox-for="0"]');
    assert.dom('[data-test-checkbox-for="0"]').isChecked();
    assert
      .dom('[data-test-global-checkbox-label]')
      .hasText('Selected 1', 'The user sees the selected count text.');
  });

  test('should global checkbox for table', async function (assert) {
    await render(
      hbs`<SimpleTable @columns={{this.columns}} @model={{this.rows}} @selection={{true}}  @selectedModel={{this.selectedFile}}/>`
    );
    assert.dom('[data-test-global-checkbox]').hasProperty('type', 'checkbox');
    assert
      .dom('[data-test-global-checkbox-label]')
      .hasText('None selected', 'The user sees the none selected text.');
    assert.dom('[data-test-global-checkbox]').isNotChecked();
    await click('[data-test-global-checkbox]');
    assert
      .dom('[data-test-global-checkbox-label]')
      .hasText(
        'Selected 2',
        'The user sees the selected count text after global checkbox checked.'
      );
    assert.dom('[data-test-global-checkbox]').isChecked();
  });

  test('should row color change after selected', async function (assert) {
    await render(
      hbs`<SimpleTable @columns={{this.columns}} @model={{this.rows}} @selection={{true}}  @selectedModel={{this.selectedFile}}/>`
    );
    await click('[data-test-checkbox-for="0"]');
    assert
      .dom('[data-test-table-row="0"]')
      .hasStyle({ backgroundColor: 'rgb(238, 238, 238)' });
  });
});
