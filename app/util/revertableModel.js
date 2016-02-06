/**
 * Provides an API wrapper for an model object allowing changes to be reverted, or dirty checked
 */
export class RevertableModel {
  /**
   * Provide the constructor with the original model.
   * A deep copy is made, and set as the "editable" model.
   * A reference to the original model is saved to allow reverting later.
   */
  constructor(model) {
    this.editableModel = angular.copy(model);
    this.originalModel = model;
  }

  /** Returns true if the editable model does not .equals() the original model */
  isDirty() {
    return !angular.equals(this.editableModel, this.originalModel);
  }

  /** Reverts the editable model to the original data */
  revert() {
    angular.copy(this.originalModel, this.editableModel);
  }

  /** Resets the original data to be the same as the currently edited data */
  clearDirty() {
    angular.copy(this.editableModel, this.originalModel);
  }
}