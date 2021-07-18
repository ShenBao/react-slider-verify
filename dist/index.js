(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.reactSliderVerify = {}, global.React));
})(this, (function (exports, React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function useSliderVerify(options) {
    var value = options.value,
        onChange = options.onChange,
        onSuccess = options.onSuccess,
        innerRef = options.innerRef,
        _options$width = options.width,
        width = _options$width === void 0 ? 320 : _options$width,
        _options$barWidth = options.barWidth,
        barWidth = _options$barWidth === void 0 ? 80 : _options$barWidth;
    var refBar = React.useRef();
    var refTmpData = React.useRef({
      max: width - barWidth,
      offX: 0,
      diff: 0,
      isMove: false
    });

    var _useState = React.useState(0),
        _useState2 = _slicedToArray(_useState, 2),
        barLeft = _useState2[0],
        setBarLeft = _useState2[1];

    var _useState3 = React.useState(0),
        _useState4 = _slicedToArray(_useState3, 2),
        modalWidth = _useState4[0],
        setModalWidth = _useState4[1];

    var _useState5 = React.useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        success = _useState6[0],
        setSuccess = _useState6[1];

    var onMouseDown = function onMouseDown(e) {
      // if (success) return;
      refTmpData.current.offX = e.pageX;
      document.addEventListener("mousemove", onMove);
    };

    var onMove = function onMove(e) {
      // if (success) return;
      var diff = e.pageX - refTmpData.current.offX;
      var barLeft = diff;
      var modalWidth = diff;
      refTmpData.current.diff = diff;
      refTmpData.current.isMove = true; // 边界判断 最大值

      if (barLeft >= refTmpData.current.max) {
        barLeft = refTmpData.current.max; // 是最大 max 的值

        modalWidth = width; // 最大宽度 是 外面容器的宽度

        refTmpData.current.isMove = false;
        setSuccess(true);
        onChange && onChange(true);
        onSuccess && onSuccess(); // 移除事件

        document.removeEventListener("mousemove", onMove);
        refBar.current.removeEventListener("mousedown", onMouseDown);
      } // 边界判断 小于 0


      if (diff <= 0) {
        barLeft = 0;
        modalWidth = 0;
      }

      setBarLeft(barLeft);
      setModalWidth(modalWidth);
    };

    var onMouseUp = function onMouseUp() {
      // 回到最初位置
      if (refTmpData.current.diff < refTmpData.current.max) {
        refTmpData.current.isMove = false;
        setBarLeft(0);
        setModalWidth(0);
      }

      document.removeEventListener("mousemove", onMove);
    };

    React.useEffect(function () {
      var left = refBar.current.getBoundingClientRect().left;
      refTmpData.current.offX = value ? left + width : left;
      refTmpData.current.diff = value ? width : 0;
      setBarLeft(value ? width - barWidth : 0);
      setModalWidth(value ? width : 0);
      setSuccess(!!value);
      if (value) return;
      refBar.current.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      return function () {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    }, [value]);

    var reset = function reset() {
      setSuccess(false);
      setBarLeft(0);
      setModalWidth(0);
      refBar.current.addEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    React.useImperativeHandle(innerRef, function () {
      return {
        reset: reset
      };
    });
    return {
      success: success,
      isMove: refTmpData.current.isMove,
      barLeft: barLeft,
      modalWidth: modalWidth,
      refBar: refBar
    };
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  var defaultProps = {
    value: false,
    width: 400,
    height: 36,
    bgColor: "#F2F3F5",
    tips: "请按住滑块，拖动到最右边",
    barWidth: 80,
    bar: /*#__PURE__*/React__default["default"].createElement("span", null, " >>"),
    successBar: "✅",
    successBgColor: "#06ad06",
    successTips: "验证已通过",
    successShowBar: true
  };

  function SliderVerify(props) {
    var value = props.value,
        onChange = props.onChange,
        onSuccess = props.onSuccess,
        innerRef = props.innerRef,
        width = props.width,
        height = props.height,
        bgColor = props.bgColor,
        tips = props.tips,
        successBgColor = props.successBgColor,
        successTips = props.successTips,
        barWidth = props.barWidth,
        bar = props.bar,
        successBar = props.successBar,
        successShowBar = props.successShowBar;

    var _useSliderVerify = useSliderVerify({
      value: value,
      onChange: onChange,
      onSuccess: onSuccess,
      innerRef: innerRef,
      width: width,
      barWidth: barWidth
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
      width: "".concat(width, "px"),
      left: "-".concat(width, "px"),
      transitionDuration: !isMove ? ".4s" : "0s",
      transform: "translateX(".concat(modalWidth, "px)")
    };
    var verifyTipsStyle = {
      transform: "translateX(".concat(success ? 0 : barWidth, "px)"),
      width: "".concat(success && !successShowBar ? width : width - barWidth, "px")
    };
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "react-slider-verify-wrapper ".concat(success ? "react-slider-verify-success" : ""),
      style: sliderVerifyStyle
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "slider-verify-tips",
      style: verifyTipsStyle
    }, success ? successTips : tips), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "slider-verify-bar",
      ref: refBar,
      style: barStyle
    }, success ? successBar : bar), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "slider-verify-modal",
      style: modalStyle
    }));
  }

  SliderVerify.defaultProps = defaultProps;
  var ReactSliderVerify = /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default["default"].createElement(SliderVerify, _objectSpread(_objectSpread({}, props), {}, {
      innerRef: ref
    }));
  });
  ReactSliderVerify.displayName = "ReactSliderVerify";

  exports.ReactSliderVerify = ReactSliderVerify;
  exports["default"] = ReactSliderVerify;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
