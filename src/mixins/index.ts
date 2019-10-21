export * from './Container';
export * from './Sprite';
export * from './Graphics';
export * from './Text';

import {Container} from './Container';
import {Sprite} from './Sprite';
import {Graphics} from './Graphics';
import {Text} from './Text';
import {TransformStatic} from 'pixi.js';

export type DisplayObject = (Container|Graphics|Sprite|Text) & {transform:TransformStatic};