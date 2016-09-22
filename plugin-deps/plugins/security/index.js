kibana.addProvider({
  tags: [ 'es.before' ],
  async provide() {
    const { PhotosService } = await fcb(cb =>
      require([ './photos-service' ], m => cb(null, m))
    )

    return new PhotosService()
  },
})
