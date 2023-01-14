import { validate as isUuid } from 'uuid'
import camelCase from 'lodash-es/camelCase'
import snakeCase from 'lodash-es/snakeCase'

export const snakeCaseToCamelCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(snakeCaseToCamelCase)
  }
  if (!data || data.constructor?.name !== 'Object') {
    return data
  }
  return Object.keys(data).reduce((result, key) => {
    const value = snakeCaseToCamelCase(data[key])
    const keyValue = isUuid(key) ? key : camelCase(key)
    return { ...result, [keyValue]: value }
  }, {})
}

export const camelCaseToSnakeCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(camelCaseToSnakeCase)
  }

  if (!data || data.constructor?.name !== 'Object') {
    return data
  }

  return Object.keys(data).reduce((result, key) => {
    const value = camelCaseToSnakeCase(data[key])
    return { ...result, [snakeCase(key)]: value }
  }, {})
}
