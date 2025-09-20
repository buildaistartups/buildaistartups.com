import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { quizSchema, miniPlanSchema } from './schemas'

// Initialize Ajv with draft-07 support
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false
})

// Add format validators
addFormats(ajv)

// Precompiled validators
export const validateQuiz = ajv.compile(quizSchema)
export const validateMiniPlan = ajv.compile(miniPlanSchema)

// Helper to convert Ajv errors to user-friendly messages
export function ajvErrorsToMessage(errors: any[] | null | undefined): string {
  if (!errors || errors.length === 0) return 'Validation passed'
  
  return errors
    .map(err => {
      const field = err.instancePath ? err.instancePath.substring(1) : err.params?.missingProperty || 'field'
      
      switch (err.keyword) {
        case 'required':
          return `${field} is required`
        case 'enum':
          return `${field} must be one of: ${err.params.allowedValues.join(', ')}`
        case 'minLength':
          return `${field} must be at least ${err.params.limit} characters`
        case 'maxLength':
          return `${field} must be no more than ${err.params.limit} characters`
        case 'minItems':
          return `${field} must have at least ${err.params.limit} items`
        case 'maxItems':
          return `${field} must have no more than ${err.params.limit} items`
        default:
          return `${field}: ${err.message}`
      }
    })
    .join('; ')
}
