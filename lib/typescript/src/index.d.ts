/// <reference types="react" />
import { Container } from './Container';
import { FlashList } from './FlashList';
import { FlatList } from './FlatList';
import { Lazy } from './Lazy';
import { MaterialTabBarProps, MaterialTabItemProps } from './MaterialTabBar';
import { ScrollView } from './ScrollView';
import { SectionList } from './SectionList';
import { Tab } from './Tab';
import { TabBarProps, CollapsibleProps, RefComponent, ContainerRef, CollapsibleRef, OnTabChangeCallback, TabItemProps, TabProps } from './types';
export type { TabBarProps, CollapsibleProps, RefComponent, ContainerRef, MaterialTabBarProps, MaterialTabItemProps, CollapsibleRef, OnTabChangeCallback, TabItemProps, TabProps, };
export declare const Tabs: {
    Container: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<CollapsibleProps & import("react").RefAttributes<CollapsibleRef<string>>>>;
    Tab: typeof Tab;
    Lazy: import("react").FC<{
        startMounted?: boolean | undefined;
        cancelLazyFadeIn?: boolean | undefined;
        children: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        raw?: boolean | undefined;
    }>;
    FlatList: <T>(p: import("react-native").FlatListProps<T> & {
        ref?: ((instance: import("react-native").FlatList<T> | null) => void) | import("react").RefObject<import("react-native").FlatList<T>> | null | undefined;
    }) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
    ScrollView: import("react").ForwardRefExoticComponent<Pick<import("react-native").ScrollViewProps, "scrollEnabled" | "keyboardDismissMode" | "style" | "onMoveShouldSetResponderCapture" | "onStartShouldSetResponder" | "overScrollMode" | "contentContainerStyle" | "horizontal" | "invertStickyHeaders" | "keyboardShouldPersistTaps" | "onContentSizeChange" | "onScrollBeginDrag" | "onScrollEndDrag" | "onMomentumScrollEnd" | "onMomentumScrollBegin" | "pagingEnabled" | "removeClippedSubviews" | "showsHorizontalScrollIndicator" | "showsVerticalScrollIndicator" | "refreshControl" | "snapToAlignment" | "snapToInterval" | "snapToOffsets" | "snapToStart" | "snapToEnd" | "disableIntervalMomentum" | "disableScrollViewPanResponder" | "hitSlop" | "onLayout" | "pointerEvents" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "focusable" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "alwaysBounceHorizontal" | "alwaysBounceVertical" | "automaticallyAdjustContentInsets" | "bounces" | "bouncesZoom" | "canCancelContentTouches" | "centerContent" | "contentInset" | "contentOffset" | "contentInsetAdjustmentBehavior" | "decelerationRate" | "directionalLockEnabled" | "indicatorStyle" | "maximumZoomScale" | "minimumZoomScale" | "onScrollAnimationEnd" | "pinchGestureEnabled" | "scrollEventThrottle" | "scrollIndicatorInsets" | "scrollToOverflowEnabled" | "scrollsToTop" | "onScrollToTop" | "stickyHeaderIndices" | "zoomScale" | "endFillColor" | "scrollPerfTag" | "nestedScrollEnabled" | "fadingEdgeLength" | "persistentScrollbar"> & {
        children?: import("react").ReactNode;
    } & import("react").RefAttributes<import("react-native").ScrollView>>;
    SectionList: <T_1>(p: import("react-native").SectionListProps<T_1> & {
        ref?: ((instance: import("react-native").SectionList<T_1> | null) => void) | import("react").RefObject<import("react-native").SectionList<T_1>> | null | undefined;
    }) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
    FlashList: <T_2>(p: import("@shopify/flash-list").FlashListProps<T_2> & {
        ref?: ((instance: import("@shopify/flash-list/dist/FlashList").default<T_2> | null) => void) | import("react").RefObject<import("@shopify/flash-list/dist/FlashList").default<T_2>> | null | undefined;
    }) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
};
export { Container, Tab, Lazy, FlatList, ScrollView, SectionList, FlashList };
export { useCurrentTabScrollY, useHeaderMeasurements, useFocusedTab, useAnimatedTabIndex, useCollapsibleStyle, } from './hooks';
export type { HeaderMeasurements } from './hooks';
export { MaterialTabBar } from './MaterialTabBar/TabBar';
export { MaterialTabItem } from './MaterialTabBar/TabItem';
