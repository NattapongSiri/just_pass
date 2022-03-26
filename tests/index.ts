import {generatePassword, lowercase, uppercase, numeric, symbol} from '../src'
import {describe, it} from 'mocha'
import {expect} from 'chai'

describe("Test generatePassword", () => {
  it("Default option test", () => {
    const pwd = generatePassword()
    expect(isIntersect(pwd, lowercase)).to.be.true
    expect(isIntersect(pwd, uppercase)).to.be.true
    expect(isIntersect(pwd, numeric)).to.be.true
    expect(isIntersect(pwd, symbol)).to.be.true
    expect(pwd).to.have.lengthOf(16)
  })
  it("Without duplicate char", () => {
    const pwd = generatePassword({noDuplicate: true})
    expect(isIntersect(pwd, lowercase)).to.be.true
    expect(isIntersect(pwd, uppercase)).to.be.true
    expect(isIntersect(pwd, numeric)).to.be.true
    expect(isIntersect(pwd, symbol)).to.be.true
    expect(isDuplicate(pwd)).to.be.false
    expect(pwd).to.have.lengthOf(16)
  })
  it("With specific length", () => {
    const length = 128
    const pwd = generatePassword({length})
    expect(isIntersect(pwd, lowercase)).to.be.true
    expect(isIntersect(pwd, uppercase)).to.be.true
    expect(isIntersect(pwd, numeric)).to.be.true
    expect(isIntersect(pwd, symbol)).to.be.true
    expect(pwd).to.have.lengthOf(length)
  })
  it("With custom characterGroups and predefined length", () => {
    const length = 8
    const pwd = generatePassword({characterGroups: [lowercase, uppercase], length})
    expect(isIntersect(pwd, lowercase)).to.be.true
    expect(isIntersect(pwd, uppercase)).to.be.true
    expect(isIntersect(pwd, numeric)).to.be.false
    expect(isIntersect(pwd, symbol)).to.be.false
    expect(pwd).to.have.lengthOf(length)
  })
  it("With single characterGroup and predefined length", () => {
    const length = 4
    const pwd = generatePassword({characterGroups: [numeric], length})
    expect(isIntersect(pwd, lowercase)).to.be.false
    expect(isIntersect(pwd, uppercase)).to.be.false
    expect(isIntersect(pwd, numeric)).to.be.true
    expect(isIntersect(pwd, symbol)).to.be.false
    expect(pwd).to.have.lengthOf(length)
  })
  it("With very short length", () => {
    const length = 3
    const pwd = generatePassword({length})
    expect(pwd).to.have.lengthOf(length)
  })
  it("With length longer than available character groups", () => {
    const length = 12
    const pwd = generatePassword({characterGroups: [numeric], length})
    expect(isIntersect(pwd, lowercase)).to.be.false
    expect(isIntersect(pwd, uppercase)).to.be.false
    expect(isIntersect(pwd, numeric)).to.be.true
    expect(isIntersect(pwd, symbol)).to.be.false
    expect(isDuplicate(pwd)).to.be.true
    expect(pwd).to.have.lengthOf(length)
  })
  it("With length longer than available character groups and enforce no duplication", () => {
    const length = 11
    expect(() => generatePassword({characterGroups: [numeric], noDuplicate: true, length})).to.throw("Depleted character groups. The given constraints cannot be applied. Potential reason is length is too long or character groups is too small.")
  })
  it("With length exactly equals to available character groups and enforce no duplication", () => {
    const length = 10
    const pwd = generatePassword({characterGroups: [numeric], noDuplicate: true, length})
    expect(isIntersect(pwd, lowercase)).to.be.false
    expect(isIntersect(pwd, uppercase)).to.be.false
    expect(isIntersect(pwd, numeric)).to.be.true
    expect(isIntersect(pwd, symbol)).to.be.false
    expect(isDuplicate(pwd)).to.be.false
    expect(pwd).to.have.lengthOf(length)
  })
})
function isIntersect(a: string, b: string) {
  for (let ch of a) {
    if (b.indexOf(ch) !== -1) return true
  }
  return false
}
function isDuplicate(str: string) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) !== i || str.indexOf(str[i], i + 1) !== -1) return true
  }
  return false
}