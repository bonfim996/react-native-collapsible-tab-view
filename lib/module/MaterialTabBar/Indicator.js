function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate } from 'react-native-reanimated';
import { isRTL } from '../helpers';
const IndicatorComponent = /*#__PURE__*/React.createElement(View, null);

const Indicator = _ref => {
  let {
    indexDecimal,
    itemsLayout,
    style,
    fadeIn = false,
    ...rest
  } = _ref;
  const opacity = useSharedValue(fadeIn ? 0 : 1);
  const stylez = useAnimatedStyle(() => {
    var _itemsLayout$;

    const transform = itemsLayout.length > 1 ? [{
      translateX: interpolate(indexDecimal.value, itemsLayout.map((_, i) => i), // when in RTL mode, the X value should be inverted
      itemsLayout.map(v => isRTL ? -1 * v.x : v.x))
    }] : undefined;
    const width = itemsLayout.length > 1 ? interpolate(indexDecimal.value, itemsLayout.map((_, i) => i), itemsLayout.map(v => v.width)) : (_itemsLayout$ = itemsLayout[0]) === null || _itemsLayout$ === void 0 ? void 0 : _itemsLayout$.width;
    return {
      transform,
      width,
      opacity: withTiming(opacity.value)
    };
  }, [indexDecimal, itemsLayout]);
  React.useEffect(() => {
    if (fadeIn) {
      opacity.value = 1;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [fadeIn]);
  return /*#__PURE__*/React.createElement(Animated.View, _extends({
    style: [stylez, styles.indicator, style]
  }, rest));
};

const styles = StyleSheet.create({
  indicator: {
    height: 2,
    backgroundColor: '#2196f3',
    position: 'absolute',
    bottom: 0
  }
});
export { Indicator, IndicatorComponent };
//# sourceMappingURL=Indicator.js.map