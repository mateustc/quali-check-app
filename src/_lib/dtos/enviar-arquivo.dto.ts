export class ImageDto {

  pending = false;
  status = 'init';

  constructor(public src?: string, public file?: File) { }
}
