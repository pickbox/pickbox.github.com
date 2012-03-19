var MAX_DUMP_DEPTH = 10;
function dump(arr, level) {
    var dumped_text = "";
    if(!level)
        level = 0;

    //The padding given at the beginning of the line.
    var level_padding_self = "";
    for(var j=0;j<level;j++)
        level_padding_self += "    ";
    var level_padding = level_padding_self + "    ";

    if (level > MAX_DUMP_DEPTH)
        return level_padding + arr + ": <Maximum Depth Reached>\n";

    if(typeof(arr) == 'object') { //Array/Hashes/Objects
        for(var item in arr) {
            var value = arr[item];

            if(typeof(value) == 'object') { //If it is an array,
                dumped_text += level_padding + "'" + item + "':\n";
                dumped_text += dump(value,level+1);
            } else if (typeof(value) == 'function') {
                dumped_text += level_padding + "'" + item + "' => \"" + "[Function]" + "\"\n";
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
        dumped_text = level_padding_self + "{\n" + dumped_text + level_padding_self + "}\n";
    } else { //Stings/Chars/Numbers etc.
        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
    }
    return dumped_text;
}
