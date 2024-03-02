export const asLongAs = function(condition:any, callback:Function, elseCallback=function(){}){ //if is overused, so here's "as long as" :)
    condition ? callback() : elseCallback();
    return condition;
}