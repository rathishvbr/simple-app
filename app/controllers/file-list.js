import Controller from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { downloadJSON } from '../utils/download-json';

export default class RiskListController extends Controller {
  @tracked
  selectedFile = A([]);

  @tracked
  isModalOpen = false;

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

  @action
  downloadAvailableFile() {
    downloadJSON(this.downloadableFiles);
    this.isModalOpen = false;
  }
}
