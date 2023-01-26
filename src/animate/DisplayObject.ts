import type { AnimateContainer } from './Container';
import type { AnimateSprite } from './Sprite';
import type { AnimateGraphics } from './Graphics';
import type { AnimateText } from './Text';

export type AnimateDisplayObject = (AnimateContainer | AnimateGraphics | AnimateSprite | AnimateText);
