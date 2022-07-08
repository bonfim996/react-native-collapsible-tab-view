import React from 'react';
import { SectionList as RNSectionList, SectionListProps } from 'react-native';
/**
 * Use like a regular SectionList.
 */
export declare const SectionList: <T>(p: SectionListProps<T> & {
    ref?: ((instance: RNSectionList<T> | null) => void) | React.RefObject<RNSectionList<T>> | null | undefined;
}) => React.ReactElement;
