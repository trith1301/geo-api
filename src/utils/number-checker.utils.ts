import { NumberTypes } from '../core/enums'

export const numberChecker = (stringNumber: string) => {
  const numberValue = +stringNumber

  if (Number.isFinite(numberValue)) {
    if (Number.isInteger(numberValue)) {
      return NumberTypes.INTEGER
    } else {
      return NumberTypes.DOUBLE
    }
  } else {
    return NumberTypes.NOT_A_NUMBER
  }
}
