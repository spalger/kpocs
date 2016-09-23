import { ProviderCollection } from './dependencies'

export class KibanaClient {
  _providers = new ProviderCollection()

  addProvider(spec) {
    this._providers.add(spec)
  }

  async bootstrap() {
    const providers = this._providers

    const appProviders = providers.withTag('app')
    if (!appProviders.length) {
      throw new TypeError('Kibana client was not initialized with any providers tagged with "app"!')
    }

    const firstApp = await providers.get(appProviders[0].getId())
    console.log('bootstrap complete')
    console.log(firstApp)
  }
}
