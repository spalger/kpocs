import { attempt, map as asyncMap } from 'bluebird'

import { Provider } from './provider'

export class ProviderCollection {
  _providers = []
  _loadPromises = Object.create(null)

  add(spec) {
    this._providers.push(new Provider(spec))
  }

  withTag(tag) {
    return this._providers.filter(p => p.hasTag(tag))
  }

  async get(id) {
    if (!this._loadPromises[id]) {
      this._createLoadPromise(id)
    }

    return await this._loadPromises[id]
  }

  // list of id's that are being loaded, used to detect circular dependencies
  _loadPath = []
  _createLoadPromise(id) {
    const provider = this._providers.find(p => p.getId() === id)
    if (!provider) {
      throw new TypeError(`Unknown provider "${id}"`)
    }

    if (this._loadPath.includes(id)) {
      const path = this._loadPath.concat(id).join(' -> ')
      throw new TypeError(`
        Circular dependendency found while loading Provider(${this._loadPath[0]})
        path: ${path}
      `)
    }

    // track the load promise so that we can track which providers are
    // loading, and use it as a container for the instance
    this._loadPromises[id] = attempt(async () => {
      try {
        this._loadPath.push(id)
        const depIds = provider.getRequiredProviderIds()
        const deps = await asyncMap(depIds, depId => this.get(depId))
        return await provider.instanciate(deps)
      } finally {
        this._loadPath.pop()
      }
    })

    return this._loadPromises[id]
  }
}
