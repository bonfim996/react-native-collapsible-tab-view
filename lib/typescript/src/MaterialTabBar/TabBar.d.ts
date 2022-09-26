import React from 'react';
import { MaterialTabBarProps } from './types';
export declare const TABBAR_HEIGHT = 48;
declare const MemoizedTabBar: <T extends string = string>({ tabNames, indexDecimal, scrollEnabled, indicatorStyle, index, TabItemComponent, IndicatorComponent, getLabelText, onTabPress, style, tabProps, contentContainerStyle, labelStyle, inactiveColor, activeColor, tabStyle, width: customWidth, keepActiveTabCentered, }: MaterialTabBarProps<T>) => React.ReactElement;
export { MemoizedTabBar as MaterialTabBar };
