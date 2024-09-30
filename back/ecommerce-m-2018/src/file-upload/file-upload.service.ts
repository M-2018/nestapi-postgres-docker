import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadRepository } from './file-upload.repository';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async uploadProductImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      return 'Product Does not exists';
    }
    const uploadedImage = await this.fileUploadRepository.uploadImage(file);
    console.log(uploadedImage);
    await this.productsRepository.update(productId, {
      imgUrl: uploadedImage.secure_url,
    });

    const updateProduct = await this.productsRepository.findOneBy({
      id: productId,
    });

    return updateProduct;
  }
}
