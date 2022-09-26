import { FlashList as SFlashList, FlashListProps } from '@shopify/flash-list';
import React from 'react';
/**
 * Use like a regular FlashList.
 */
export declare const FlashList: <T>(p: FlashListProps<T> & {
    ref?: ((instance: SFlashList<T> | null) => void) | React.RefObject<SFlashList<T>> | null | undefined;
}) => React.ReactElement;
