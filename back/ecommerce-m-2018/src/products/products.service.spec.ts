import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

const mockProductsRepository = {
  getProducts: jest.fn().mockResolvedValue([{ id: '1', name: 'Product 1' }]),
  getProduct: jest
    .fn()
    .mockImplementation((id: string) =>
      Promise.resolve({ id, name: 'Product 1' }),
    ),
  addProducts: jest.fn().mockResolvedValue('Products added'),
  updateProduct: jest.fn().mockResolvedValue('Product updated'),
};

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: mockProductsRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const result = await service.getProducts(1, 10);
      expect(result).toEqual([{ id: '1', name: 'Product 1' }]);
      expect(repository.getProducts).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('getProduct', () => {
    it('should return a product by id', async () => {
      const result = await service.getProduct('1');
      expect(result).toEqual({ id: '1', name: 'Product 1' });
      expect(repository.getProduct).toHaveBeenCalledWith('1');
    });
  });

  describe('addProducts', () => {
    it('should return a success message', async () => {
      const result = await service.addProducts();
      expect(result).toBe('Products added');
      expect(repository.addProducts).toHaveBeenCalled();
    });
  });

  describe('updateProducts', () => {
    it('should return a success message', async () => {
      const result = await service.updateProducts('1', {
        name: 'Updated Product',
      });
      expect(result).toBe('Product updated');
      expect(repository.updateProduct).toHaveBeenCalledWith('1', {
        name: 'Updated Product',
      });
    });
  });
});
