import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: './src/index.ts',
    plugins: [
        typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
        commonjs({extensions: ['.js', '.ts']}) ,//
       
    ], 
    output:{
        file:"rel/index.js",
        format:"cjs"
    },
   
}