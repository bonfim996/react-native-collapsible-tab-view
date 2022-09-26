"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAfterMountEffect = useAfterMountEffect;
exports.useAnimatedDynamicRefs = useAnimatedDynamicRefs;
exports.useAnimatedTabIndex = useAnimatedTabIndex;
exports.useChainCallback = useChainCallback;
exports.useCollapsibleStyle = useCollapsibleStyle;
exports.useContainerRef = useContainerRef;
exports.useConvertAnimatedToValue = useConvertAnimatedToValue;
exports.useCurrentTabScrollY = useCurrentTabScrollY;
exports.useFocusedTab = useFocusedTab;
exports.useHeaderMeasurements = useHeaderMeasurements;
exports.useScrollHandlerY = exports.usePageScrollHandler = void 0;
exports.useScroller = useScroller;
exports.useSharedAnimatedRef = useSharedAnimatedRef;
exports.useTabNameContext = useTabNameContext;
exports.useTabProps = useTabProps;
exports.useTabsContext = useTabsContext;
exports.useUpdateScrollViewContentSize = useUpdateScrollViewContentSize;

var _react = require("react");

var _reactNative = require("react-native");

var _reactNativeReanimated = require("react-native-reanimated");

var _Context = require("./Context");

var _helpers = require("./helpers");

function useContainerRef() {
  return (0, _reactNativeReanimated.useAnimatedRef)();
}

function useAnimatedDynamicRefs() {
  const [map, setMap] = (0, _react.useState)({});

  const setRef = (key, ref) => {
    setMap(map => ({ ...map,
      [key]: ref
    }));
    return ref;
  };

  return [map, setRef];
}

function useTabProps(children, tabType) {
  const options = () => {
    const tabOptions = new Map();

    if (children) {
      _react.Children.forEach(children, (element, index) => {
        if (!element) return;
        if (element.type !== tabType) throw new Error('Container children must be wrapped in a <Tabs.Tab ... /> component'); // make sure children is excluded otherwise our props will mutate too much

        const {
          name,
          children,
          ...options
        } = element.props;
        if (tabOptions.has(name)) throw new Error(`Tab names must be unique, ${name} already exists`);
        tabOptions.set(name, {
          index,
          name,
          ...options
        });
      });
    }

    return tabOptions;
  };

  const opts = options();
  const optionKeys = Array.from(opts.keys());
  return [opts, optionKeys];
}
/**
 * Hook exposing some useful variables.
 *
 * ```tsx
 * const { focusedTab, ...rest } = useTabsContext()
 * ```
 */


function useTabsContext(raw) {
  const c = (0, _react.useContext)(_Context.Context);

  if (!c) {
    if (raw) {
      return null;
    }

    throw new Error('useTabsContext must be inside a Tabs.Container');
  }

  return c;
}
/**
 * Access the parent tab screen from any deep component.
 *
 * ```tsx
 * const tabName = useTabNameContext()
 * ```
 */


function useTabNameContext() {
  const c = (0, _react.useContext)(_Context.TabNameContext);
  if (!c) throw new Error('useTabNameContext must be inside a TabNameContext');
  return c;
}
/**
 * Hook to access some key styles that make the whole thing work.
 *
 * You can use this to get the progessViewOffset and pass to the refresh control of scroll view.
 */


function useCollapsibleStyle() {
  const {
    headerHeight,
    tabBarHeight,
    containerHeight,
    width,
    allowHeaderOverscroll
  } = useTabsContext();
  const [containerHeightVal, tabBarHeightVal, headerHeightVal] = [useConvertAnimatedToValue(containerHeight), useConvertAnimatedToValue(tabBarHeight), useConvertAnimatedToValue(headerHeight)];
  return {
    style: {
      width
    },
    contentContainerStyle: {
      minHeight: _helpers.IS_IOS && !allowHeaderOverscroll ? (containerHeightVal || 0) - (tabBarHeightVal || 0) : (containerHeightVal || 0) + (headerHeightVal || 0),
      paddingTop: _helpers.IS_IOS && !allowHeaderOverscroll ? 0 : (headerHeightVal || 0) + (tabBarHeightVal || 0)
    },
    progressViewOffset: // on iOS we need the refresh control to be at the top if overscrolling
    _helpers.IS_IOS && allowHeaderOverscroll ? 0 : // on android we need it below the header or it doesn't show because of z-index
    (headerHeightVal || 0) + (tabBarHeightVal || 0)
  };
}

