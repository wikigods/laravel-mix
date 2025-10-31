import test from 'ava';
import mockRequire from 'mock-require';

import Mix from '../../src/Mix.js';
import VueVersion from '../../src/VueVersion.js';

test.beforeEach(t => {
    t.context.mix = new Mix();
    t.context.vueVersion = new VueVersion(t.context.mix);
});

// test('it aborts if Vue is not installed', async t => {
//     const { vueVersion, mix } = t.context;

//     mix.logger.fake();

//     t.throws(() => vueVersion.detect());

//     t.true(
//         mix.logger.received([
//             `Cannot find module 'vue'`,
//             `couldn't find a supported version of Vue`
//         ])
//     );
// });
