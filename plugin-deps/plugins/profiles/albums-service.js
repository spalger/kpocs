export class AlbumsService {
  constructor(photosService) {
    this.photosService = photosService
  }

  get() {
    return {
      album: 'My Photos',
      photos: this.photosService.get(),
    }
  }
}

console.log('AlbumsService class created', AlbumsService)
