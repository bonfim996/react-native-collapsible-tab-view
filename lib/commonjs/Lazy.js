"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lazy = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _ScrollView = require("./ScrollView");

var _hooks = require("./hooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Typically used internally, but if you want to mix lazy and regular screens you can wrap the lazy ones with this component.
 */
const Lazy = _ref => {
  let {
    children,
    startMounted,
    cancelLazyFadeIn,
    raw
  } = _ref;
  const name = (0, _hooks.useTabNameContext)();
  const {
    focusedTab,
    refMap,
    scrollY,
    tabNames
  } = (0, _hooks.useTabsContext)();

  const [canMount, setCanMount] = _react.default.useState(!!startMounted);

  const [afterMount, setAfterMount] = _react.default.useState(!!startMounted);

  const isSelfMounted = _react.default.useRef(true);

  const opacity = (0, _reactNativeReanimated.useSharedValue)(cancelLazyFadeIn || startMounted ? 1 : 0);

  _react.default.useEffect(() => {
    return () => {
      isSelfMounted.current = false;
    };
  }, []);

  const allowToMount = () => {
    // wait the scene to be at least 50 ms focused, before mounting
    setTimeout(() => {
      if (focusedTab.value === name) {
        if (isSelfMounted.current) setCanMount(true); // we need to wait for the children rendering to complete so that we can scroll properly

        setTimeout(() => {
          if (isSelfMounted.current) setAfterMount(true);
        }, 10);
      }
    }, 50);
  };

  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return focusedTab.value === name;
  }, focused => {
    if (focused && !canMount) {
      (0, _reactNativeReanimated.runOnJS)(allowToMount)();
    }
  }, [canMount, focusedTab]);
  const scrollTo = (0, _hooks.useScroller)();
  const ref = name ? refMap[name] : null;
  (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (afterMount) {
      const tabIndex = tabNames.value.findIndex(n => n === name);

      if (ref && tabIndex >= 0 && !raw) {
        scrollTo(ref, 0, scrollY.value[tabIndex], false, `[${name}] lazy sync`);
      }

      if (!cancelLazyFadeIn && opacity.value !== 1) opacity.value = (0, _reactNativeReanimated.withTiming)(1);
    }
  }, [ref, cancelLazyFadeIn, opacity, name, afterMount, tabNames, scrollTo]);
  const stylez = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: opacity.value
    };
  }, []);
  return canMount ? cancelLazyFadeIn ? children : /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    pointerEvents: "box-none",
    style: [styles.container, !cancelLazyFadeIn && stylez]
  }, children) : /*#__PURE__*/_react.default.createElement(_ScrollView.ScrollView, null);
};

exports.Lazy = Lazy;

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=Lazy.js.map