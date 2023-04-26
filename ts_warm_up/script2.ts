/*
@author: qiuwenhui
@Software: VSCode
@Time: 2023-04-25 17:12:44
*/

// 体操 1： 实现高级类型 Add，能够做数字加法
type createArray2<Len, Ele, Arr extends Ele[] = []> = Arr["length"] extends Len
    ? Arr
    : createArray2<Len, Ele, [Ele, ...Arr]>;

type Add<A extends number, B extends number> = [
    ...createArray<A, 1>,
    ...createArray<B, 1>
]["length"];

type ans1 = Add<3, 4>;

// 体操2：把字符串重复 n 次
type RepeactStr<
    Str extends string,
    Count,
    Arr extends Str[] = [],
    ResStr extends string = ""
> = Arr["length"] extends Count
    ? ResStr
    : RepeactStr<Str, Count, [Str, ...Arr], `${Str}${ResStr}`>;

type ans2 = RepeactStr<"Guang", 3>;

// 体操3: 实现简易的 JS Parser，能解析字符串 add(11,22) 的函数名和参数
// （1）解析函数名
type alphaChars =
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
    | "g"
    | "h"
    | "i"
    | "j"
    | "k"
    | "l"
    | "m"
    | "n"
    | "o"
    | "p"
    | "q"
    | "r"
    | "s"
    | "t"
    | "u"
    | "v"
    | "w"
    | "x"
    | "y"
    | "z"
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z";

// 保存解析的结果
type TempParseResult<Token extends string, Rest extends string> = {
    token: Token;
    rest: Rest;
};

type parseFunctionName<
    SourceStr extends string,
    Res extends string = ""
> = SourceStr extends `${infer PrefixChar}${infer RestStr}`
    ? PrefixChar extends alphaChars
        ? parseFunctionName<RestStr, `${Res}${PrefixChar}`>
        : TempParseResult<Res, SourceStr>
    : never;

type ans3a = parseFunctionName<"add(1,2)">;
type ans3b = parseFunctionName<"minus(1,2)">;

// （2）解析括号
type brackets = "(" | ")";
type parseBrackets<SourceStr> =
    SourceStr extends `${infer PrefixChar}${infer RestStr}`
        ? PrefixChar extends brackets
            ? TempParseResult<PrefixChar, RestStr>
            : never
        : never;

type ans3c = parseBrackets<"(1,2)">;

// （3）解析数字
type numChars = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type parseNum<
    SourceStr extends string,
    Res extends string = ""
> = SourceStr extends `${infer PrefixChar}${infer RestStr}`
    ? PrefixChar extends numChars
        ? parseNum<RestStr, `${Res}${PrefixChar}`>
        : TempParseResult<Res, SourceStr>
    : never;

type ans3d = parseNum<"111,2)">;

// （4）解析逗号
type parseComma<SourceStr extends string> =
    SourceStr extends `${infer PrefixChar}${infer RestStr}`
        ? PrefixChar extends ","
            ? TempParseResult<",", RestStr>
            : never
        : never;

type ans3e = parseComma<",2)">;

// （5）整体解析
type parse<
    SourceStr extends string,
    Res extends string = ""
> = parseFunctionName<SourceStr, Res> extends TempParseResult<
    infer FunctionName,
    infer Rest1
>
    ? parseBrackets<Rest1> extends TempParseResult<
          infer BracketChar,
          infer Rest2
      >
        ? parseNum<Rest2> extends TempParseResult<infer Num1, infer Rest3>
            ? parseComma<Rest3> extends TempParseResult<
                  infer CommaChar,
                  infer Rest4
              >
                ? parseNum<Rest4> extends TempParseResult<
                      infer Num2,
                      infer Rest5
                  >
                    ? parseBrackets<Rest5> extends TempParseResult<
                          infer BracketChar2,
                          infer Rest6
                      >
                        ? {
                              functionName: FunctionName;
                              params: [Num1, Num2];
                          }
                        : never
                    : never
                : never
            : never
        : never
    : never;

type ans3 = parse<"add(1,2)">;

// 体操4：实现高级类型，取出对象类型中的数字属性值
type filterNumberProp<T extends Object> = {
    [Key in keyof T]: T[Key] extends number ? T[Key] : never;
}[keyof T];

type ans4 = filterNumberProp<{
    a: 1;
    b: "2";
    c: 3;
}>;
