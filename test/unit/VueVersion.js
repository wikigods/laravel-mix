import test from 'ava';
import mockRequire from 'mock-require';

import Mix from '../../src/Mix.js';
import VueVersion from '../../src/VueVersion.js';

test.beforeEach(t => {
    t.context.mix = new Mix();
    t.context.vueVersion = new VueVersion(t.context.mix);
});

test('it aborts if Vue is not installed', async t => {
    const { vueVersion, mix } = t.context;

    mix.logger.fake();

    const originalResolve = mix.resolve;

    mix.resolve = pkg => {
        if (pkg === 'vue') {
            const error = new Error("Cannot find module 'vue'");
            error.code = 'MODULE_NOT_FOUND';
            throw error;
        }

        return originalResolve.apply(mix, arguments);
    };

    t.throws(() => vueVersion.detect());

    t.true(
        mix.logger.received([
            `Error: Cannot find module 'vue'`,

            `We couldn't find a supported version of Vue in your project. ` +
                `Please ensure that it's installed (npm install vue).`
        ])
    );

    mix.resolve = originalResolve;
});
