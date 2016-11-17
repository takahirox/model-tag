import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	plugins: [
		resolve( {
			jsnext: true,
			main: true,
			bowser: true
		} ),
		commonjs()
	],
	dest: `dist/model-${process.env.entry}.js`,
	entry: `src/model-${process.env.entry}.js`,
	format: 'iife'
};
