import Controller from '@ember/controller';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class RiskListController extends Controller {
  @tracked
  selectedFile = A([]);

  columns = [
    {
      property: 'name',
    },
    {
      property: 'device',
    },
    {
      property: 'path',
    },
    { property: 'status', highlight: 'available', captialize: true },
  ];

  alertColumns = [
    {
      property: 'device',
    },
    {
      property: 'path',
    },
  ];

  get downloadableFiles() {
    return this.selectedFile.filter((file) => file.status === 'available');
  }
}
