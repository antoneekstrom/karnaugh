import React, { Fragment, PropsWithChildren, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ICoreClasses, joinClassNames, classNames } from './Common';
import { Store } from 'redux';
import { History } from 'history';
import { overlayContainerContext, OverlayContainer, IOverlayItem, IOverlayContainerContext } from './Overlay';
import { Theme } from '../store/preferences';
import { StoreState } from '../store';

export interface IFrameProps extends ICoreClasses {
    store : Store;
    history : History<any>;
}

/**
 * Contains the main content of the application.
 */
function Content(props : PropsWithChildren<any>) {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

/**
 * Provides theme class.
 */
function Wrapper(props : PropsWithChildren<any>) {
    const theme : Theme = useSelector((state : StoreState) => state.preferences.theme);
    const classes = joinClassNames(`theme-${theme}`, 'frame');
    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}

/** Final frame container. */
export default function Frame(props : PropsWithChildren<IFrameProps>) {

    function generateId() {
        return Math.round((Math.random() * 1000)).toString(16);
    }

    function addOverlayItem(item : JSX.Element, data ?: any) : string {
        const id = generateId();
        setOverlayItems([...overlayItems, {id, item, data}]);
        return id;
    }

    function removeOverlayItem(context : IOverlayContainerContext, itemId : string) {
        setOverlayItems(context.overlayItems.filter(i => i.id != itemId));
    }

    const [overlayItems, setOverlayItems] = useState<IOverlayItem[]>([]);
    const overlay = { addOverlayItem, removeOverlayItem, overlayItems, setOverlayItems };

    return (
        <Provider store={props.store}>
            <ConnectedRouter history={props.history}>
                <overlayContainerContext.Provider value={overlay}>

                        <Wrapper>
                            <Content>{props.children}</Content>
                            <OverlayContainer>{overlayItems.map(i => i.item)}</OverlayContainer>
                        </Wrapper>

                </overlayContainerContext.Provider>
            </ConnectedRouter>
        </Provider>
    )
}