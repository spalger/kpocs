kibana.addProvider({
  id: 'friendster',
  tags: [ 'app' ],
  require: [ 'profilesService' ],
  provide(profilesService) {
    console.log('ready to create Profile app')
    return {
      profile: profilesService.get(),
    }
  },
})
