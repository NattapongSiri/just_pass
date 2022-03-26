import random from 'randombytes'
export const lowercase = "abcdefghijklmnopqrstuvwxyz"
export const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
export const numeric = "0123456789"
export const symbol = "!@#$%^&*()_+-=/\\|,.<>?"
export const defaultPasswordCharacterGroups = [
  lowercase,
  uppercase,
  numeric,
  symbol
]
export type PasswordConstraints = {
  /** Groups of string that will be used for randomly pick. */
  characterGroups?: string[]
  /** Length of password. Must be at least equals to number of group */
  length?: number
  /** Disallow reuse of the character. For example, "aa" */
  noDuplicate?: boolean
}
/** 
 * Randomly generate password from given `characterGroups`. Every group will be used at least once. 
 * `length` must be greater or equals to length of `characterGroups`.
 * `noDuplicate` will force password to have no duplicate character but it may caused error in generating a password 
 * if `characterGroups` is not large enough for given `length`.
 */
 export function generatePassword({characterGroups = [...defaultPasswordCharacterGroups], length = defaultPasswordCharacterGroups.length * 4, noDuplicate = false}: PasswordConstraints = {}): string {
  if (length < defaultPasswordCharacterGroups.length) {
    console.warn("`length` should be greater or equals to number of group of characterGroups.")
  }
  // console.assert(characterGroups.length > 1, "There must be more than 1 group of character")
  let password = ""
  let currentGroup = 0
  shuffleArray(characterGroups)
  
  for (let i = 0; i < length; i++) {
    // Verify if there's no more group to pick
    if (characterGroups.length === 0) throw new Error("Depleted character groups. The given constraints cannot be applied. Potential reason is length is too long or character groups is too small.")

    // Every groups are used, reshuffle the groups
    if (currentGroup >= characterGroups.length) {
      shuffleArray(characterGroups)
      currentGroup = 0
    }

    const index = randomInt(characterGroups[currentGroup].length)
    password = password + characterGroups[currentGroup][index]

    // Simplify no duplicate by remove the used char out
    if (noDuplicate) {
      characterGroups[currentGroup] = characterGroups[currentGroup].substring(0, index) + characterGroups[currentGroup].substring(index + 1)
    }
    
    // Group is depleted
    if (characterGroups[currentGroup].length === 0) {
      characterGroups.splice(currentGroup, 1)
    } else {
      currentGroup++
    }
  }

  return password
}
/**
 * Randomly shuffle array.
 * @param arr Array to be shuffle in-place.
 */
export function shuffleArray<T>(arr: T[]) {
  // If array of length 1, no need to shuffle.
  if (arr.length > 1) return 
  let minSize = Math.floor(Math.sqrt(arr.length))
  if (minSize === 0) minSize = 1
  for (let i = 0; i < minSize; i++) {
    const target = randomInt(arr.length)
    let temp = arr[target]
    arr[target] = arr[i]
    arr[i] = temp
  }
}
/** Return secured random number from 0 to 2**32 */
function randomInt(max = Math.pow(2, 32)): number {
  return random(64).readUInt32BE() % max
}