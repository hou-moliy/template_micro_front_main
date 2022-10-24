// 配置文件 -> .prettierrc.js
module.exports = {
    // ------------------------最重要----------------------------
    // 最大长度80个字符
    printWidth: 80,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    singleQuote: false,
    // 行末分号, 默认true
    semi: true,
    // 尽可能使用尾随逗号（包括函数参数）,默认none,可选 none|es5|all
    // es5 包括es5中的数组、对象
    // all 包括函数对象等所有可选
    trailingComma: 'all',
    // ------------------------------------------------------------
    // 对象字面量的大括号间使用空格（默认true） { a:1 }
    bracketSpacing: true,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 如x => x
    // always 总是有括号 如(x) => x
    arrowParens: 'avoid',
    // tab缩进大小,默认为2
    tabWidth: 2,
    // 使用tab缩进还是空格，默认false
    useTabs: false,
    // ------------------------------------------------------------
    // vue缩进脚本和样式
    vueIndentScriptAndStyle: false,
    // 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。
    insertPragma: false,
    // 行尾换行格式
    endOfLine: 'auto',
    // html空格敏感度
    htmlWhitespaceSensitivity: 'ignore',
};