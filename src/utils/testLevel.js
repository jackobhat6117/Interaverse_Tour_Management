import { def } from "../config";

export function getTestLevel(name=def.devStatus) {
    if(name === 'test')
        return 0;
    else if(name === 'dev')
        return 0;
    else if(name === 'qa') {
        return 1;
    } else if(name === 'staging') {
        return 2;
    } else if(name === 'live') {
        return 3;
    }
    return 4;
}