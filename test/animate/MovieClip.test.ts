import * as animate from '../../src/index';
import { Container } from 'pixi.js';

describe('MovieClip', () =>
{
    const MovieClip = animate.MovieClip;

    it('should exist', () =>
    {
        expect(MovieClip).toBeTruthy();
    });
    it('should be extendable', () =>
    {
        expect(MovieClip).toBeTruthy();
        expect(Container).toBeTruthy();
        const clip = new MovieClip();

        expect(clip instanceof Container).toBeTruthy();
        expect(clip instanceof animate.Container).toBeTruthy();
    });
});
