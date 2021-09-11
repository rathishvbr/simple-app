import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SimpleModalComponent extends Component {
  isModalOpen = false;

  @action
  closeModal() {
    this.args.onClose && this.args.onClose();
  }
}
