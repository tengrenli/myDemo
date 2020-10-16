/* @flow */

// html 标签相关配置文件
import { baseOptions } from './options'
//
import { createCompiler } from 'compiler/index'

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
