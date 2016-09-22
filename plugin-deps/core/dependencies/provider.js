import Joi from 'joi-browser'

const SPEC_SCHEMA = Joi.object({
  id: Joi.string(),
  provide: Joi.func(),
  require: Joi.array().items(Joi.string()).optional().default([]),
  tags: Joi.array().items(Joi.string()).optional().default([]),
})

const validateSpec = rawSpec => {
  const { error, value } = Joi.validate(rawSpec, SPEC_SCHEMA, {
    convert: true,
    allowUnknown: false,
    skipFunctions: false,
    presence: 'required',
  })

  if (error) {
    throw error
  }

  return value
}

export class Provider {
  constructor(rawSpec) {
    const spec = validateSpec(rawSpec)
    this._id = spec.id
    this._requiredProviderIds = spec.require || []
    this._tags = spec.tags || []
    this._initializer = spec.provide
  }

  getId() {
    return this._id
  }

  getRequiredProviderIds() {
    return this._requiredProviderIds
  }

  hasTag(tag) {
    return this._tags.includes(tag)
  }

  async instanciate(deps) {
    return await this._initializer.apply(null, deps)
  }
}
