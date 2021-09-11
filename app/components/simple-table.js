import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';

export default class SimpleTableComponent extends Component {
  globalCheckBoxElement;

  @tracked
  globalSelection = false;

  @action
  setGlobalSelection(e) {
    this.globalCheckBoxElement = e;
  }

  @action
  selectFile(file, property, e) {
    set(this, property, e.target.checked);
    if (e.target.checked) {
      this.args.selectedModel.pushObject(file);
    } else {
      this.args.selectedModel.removeObject(file);
    }
    this.setGlobalCheckBox();
  }

  @action
  selectAll(e) {
    if (e.target.checked) {
      this.args.model.forEach((file, i) => {
        set(this, `file-${i}`, true);
      });
      if (this.args.selectedModel.length) {
        this.args.selectedModel.clear();
      }
      this.args.selectedModel.pushObjects(this.args.model);
    } else {
      this.args.model.forEach((file, i) => {
        set(this, `file-${i}`, false);
      });
      this.args.selectedModel.clear();
    }
  }

  setGlobalCheckBox() {
    const allSelected =
      this.args.selectedModel.length === this.args.model.length;
    const nothingSelected = this.args.selectedModel.length === 0;
    const someSelected =
      this.args.selectedModel.length > 0 &&
      this.args.selectedModel.length < this.args.model.length;
    if (allSelected) {
      this.globalCheckBoxElement.checked = true;
      this.globalCheckBoxElement.indeterminate = false;
    } else if (nothingSelected) {
      this.globalCheckBoxElement.checked = false;
      this.globalCheckBoxElement.indeterminate = false;
    } else if (someSelected) {
      this.globalCheckBoxElement.checked = false;
      this.globalCheckBoxElement.indeterminate = true;
    }
  }
}
