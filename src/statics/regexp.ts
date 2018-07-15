/**
 * match template
 * */
export const COMPILE_REG: RegExp = /{([^}]+)?}/g

export const VM_VAL_REGEXP: RegExp = /\[|\]/g
/**
 * match string of template
 * */
export const STRING_REG_DOUBLE_QUOTE: RegExp = /\"(.*)\"/g

export const STRING_REG_SINGLE_QUOTE: RegExp = /\'(.*)\'/g

/**
 * match number of template
 * */
export const REG_POS: RegExp = /^\d+(\.\d+)?$/;

export const REG_NEG: RegExp = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;