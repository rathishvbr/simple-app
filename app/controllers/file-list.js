import Controller from '@ember/controller';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class RiskListController extends Controller {
  @tracked
  selectedFile = A([]);
}
