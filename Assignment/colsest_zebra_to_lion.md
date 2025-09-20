## Test Cases

| Input         | Expected Output |
| ------------- | --------------- |
| "LZ"          | 0               |
| "Z L"         | 1               |
| "L     Z"     | 5               |
| "L     L"     | -1              |
| "Z   Z   Z"   | -1              |
| "L  ZL Z"     | 0               |
|  "Z  LL Z"    | 1               |
|  "ZZ L  Z     | 1               |
|" Z LL  ZL"    | 0               |
|"   LLLLLL   Z"| 3               |
|"  L Z  ZZ  LL"| 1               |


check the first animal;
store the index;
check the next animal;
if it is same -> replace the index;
if its diff-> replace the index, store the diff b/w their indexes -1 as minimum,
loop through all;

