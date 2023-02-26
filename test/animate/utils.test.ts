import * as animate from '../../src/index';

describe('utils', () =>
{
    it('should convert shortened hex strings', () =>
    {
        const color = animate.utils.hexToUint('#fc9');

        expect(color).toEqual(0xffcc99);
    });
    it('should handle long strings', () =>
    {
        const color = animate.utils.hexToUint('#ffcc99');

        expect(color).toEqual(0xffcc99);
    });
    it('should convert keyframes', () =>
    {
        const result: any = animate.utils.deserializeKeyframes(
            '0X-55.05Y-361.05A1B1T#fffF1,2,3 1Y-360.2 2Y-357.6 3Y-353.25'
        );

        expect(typeof result).toEqual('object');
        expect(Object.keys(result).length).toEqual(4);
        expect(result['0'].x).toEqual(-55.05);
        expect(result['0'].y).toEqual(-361.05);
        expect(result['0'].sx).toEqual(1);
        expect(result['0'].sy).toEqual(1);
        expect(result['0'].t).toEqual('#fff');
        expect(Array.isArray(result['0'].c)).toBeTruthy();
        expect(result['0'].c.length).toEqual(3);
        expect(result['0'].c[0]).toEqual(1);
        expect(result['1'].y).toEqual(-360.2);
        expect(result['2'].y).toEqual(-357.6);
        expect(result['3'].y).toEqual(-353.25);
    });

    it('should convert keyframes with tweens', () =>
    {
        const result: any = animate.utils.deserializeKeyframes(
            '0X-55.05Y-361.05A1B1T#fffF1,2,3WD2E-1Quadratic;PY-360.2 2WD5PY-357.6 7WD3E0.8Cubic;PY-353.25'
        );

        expect(typeof result).toEqual('object');
        expect(Object.keys(result).length).toEqual(3);
        expect(result['0'].x).toEqual(-55.05);
        expect(result['0'].y).toEqual(-361.05);
        expect(result['0'].sx).toEqual(1);
        expect(result['0'].sy).toEqual(1);
        expect(result['0'].t).toEqual('#fff');
        expect(Array.isArray(result['0'].c)).toBeTruthy();
        expect(result['0'].c?.length).toEqual(3);
        expect(result['0'].c[0]).toEqual(1);
        expect(result['0'].tw?.d).toEqual(2);
        expect(result['0'].tw.e.s).toEqual(-1);
        expect(result['0'].tw.e.n).toEqual('Quadratic');
        expect(result['0'].tw.p.y).toEqual(-360.2);
        expect(result['2'].tw.d).toEqual(5);
        expect(result['2'].tw.e).toEqual(undefined);
        expect(result['2'].tw.p.y).toEqual(-357.6);
        expect(result['7'].tw.d).toEqual(3);
        expect(result['7'].tw.e.s).toEqual(0.8);
        expect(result['7'].tw.e.n).toEqual('Cubic');
        expect(result['7'].tw.p.y).toEqual(-353.25);
    });

    it('should fill frames', () =>
    {
        const timeline: any[] = [];

        animate.utils.fillFrames(timeline, 3, 10);
        expect(timeline.length).toEqual(13);
        expect(timeline[0]).toEqual(false);
        expect(timeline[1]).toEqual(false);
        expect(timeline[2]).toEqual(false);
        expect(timeline[3]).toEqual(true);
        expect(timeline[12]).toEqual(true);
    });

    it('should deserialize shapes', () =>
    {
        const shapes = 'f #000 1 m 185.5 59.75 l 180.65 74.1 '
            + 'l 192.85 83.15 l 205.2 74.3 l 200.65 59.85 l 185.5 59.75 c\n'
            + 'f #000 1 m 184 61 l 184 79.5 l 202.5 79.5 l 202.5 61 l 184 61 c';
        const items = animate.utils.deserializeShapes(shapes);

        expect(items).toBeTruthy();
        expect(Array.isArray(items)).toBeTruthy();
        expect(items.length).toEqual(2);
        expect(Array.isArray(items[0])).toBeTruthy();
        expect(items[0].length).toEqual(22);
        expect(Array.isArray(items[1])).toBeTruthy();
        expect(items[1].length).toEqual(19);
    });
});
