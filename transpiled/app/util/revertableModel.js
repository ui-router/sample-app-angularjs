"use strict";
/**
 * Provides an API wrapper for an model object allowing changes to be reverted, or dirty checked
 */
var RevertableModel = (function () {
    /**
     * Provide the constructor with the original model.
     * A deep copy is made, and set as the "editable" model.
     * A reference to the original model is saved to allow reverting later.
     */
    function RevertableModel(model) {
        this.editableModel = angular.copy(model);
        this.originalModel = model;
    }
    /** Returns true if the editable model does not .equals() the original model */
    RevertableModel.prototype.isDirty = function () {
        return !angular.equals(this.editableModel, this.originalModel);
    };
    /** Reverts the editable model to the original data */
    RevertableModel.prototype.revert = function () {
        angular.copy(this.originalModel, this.editableModel);
    };
    /** Resets the original data to be the same as the currently edited data */
    RevertableModel.prototype.clearDirty = function () {
        angular.copy(this.editableModel, this.originalModel);
    };
    return RevertableModel;
}());
exports.RevertableModel = RevertableModel;
//# sourceMappingURL=revertableModel.js.map