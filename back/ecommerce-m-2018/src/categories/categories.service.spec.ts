import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: CategoriesRepository;

  beforeEach(async () => {
    const mockCategoriesRepository = {
      addCategories: jest.fn().mockResolvedValue('Category added'),
      getCategories: jest
        .fn()
        .mockResolvedValue([{ id: '1', name: 'Category 1' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: CategoriesRepository, useValue: mockCategoriesRepository },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addCategories', () => {
    it('should add a category and return a success message', async () => {
      const result = await service.addCategories();
      expect(result).toBe('Category added');
      expect(repository.addCategories).toHaveBeenCalled();
    });
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const result = await service.getCategories();
      expect(result).toEqual([{ id: '1', name: 'Category 1' }]);
      expect(repository.getCategories).toHaveBeenCalled();
    });
  });
});
