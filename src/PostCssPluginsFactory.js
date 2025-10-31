module.exports = class PostCssPluginsFactory {
    /**
     * Create a new instance.
     * @param {import('./Mix.js')} context
     */
    constructor(context) {
        this.context = context;

        /** @type {import('postcss').AcceptedPlugin[]} */
        this.plugins = [];
    }

    /**
     * Load all relevant PostCSS plugins.
     *
     * @param {import('postcss').AcceptedPlugin[] | undefined} plugins
     */
    load(plugins = []) {
        this.loadGlobalPlugins();
        this.loadLocalPlugins(plugins);
        this.loadConfigFile();
        this.loadAutoprefixer();
        this.loadCssNano();

        const pluginNames = new Set();

        return this.plugins.filter(plugin => {
            const name = plugin.postcssPlugin || plugin.name;

            if (pluginNames.has(name)) {
                return false;
            }

            pluginNames.add(name);

            return true;
        });
    }

    /**
     * Load the user's postcss.config.js file, if any.
     *
     * @deprecated postcss-loader already does this on its own
     */
    loadConfigFile() {
        let postcssrc = require('postcss-load-config');

        try {
            this.plugins = [...this.plugins, ...postcssrc.sync().plugins];
        } catch (e) {
            // No postcss.config.js file exists.
        }
    }

    /**
     * Load any global postcss plugins that have been passed to Mix.
     */
    loadGlobalPlugins() {
        if (this.context.config.postCss && this.context.config.postCss.length) {
            this.plugins = [...this.plugins, ...this.context.config.postCss];
        }
    }

    /**
     * Load any postcss plugins that were passed to the Mix command.
     *
     * @param {import('postcss').AcceptedPlugin[] | undefined} plugins
     */
    loadLocalPlugins(plugins) {
        if (plugins && plugins.length) {
            this.plugins = [...this.plugins, ...plugins];
        }
    }

    /**
     * Add autoprefixer to the plugins list.
     */
    loadAutoprefixer() {
        if (this.context.config.autoprefixer) {
            this.plugins.push(require('autoprefixer')(this.context.config.autoprefixer));
        }
    }

    /**
     * Add CSSNano to the plugins list.
     */
    loadCssNano() {
        if (this.context.config.production && this.context.config.cssNano !== false) {
            this.plugins.push(
                require('cssnano')({
                    preset: ['default', this.context.config.cssNano]
                })
            );
        }
    }
};
