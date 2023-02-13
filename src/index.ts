export { load, sound, utils, MovieClip, Scene, Timeline, Tween, Animator, AnimatorTimeline } from './animate';

export {
    AnimateContainer as Container,
    AnimateSprite as Sprite,
    AnimateGraphics as Graphics,
    AnimateText as Text,
} from './animate';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const VERSION: string = '__VERSION__';

export * from './AnimateAsset';

// export type are weeeeird
import type { DrawCommands, AnimateDisplayObject  } from './animate';
export { DrawCommands };
export { AnimateDisplayObject as DisplayObject };