function useUpdateScrollViewContentSize(_ref) {
  let {
    name
  } = _ref;
  const {
    tabNames,
    contentHeights
  } = useTabsContext();
  const setContentHeights = (0, _react.useCallback)((name, height) => {
    const tabIndex = tabNames.value.indexOf(name);
    contentHeights.value[tabIndex] = height;
    contentHeights.value = [...contentHeights.value];
  }, [contentHeights, tabNames]);
  const scrollContentSizeChange = (0, _react.useCallback)((_, h) => {
    (0, _reactNativeReanimated.runOnUI)(setContentHeights)(name, h);
  }, [setContentHeights, name]);
  return scrollContentSizeChange;
}
/**
 * Allows specifying multiple functions to be called in a sequence with the same parameters
 * Useful because we handle some events and need to pass them forward so that the caller can handle them as well
 * @param fns array of functions to call
 * @returns a function that once called will call all passed functions
 */


function useChainCallback(fns) {
  const callAll = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    fns.forEach(fn => {
      if (typeof fn === 'function') {
        fn(...args);
      }
    });
  };

  return callAll;
}

function useScroller() {
  const {
    contentInset
  } = useTabsContext();

  const scroller = (ref, x, y, animated, _debugKey) => {
    'worklet';

    if (!ref) return; //! this is left here on purpose to ease troubleshooting (uncomment when necessary)
    // console.log(
    //   `${_debugKey}, y: ${y}, y adjusted: ${y - contentInset.value}`
    // )

    (0, _helpers.scrollToImpl)(ref, x, y - contentInset.value, animated);
  };

  return scroller;
}

