// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<Permutation<"A">, ["A"]>>,
    Expect<
        Equal<
            Permutation<"A" | "B" | "C">,
            | ["A", "B", "C"]
            | ["A", "C", "B"]
            | ["B", "A", "C"]
            | ["B", "C", "A"]
            | ["C", "A", "B"]
            | ["C", "B", "A"]
        >
    >,
    Expect<
        Equal<
            Permutation<"B" | "A" | "C">,
            | ["A", "B", "C"]
            | ["A", "C", "B"]
            | ["B", "A", "C"]
            | ["B", "C", "A"]
            | ["C", "A", "B"]
            | ["C", "B", "A"]
        >
    >,
    Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
    Expect<Equal<Permutation<never>, []>>
];

// ============= Your Code Here =============
// TODO: 待完成
// type Permutation<T> = any;

// loop union
type loopUnion<
    Union extends string,
    Item extends string = Union
> = Item extends Item ? `loop ${Item}` : never;
type result = loopUnion<"A" | "B" | "C">; // "loop A" | "loop B" | "loop C"

// check T is never
type IsNever<T> = [T] extends [never] ? true : false;
// answer
/* type Permutation<Union, Item = Union> = Item extends Item
    ? PermuteItem<Union, Item>
    : never;

type PermuteItem<
    Union,
    Item,
    Rest = Exclude<Union, Item>
> = IsNever<Rest> extends true ? [Item] : [Item, ...Permutation<Rest>]; */

type Permutation<T, K = T> = [T] extends [never]
    ? []
    : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never;

type Permuted = Permutation<"a" | "b">; // ['a', 'b'] | ['b' | 'a']
