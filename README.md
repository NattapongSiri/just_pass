[![NPM](https://nodei.co/npm/just_pass.png?mini=true)](https://npmjs.org/package/just_pass)

A library that generate a password that try to mix as much as possible on differnt character group.

# How to install
`npm i just_pass`

# How to use
Simplest way to generate a password:
```typescript
import { generatePassword } from 'just_pass'
// Default password contains mixture of lowercase, uppercase, numeric, and symbol.
// The defautl password length is 16.
let password = generatePassword() 
```
Extra password constraints:
```typescript
import { generatePassword, lowercase, uppercase } from 'just_pass'
// Default password contains mixture of lowercase, uppercase, numeric, and symbol.
// The constraints force password to have length of 12
let password12 = generatePassword({length: 12}) 
// An alphabet only with 32 length without any duplicate character
let alphabetPassword32 = generatePassword({characterGroups: [lowercase, uppercase], noDuplicate: true, length: 32}) 
```
## Supported constraints
- `length` - A length of generated password. It should be at least as long as number of groups. The default value is 4 times of - `characterGroups` length.
- `noDuplicate` - Force password to have completely no duplicate character. It's false by default.
- `characterGroups` - An array of string which will be used to generate a password. The default one have 4 groups. It consists of `lowercase`, `uppercase`, `numeric`, and `symbol`.