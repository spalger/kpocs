import { AlbumsService } from './albums-service'

// sync with direct `import`
kibana.addProvider({
  id: 'albumsService',
  require: [ 'photosService' ],
  provide(photosService) {
    return new AlbumsService(photosService)
  },
})

// async with Promise constructor
kibana.addProvider({
  id: 'profilesService',
  require: [ 'albumsService' ],
  provide(albumsService) {
    return new Promise(resolve => {
      require([ './profiles-service' ], ({ ProfilesService }) => {
        resolve(new ProfilesService(albumsService))
      })
    })
  },
})
