(function(){
    // Script to clobber some native functions
    // to exercise polyfill restoration
    // Code coverage turns you into a monster
    Array.isArray = undefined;
    Array.prototype.reduce = undefined;
}());