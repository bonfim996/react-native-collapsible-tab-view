import React from 'react';
/**
 * Typically used internally, but if you want to mix lazy and regular screens you can wrap the lazy ones with this component.
 */
export declare const Lazy: React.FC<{
    startMounted?: boolean;
    cancelLazyFadeIn?: boolean;
    children: React.ReactElement;
    raw?: boolean;
}>;
