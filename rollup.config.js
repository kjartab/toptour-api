//Rollup plugins
import babel from 'rollup-plugin-babel';
// import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import jsonjs from 'rollup-plugin-json';
import builtin from 'rollup-plugin-node-builtins';


export default {

    entry: 'src/test.js',
    dest: 'build/main.min.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        builtin({
            preferBuiltins: false
        }),
        jsonjs(),
        commonjs(),
        babel({
            exclude: '/node_modules/**',
        }),
        // replace({
        //     ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        // }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ]
}