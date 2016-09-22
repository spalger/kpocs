kibana.addProvider({
  id: 'albumsService',
  require: [ 'photosService' ],
  provide(photosService) {
    return new Promise(resolve => {
      require([ './albums-service' ], ({ AlbumsService }) => {
        resolve(new AlbumsService(photosService))
      })
    })
  },
})


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
