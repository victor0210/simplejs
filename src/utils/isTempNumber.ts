import {REG_NEG, REG_POS} from "../statics/regexp";

const isTempNumber = (t: string):boolean => {
    return REG_POS.test(t) || REG_NEG.test(t);
}

export default isTempNumber