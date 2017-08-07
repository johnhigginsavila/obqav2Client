"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var upload_item_1 = require("../../shared/upload-item");
var StudentGradeUploadItem = (function (_super) {
    __extends(StudentGradeUploadItem, _super);
    function StudentGradeUploadItem(file) {
        var _this = _super.call(this) || this;
        _this.url = '/grade/upload';
        _this.file = file;
        return _this;
    }
    return StudentGradeUploadItem;
}(upload_item_1.UploadItem));
exports.StudentGradeUploadItem = StudentGradeUploadItem;
//# sourceMappingURL=upload-student-grade.js.map