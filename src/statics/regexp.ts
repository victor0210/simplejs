/**
 * match template
 * */
export const compileReg: RegExp = /{([^}]+)?}/g

export const vmValRegexp = /\[|\]/g
/**
 * match string of template
 * */
export const stringRegDoubleQute: RegExp = /\"(.*)\"/g

export const stringRegSingleQute: RegExp = /\'(.*)\'/g