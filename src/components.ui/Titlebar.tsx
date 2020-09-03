import React, { useEffect, useState } from 'react';
import './Titlebar.css';
import { SegoeIcon } from './Icon';
import { remote } from 'electron';
import { useListener } from '../util';

export function TitlebarMenu(props) {
    return (
        <button>
            {props.children}
        </button>
    )
}

export function TitlebarTitle(props) {
    return (
        <p className="title">{props.children}</p>
    )
}

export function TitlebarControlButton(props) {
    return (
        <button className="control">
            {props.children}
        </button>
    )
}

export default function Titlebar(props) {

    const window = remote.getCurrentWindow();

    function Close() {
        function handleClick(e) {
            window.close();
        }

        return (
            <button className="control close" onClick={e => handleClick(e)}>
                <SegoeIcon className="control">&#xE8BB;</SegoeIcon>
            </button>
        )
    }

    function Minimize() {
        function handleClick(e) {
            window.minimize();
        }

        return (
            <button className="control" onClick={e => handleClick(e)}>
                <SegoeIcon className="control">&#xE921;</SegoeIcon>
            </button>
        )
    }

    function Maximize() {
        function handleClick(e) {
            console.log(window.isMaximized());
            (window.isMaximized() ? window.unmaximize : window.maximize)();
        }

        function maximizeListener() {
            setIsMaximized(window.isMaximized());
        }

        const [isMaximized, setIsMaximized] = useState(window.isMaximized());

        useListener(window.on, window.removeListener, 'maximize', maximizeListener);
        useListener(window.on, window.removeListener, 'unmaximize', maximizeListener);

        const icon : string = isMaximized ? '&#xE923;' : '&#xE922;';
        return (
            <button className="control" onClick={e => handleClick(e)}>
                <SegoeIcon className="control">{new DOMParser().parseFromString(icon, 'text/html').body.textContent}</SegoeIcon>
            </button>
        )
    }

    return (
        <div className="titlebar">
            <div className="titlebar-left">
                {props.children}
            </div>
            <div className="titlebar-right">
                <Minimize/>
                <Maximize/>
                <Close/>
            </div>
        </div>
    )
}