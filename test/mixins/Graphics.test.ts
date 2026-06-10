import { Graphics } from '../../src/index';

describe('Graphics', () =>
{
    it('should have DisplayObject shortened names', () =>
    {
        const p = new Graphics();

        expect(p.setRenderable).toBeTruthy();
        expect(p.re).toBeTruthy();
        expect(p.setRenderable).toEqual(p.re);
        expect(p.t).toBeTruthy();
        expect(p.setTransform).toEqual(p.t);
        expect(p.ma).toBeTruthy();
        expect(p.setMask).toBeTruthy();
        expect(p.setMask).toEqual(p.ma);
        expect(p.a).toBeTruthy();
        expect(p.setAlpha).toBeTruthy();
        expect(p.setAlpha).toEqual(p.a);
        expect(p.i).toBeTruthy();
        expect(p.setTint).toBeTruthy();
        expect(p.setTint).toEqual(p.i);
        // NOTE: on Graphics, c() wraps setColorTransform so that we can override it in the shim
        expect(p.c).toBeTruthy();
        expect(p.setColorTransform).toBeTruthy();
        // assert.equal(p.setColorTransform, p.c);
    });
    it('should have shortened names', () =>
    {
        const p = new Graphics();

        expect(p.drawCommands).toBeTruthy();
        expect(p.d).toBeTruthy();
        expect(p.drawCommands).toEqual(p.d);
        // v8 port: shortcuts are own wrapper methods (they buffer pending
        // fill/stroke state), no longer references to the pixi.js methods
        expect(typeof p.cp).toEqual('function');
        expect(typeof p.bh).toEqual('function');
        expect(typeof p.eh).toEqual('function');
        expect(typeof p.m).toEqual('function');
        expect(typeof p.l).toEqual('function');
        expect(typeof p.q).toEqual('function');
        expect(typeof p.b).toEqual('function');
        expect(typeof p.f).toEqual('function');
        expect(typeof p.s).toEqual('function');
        expect(typeof p.dr).toEqual('function');
        expect(typeof p.rr).toEqual('function');
        expect(typeof p.dc).toEqual('function');
        expect(typeof p.ar).toEqual('function');
        expect(typeof p.at).toEqual('function');
        expect(typeof p.de).toEqual('function');
    });

    it('should emit fill/stroke instructions from drawCommands (v8 semantics)', () =>
    {
        const p = new Graphics();

        // square fill with a square hole
        p.drawCommands([
            'f', 0xff0000, 1,
            'm', 0, 0, 'l', 100, 0, 'l', 100, 100, 'l', 0, 100, 'cp',
            'bh',
            'm', 25, 25, 'l', 75, 25, 'l', 75, 75, 'l', 25, 75, 'cp',
            'eh',
        ]);
        const fills = p.context.instructions.filter((i) => i.action === 'fill');

        expect(fills.length).toEqual(1);
        expect((fills[0].data as any).hole).toBeTruthy();

        // stroke-only path
        const p2 = new Graphics();

        p2.drawCommands(['s', 2, 0x00ff00, 1, 'm', 0, 0, 'l', 50, 50]);
        const strokes = p2.context.instructions.filter((i) => i.action === 'stroke');

        expect(strokes.length).toEqual(1);
    });
});
