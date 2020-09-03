import React, { useEffect } from 'react';
import {pathToFileURL} from 'url';
import { ICoreClasses, coreProps } from './Common';
import { useAsync } from '../util';
import sharp from 'sharp';

export interface IImageProps extends ICoreClasses {
  src : string;
}

export function bufferToUrl(buffer : Buffer, options = {mime: 'image/png', encoding: 'base64'}) {
  const {mime, encoding} = options;
  return 'data:' + mime + ';' + encoding + ',' + buffer.toString(encoding);
}

export async function loadThumbnail(path : string) : Promise<string> {
  const buffer = await sharp(path).resize(200).toBuffer();
  return bufferToUrl(buffer);
}

export function pathToUrl(path : string) {
  return pathToFileURL(path).href;
}

export default function Image(props : IImageProps) {
  return (
    <img {...coreProps(props)} src={props.src} />
  )
}

export function Thumbnail(props : IImageProps & {loading: () => JSX.Element}) {

  const {isLoading, data: src, effect: load} = useAsync(() => loadThumbnail(props.src));
  useEffect(load, [props.src]);

  return !src ? props.loading() : (
    <img {...coreProps(props)} src={src} />
  );
}