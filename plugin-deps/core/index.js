import { KibanaClient } from './kibana-client'

// export an instance of the KibanaClient, which will be made
// available to other applications at window.kibana
module.exports = new KibanaClient()
