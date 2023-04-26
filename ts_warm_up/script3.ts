/*
@author: qiuwenhui
@Software: VSCode
@Time: 2023-04-25 17:13:03
*/
// ********** TypeScript类型体操热身 **********
// ****** 对象 ******
// 热身1：实现ValueOf
// keyof Object -> Keys
// ValuesOf<Object> -> Values
type checkValues<Object> = Object[keyof Object];
type a1 = checkValues<{
    name: string;
    age: number;
}>;

// ****** 元组和数组 ******
// 热身2：实现Append<Tuple,Element>
type Append<Tuple extends any[], Ele> = [...Tuple, Ele];
type a2 = Append<[1, 2, 3], 1>;

// 热身3：返回元组长度+1
type AddLength<Tuple extends any[]> = [...Tuple, any]["length"];
type a3 = AddLength<[1, 2, 3]>;

// 热身4：将元组转化为数组
type ToArray<Tuple extends any[]> = Array<Tuple[number]>;
type a4 = ToArray<[1, 2]>;
let b4: a4 = [1, 1];

// ****** 条件 ******
// 热身5：判断输入是否为数组
type isArray<Arr> = Arr extends any[] ? true : false;
type a5 = isArray<[1, true, "3"]>;
type b5 = isArray<"123">;

// 热身6：GetProp<Key,Object>，可能Key不存在于Object，返回undefined
type GetProp<Object, Key> = Key extends keyof Object ? Object[Key] : undefined;
type a6 = GetProp<{ name: "David"; age: 20 }, "name">;
type b6 = GetProp<{ name: "David"; age: 20 }, "hometown">;

// 热身7：实现map
type Mapp<List> = List extends [infer First, ...infer Rest]
    ? [{ name: First }, ...Mapp<Rest>]
    : [];
type a7 = Mapp<[1, 2, 3]>;

// 热身8：实现Filter
type FilterNumber<List> = List extends [infer First, ...infer Rest]
    ? First extends number
        ? [First, ...FilterNumber<Rest>]
        : FilterNumber<Rest>
    : [];

type a8 = FilterNumber<[1, true, 3, "4"]>;

// 热身9：自定义取数组中前N个元素
type Take<Tuple, N, Output extends any[] = []> = Tuple extends [
    infer First,
    ...infer Rest
]
    ? Output["length"] extends N
        ? Output
        : Take<Rest, N, [...Output, First]>
    : Output;

type a9 = Take<[1, 2, 3], 2>;
type b9 = Take<[1, 2], 5>;
