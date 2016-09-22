export class ProfilesService {
  constructor(albumsService) {
    this.albumsService = albumsService
  }

  get() {
    return {
      name: 'username',
      albums: this.albumsService.get(),
    }
  }
}

console.log('ProfilesService class created', ProfilesService)