const useScrollHandlerY = name => {
  const {
    accDiffClamp,
    focusedTab,
    snapThreshold,
    revealHeaderOnScroll,
    refMap,
    tabNames,
    index,
    headerHeight,
    contentInset,
    containerHeight,
    scrollYCurrent,
    scrollY,
    oldAccScrollY,
    accScrollY,
    offset,
    headerScrollDistance,
    snappingTo,
    contentHeights,
    indexDecimal,
    allowHeaderOverscroll
  } = useTabsContext();
  const enabled = (0, _reactNativeReanimated.useSharedValue)(false);
  const enable = (0, _react.useCallback)(toggle => {
    enabled.value = toggle;
  }, [enabled]);
  /**
   * Helper value to track if user is dragging on iOS, because iOS calls
   * onMomentumEnd only after a vigorous swipe. If the user has finished the
   * drag, but the onMomentumEnd has never triggered, we need to manually
   * call it to sync the scenes.
   */

  const afterDrag = (0, _reactNativeReanimated.useSharedValue)(0);
  const tabIndex = tabNames.value.findIndex(n => n === name);
  const scrollTo = useScroller();
  const scrollAnimation = (0, _reactNativeReanimated.useSharedValue)(undefined);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => scrollAnimation.value, val => {
    if (val !== undefined) {
      scrollTo(refMap[name], 0, val, false, '[useAnimatedReaction scroll]');
    }
  });

  const onMomentumEnd = () => {
    'worklet';

    if (!enabled.value) return;

    if (typeof snapThreshold === 'number') {
      if (revealHeaderOnScroll) {
        if (accDiffClamp.value > 0) {
          if (scrollYCurrent.value > headerScrollDistance.value * snapThreshold) {
            if (accDiffClamp.value <= headerScrollDistance.value * snapThreshold) {
              // snap down
              accDiffClamp.value = (0, _reactNativeReanimated.withTiming)(0);
            } else if (accDiffClamp.value < headerScrollDistance.value) {
              // snap up
              accDiffClamp.value = (0, _reactNativeReanimated.withTiming)(headerScrollDistance.value);

              if (scrollYCurrent.value < headerScrollDistance.value) {
                scrollAnimation.value = scrollYCurrent.value;
                scrollAnimation.value = (0, _reactNativeReanimated.withTiming)(headerScrollDistance.value); //console.log('[${name}] sticky snap up')
              }
            }
          } else {
            accDiffClamp.value = (0, _reactNativeReanimated.withTiming)(0);
          }
        }
      } else {
        if (scrollYCurrent.value <= headerScrollDistance.value * snapThreshold) {
          // snap down
          snappingTo.value = 0;
          scrollAnimation.value = scrollYCurrent.value;
          scrollAnimation.value = (0, _reactNativeReanimated.withTiming)(0); //console.log('[${name}] snap down')
        } else if (scrollYCurrent.value <= headerScrollDistance.value) {
          // snap up
          snappingTo.value = headerScrollDistance.value;
          scrollAnimation.value = scrollYCurrent.value;
          scrollAnimation.value = (0, _reactNativeReanimated.withTiming)(headerScrollDistance.value); //console.log('[${name}] snap up')
        }
      }
    }
  };

  const contentHeight = (0, _reactNativeReanimated.useDerivedValue)(() => {
    const tabIndex = tabNames.value.indexOf(name);
    return contentHeights.value[tabIndex] || Number.MAX_VALUE;
  }, []);
  const scrollHandler = (0, _reactNativeReanimated.useAnimatedScrollHandler)({
    onScroll: event => {
      if (!enabled.value) return;

      if (focusedTab.value === name) {
        if (_helpers.IS_IOS) {
          let {
            y
          } = event.contentOffset; // normalize the value so it starts at 0

          y = y + contentInset.value;
          const clampMax = contentHeight.value - (containerHeight.value || 0) + contentInset.value; // make sure the y value is clamped to the scrollable size (clamps overscrolling)

          scrollYCurrent.value = allowHeaderOverscroll ? y : (0, _reactNativeReanimated.interpolate)(y, [0, clampMax], [0, clampMax], _reactNativeReanimated.Extrapolate.CLAMP);
        } else {
          const {
            y
          } = event.contentOffset;
          scrollYCurrent.value = y;
        }

        scrollY.value[index.value] = scrollYCurrent.value;
        oldAccScrollY.value = accScrollY.value;
        accScrollY.value = scrollY.value[index.value] + offset.value;

        if (revealHeaderOnScroll) {
          const delta = accScrollY.value - oldAccScrollY.value;
          const nextValue = accDiffClamp.value + delta;

          if (delta > 0) {
            // scrolling down
            accDiffClamp.value = Math.min(headerScrollDistance.value, nextValue);
          } else if (delta < 0) {
            // scrolling up
            accDiffClamp.value = Math.max(0, nextValue);
          }
        }
      }
    },
    onBeginDrag: () => {
      if (!enabled.value) return; // ensure the header stops snapping

      (0, _reactNativeReanimated.cancelAnimation)(accDiffClamp);
      if (_helpers.IS_IOS) (0, _reactNativeReanimated.cancelAnimation)(afterDrag);
    },
    onEndDrag: () => {
      if (!enabled.value) return;

      if (_helpers.IS_IOS) {
        // we delay this by one frame so that onMomentumBegin may fire on iOS
        afterDrag.value = (0, _reactNativeReanimated.withDelay)(_helpers.ONE_FRAME_MS, (0, _reactNativeReanimated.withTiming)(0, {
          duration: 0
        }, isFinished => {
          // if the animation is finished, the onMomentumBegin has
          // never started, so we need to manually trigger the onMomentumEnd
          // to make sure we snap
          if (isFinished) {
            onMomentumEnd();
          }
        }));
      }
    },
    onMomentumBegin: () => {
      if (!enabled.value) return;

      if (_helpers.IS_IOS) {
        (0, _reactNativeReanimated.cancelAnimation)(afterDrag);
      }
    },
    onMomentumEnd
  }, [refMap, name, revealHeaderOnScroll, containerHeight, contentInset, snapThreshold, enabled, scrollTo]); // sync unfocused scenes

  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    if (!enabled.value) {
      return false;
    } // if the index is decimal, then we're in between panes


    const isChangingPane = !Number.isInteger(indexDecimal.value);
    return isChangingPane;
  }, (isSyncNeeded, wasSyncNeeded) => {
    if (isSyncNeeded && isSyncNeeded !== wasSyncNeeded && focusedTab.value !== name) {
      let nextPosition = null;
      const focusedScrollY = scrollY.value[Math.round(indexDecimal.value)];
      const tabScrollY = scrollY.value[tabIndex];
      const areEqual = focusedScrollY === tabScrollY;

      if (!areEqual) {
        const currIsOnTop = tabScrollY + _reactNative.StyleSheet.hairlineWidth <= headerScrollDistance.value;
        const focusedIsOnTop = focusedScrollY + _reactNative.StyleSheet.hairlineWidth <= headerScrollDistance.value;

        if (revealHeaderOnScroll) {
          const hasGap = accDiffClamp.value > tabScrollY;

          if (hasGap || currIsOnTop) {
            nextPosition = accDiffClamp.value;
          }
        } else if (typeof snapThreshold === 'number') {
          if (focusedIsOnTop) {
            nextPosition = snappingTo.value;
          } else if (currIsOnTop) {
            nextPosition = headerHeight.value || 0;
          }
        } else if (currIsOnTop || focusedIsOnTop) {
          nextPosition = Math.min(focusedScrollY, headerScrollDistance.value);
        }
      }

      if (nextPosition !== null) {
        // console.log(`sync ${name} ${nextPosition}`)
        scrollY.value[tabIndex] = nextPosition;
        scrollTo(refMap[name], 0, nextPosition, false, `[${name}] sync pane`);
      }
    }
  }, [revealHeaderOnScroll, refMap, snapThreshold, tabIndex, enabled, scrollTo]);
  return {
    scrollHandler,
    enable
  };
};

