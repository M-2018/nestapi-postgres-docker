import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';

const mockProductsService = {
  getProducts: jest.fn().mockResolvedValue([{ id: '1', name: 'Product 1' }]),
  getProduct: jest
    .fn()
    .mockImplementation((id: string) =>
      Promise.resolve({ id, name: 'Product 1' }),
    ),
  addProducts: jest.fn().mockResolvedValue('Products added'),
  updateProducts: jest.fn().mockResolvedValue('Product updated'),
};

const mockJwtService = {};
const mockAuthGuard = { canActivate: jest.fn().mockReturnValue(true) };
const mockRolesGuard = { canActivate: jest.fn().mockReturnValue(true) };

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: AuthGuard, useValue: mockAuthGuard },
        { provide: RolesGuard, useValue: mockRolesGuard },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const result = await controller.getProducts(1, 10);
      expect(result).toEqual([{ id: '1', name: 'Product 1' }]);
      expect(service.getProducts).toHaveBeenCalledWith(1, 10);
    });

    it('should return default products when no page and limit are provided', async () => {
      const result = await controller.getProducts(undefined, undefined);
      expect(result).toEqual([{ id: '1', name: 'Product 1' }]);
      expect(service.getProducts).toHaveBeenCalledWith(1, 5);
    });
  });

  describe('getProduct', () => {
    it('should return a product by id', async () => {
      const result = await controller.getProduct('1');
      expect(result).toEqual({ id: '1', name: 'Product 1' });
      expect(service.getProduct).toHaveBeenCalledWith('1');
    });
  });

  describe('addProducts', () => {
    it('should return a success message', async () => {
      const result = await controller.addProducts();
      expect(result).toBe('Products added');
      expect(service.addProducts).toHaveBeenCalled();
    });
  });

  describe('updateProduct', () => {
    it('should return a success message', async () => {
      const result = await controller.updateProduct('1', {
        name: 'Updated Product',
      });
      expect(result).toBe('Product updated');
      expect(service.updateProducts).toHaveBeenCalledWith('1', {
        name: 'Updated Product',
      });
    });
  });
});
