import { fromCallback as fcb } from 'bluebird'

kibana.addProvider({
  id: 'photosService',
  async provide() {
    const { PhotosService } = await fcb(cb =>
      require([ './photos-service' ], m => cb(null, m))
    )

    return new PhotosService()
  },
})
