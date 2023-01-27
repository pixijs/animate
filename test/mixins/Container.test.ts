import { Container } from '../../src/index';

describe('Container', () =>
{
    it('should have DisplayObject shortened names', () =>
    {
        const p = new Container();

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
        expect(p.c).toBeTruthy();
        expect(p.setColorTransform).toBeTruthy();
        expect(p.setColorTransform).toEqual(p.c);
    });
    it('should have shortened names', () =>
    {
        const p = new Container();

        expect(p.ac).toEqual(p.addChild);
    });
});
