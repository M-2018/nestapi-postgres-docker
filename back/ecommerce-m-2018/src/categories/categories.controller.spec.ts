import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

const mockCategoriesService = {
  addCategories: jest.fn().mockResolvedValue('Categories added'),
  getCategories: jest.fn().mockResolvedValue([{ id: '1', name: 'Category 1' }]),
};

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addCategories', () => {
    it('should call CategoriesService.addCategories and return the result', async () => {
      const result = await controller.addCategories();
      expect(result).toBe('Categories added');
      expect(service.addCategories).toHaveBeenCalled();
    });
  });

  describe('getCategories', () => {
    it('should call CategoriesService.getCategories and return the result', async () => {
      const result = await controller.getCategories();
      expect(result).toEqual([{ id: '1', name: 'Category 1' }]);
      expect(service.getCategories).toHaveBeenCalled();
    });
  });
});
