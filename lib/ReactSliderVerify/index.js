"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _useSliderVerify2 = _interopRequireDefault(require("./useSliderVerify"));

require("./index.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var defaultProps = {
  width: 400,
  height: 36,
  bgColor: "#F2F3F5",
  tips: "请按住滑块，拖动到最右边",
  barWidth: 80,
  bar: /*#__PURE__*/_react.default.createElement("span", null, " >>"),
  successBar: "✅",
  successBgColor: "#06ad06",
  successTips: "验证已通过",
  successShowBar: true
};

function ReactSliderVerify(props) {
  var width = props.width,
      height = props.height,
      bgColor = props.bgColor,
      tips = props.tips,
      successBgColor = props.successBgColor,
      successTips = props.successTips,
      barWidth = props.barWidth,
      bar = props.bar,
      successBar = props.successBar,
      successShowBar = props.successShowBar,
      onSuccess = props.onSuccess,
      innerRef = props.innerRef;

  var _useSliderVerify = (0, _useSliderVerify2.default)({
    width: width,
    barWidth: barWidth,
    onSuccess: onSuccess,
    innerRef: innerRef
  }),
      success = _useSliderVerify.success,
      isMove = _useSliderVerify.isMove,
      barLeft = _useSliderVerify.barLeft,
      modalWidth = _useSliderVerify.modalWidth,
      refBar = _useSliderVerify.refBar;

  var sliderVerifyStyle = {
    backgroundColor: bgColor,
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    lineHeight: "".concat(height, "px")
  };
  var barStyle = {
    width: "".concat(barWidth, "px"),
    // left: `${barLeft}px`,
    transitionDuration: !isMove ? ".4s" : "0s",
    transform: "translateX(".concat(success && !successShowBar ? modalWidth : barLeft, "px)")
  };
  var modalStyle = {
    backgroundColor: successBgColor,
    // width: `${modalWidth}px`,
    width: "".concat(width, "px"),
    left: "-".concat(width, "px"),
    transitionDuration: !isMove ? ".4s" : "0s",
    transform: "translateX(".concat(modalWidth, "px)")
  };
  var verifyTipsStyle = {
    transform: "translateX(".concat(success ? 0 : barWidth, "px)"),
    width: "".concat(success && !successShowBar ? width : width - barWidth, "px")
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: success ? "react-slider-verify react-slider-verify-success" : "react-slider-verify",
    style: sliderVerifyStyle
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slider-verify-tips",
    style: verifyTipsStyle
  }, success ? successTips : tips), /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-verify-bar",
    ref: refBar,
    style: barStyle
  }, success ? successBar : bar), /*#__PURE__*/_react.default.createElement("div", {
    className: "slider-verify-modal",
    style: modalStyle
  }));
}

ReactSliderVerify.defaultProps = defaultProps;

var _default = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(ReactSliderVerify, (0, _extends2.default)({}, props, {
    innerRef: ref
  }));
});

exports.default = _default;
module.exports = exports.default;