/* eslint-disable global-require */
describe('PIXI', () =>
{
    describe('subclasses', () =>
    {
        require('./mixins/Container.test.ts');
        require('./mixins/Graphics.test.ts');
        require('./mixins/Sprite.test.ts');
        require('./mixins/Text.test.ts');
    });

    describe('animate', () =>
    {
        require('./animate/load.test.ts');
        require('./animate/MovieClip.test.ts');
        require('./animate/Timeline.test.ts');
        require('./animate/Tween.test.ts');
        require('./animate/utils.test.ts');
    });
});

const renders = document.createElement('div');

renders.id = 'renders-failed';
document.body.appendChild(renders);

require('./renders/current/index.test');