exports.useScrollHandlerY = useScrollHandlerY;

/**
 * Magic hook that creates a multicast ref. Useful so that we can both capture the ref, and forward it to callers.
 * Accepts a parameter for an outer ref that will also be updated to the same ref
 * @param outerRef the outer ref that needs to be updated
 * @returns an animated ref
 */
function useSharedAnimatedRef(outerRef) {
  const ref = (0, _reactNativeReanimated.useAnimatedRef)(); // this executes on every render

  (0, _react.useEffect)(() => {
    if (!outerRef) {
      return;
    }

    if (typeof outerRef === 'function') {
      outerRef(ref.current);
    } else {
      outerRef.current = ref.current;
    }
  });
  return ref;
}

function useAfterMountEffect(effect) {
  const [didExecute, setDidExecute] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (didExecute) return;
    const timeout = setTimeout(() => {
      effect();
      setDidExecute(true);
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, [didExecute, effect]);
}

function useConvertAnimatedToValue(animatedValue) {
  const [value, setValue] = (0, _react.useState)(animatedValue.value);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return animatedValue.value;
  }, animValue => {
    if (animValue !== value) {
      (0, _reactNativeReanimated.runOnJS)(setValue)(animValue);
    }
  }, [value]);
  return value;
}

function useHeaderMeasurements() {
  const {
    headerTranslateY,
    headerHeight
  } = useTabsContext();
  return {
    top: headerTranslateY,
    height: headerHeight
  };
}
/**
 * Returns the vertical scroll position of the current tab as an Animated SharedValue
 */


function useCurrentTabScrollY() {
  const {
    scrollYCurrent
  } = useTabsContext();
  return scrollYCurrent;
}
/**
 * Returns the currently focused tab name
 */


function useFocusedTab(raw) {
  const tabsContext = useTabsContext(raw);

  if (!tabsContext) {
    return '';
  }

  const {
    focusedTab
  } = tabsContext; // eslint-disable-next-line react-hooks/rules-of-hooks

  const focusedTabValue = useConvertAnimatedToValue(focusedTab);
  return focusedTabValue;
}
/**
 * Returns an animated value representing the current tab index, as a floating point number
 */


function useAnimatedTabIndex() {
  const {
    indexDecimal
  } = useTabsContext();
  return indexDecimal;
}

const usePageScrollHandler = (handlers, dependencies) => {
  const {
    context,
    doDependenciesDiffer
  } = (0, _reactNativeReanimated.useHandler)(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];
  return (0, _reactNativeReanimated.useEvent)(event => {
    'worklet';

    const {
      onPageScroll
    } = handlers;

    if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
      onPageScroll(event, context);
    }
  }, subscribeForEvents, doDependenciesDiffer);
};

exports.usePageScrollHandler = usePageScrollHandler;
//# sourceMappingURL=hooks.js.map