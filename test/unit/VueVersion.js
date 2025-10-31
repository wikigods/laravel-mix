import test from 'ava';
import mockRequire from 'mock-require';

import Mix from '../../src/Mix.js';
import VueVersion from '../../src/VueVersion.js';

test.beforeEach(t => {
    t.context.mix = new Mix();
    t.context.vueVersion = new VueVersion(t.context.mix);
});

test('it detects the Vue version', t => {
    const { vueVersion, mix } = t.context;

    mockRequire('vue', { version: '3.0' });
    mix.resolver.alias('vue', 'vue');

    t.is(3, vueVersion.detect());

    mockRequire.stop('vue');
});
