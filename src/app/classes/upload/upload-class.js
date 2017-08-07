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
var ClassUploadItem = (function (_super) {
    __extends(ClassUploadItem, _super);
    function ClassUploadItem(file) {
        var _this = _super.call(this) || this;
        _this.url = '/class/upload';
        _this.file = file;
        return _this;
    }
    return ClassUploadItem;
}(upload_item_1.UploadItem));
exports.ClassUploadItem = ClassUploadItem;
//# sourceMappingURL=upload-class.js.map