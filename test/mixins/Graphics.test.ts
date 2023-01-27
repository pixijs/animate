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
        expect(p.cp).toEqual(p.closePath);
        expect(p.bh).toEqual(p.beginHole);
        expect(p.eh).toEqual(p.endHole);
        expect(p.m).toEqual(p.moveTo);
        expect(p.l).toEqual(p.lineTo);
        expect(p.q).toEqual(p.quadraticCurveTo);
        expect(p.b).toEqual(p.bezierCurveTo);
        expect(p.f).toEqual(p.beginFill);
        expect(p.s).toEqual(p.lineStyle);
        expect(p.dr).toEqual(p.drawRect);
        expect(p.rr).toEqual(p.drawRoundedRect);
        expect(p.dc).toEqual(p.drawCircle);
        expect(p.ar).toEqual(p.arc);
        expect(p.at).toEqual(p.arcTo);
        expect(p.de).toEqual(p.drawEllipse);
    });
});
