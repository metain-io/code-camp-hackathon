const withPlugins = require('next-compose-plugins');
const transpileModules = require('next-transpile-modules')([]);
const nextImage = require('next-images');

module.exports = withPlugins([transpileModules(), nextImage], {
    reactStrictMode: false,
    swcMinify: true,
    distDir: `.build/${process.env.ENVIRONMENT || 'tmp'}`,
    env: {
        NEXT_PUBLIC_BUILD_DATE: Date.now(),
    },
    images: {
        unoptimized: process.env.NODE_ENV == 'production',
    },
});
