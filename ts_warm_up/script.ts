/*
@author: qiuwenhui
@Software: VSCode
@Time: 2023-04-24 16:06:15
*/

// ts 类型的条件判断
type isNumber<T> = T extends number ? true : false;
type res1 = isNumber<1>;

// ts 类型的循环——递归实现循环操作
type createArray<Len, Ele, Arr extends Ele[] = []> = Arr["length"] extends Len
  ? Arr
  : createArray<Len, Ele, [Ele, ...Arr]>;
type res2 = createArray<3, "a">;

// ts 类型的字符串操作
type left = "aaa";
type right = "bbb";
type str3a = `${left},${right}`;

type str3b = "eeee,ffff";
type res3 = str3b extends `${infer l1},${infer r1}` ? [l1, r1] : never;

// ts 类型的对象操作
type obj = {
  a: 1;
  b: 2;
};
type keys = keyof obj;
type propB = obj[keys];

type obj2 = {
  [key in keyof obj]: obj[key];
};
