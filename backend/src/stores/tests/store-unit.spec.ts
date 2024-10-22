// store.service.spec.ts (tests unitaires)
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { StoreService } from '../store.service';
import { StoreGetDto, StoreCreateDto, StoreUpdateDto } from '../dtos/store.dto';

describe('StoreService - Unitary Tests', () => {
  let service: StoreService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreService,
        {
          provide: PrismaService,
          useValue: {
            store: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<StoreService>(StoreService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  // GETALL METHOD
  it('should return an array of StoreGetDto when calling getAll()', async () => {
    // Arrange
    const mockStores: StoreGetDto[] = [
      {
        id: 1,
        name: 'Store 1',
        address: '123 Main St',
        city: 'Paris',
        postalCode: '75001',
        gainDeliveries: [],
      },
      {
        id: 2,
        name: 'Store 2',
        address: '456 Side St',
        city: 'Lyon',
        postalCode: '69001',
        gainDeliveries: [],
      },
    ];
    prismaService.store.findMany = jest.fn().mockResolvedValue(mockStores);

    // Act
    const result = await service.getAll();

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(2);
    expect(result[0]).toBeInstanceOf(StoreGetDto);
  });

  // GETBYID METHOD
  it('should return a StoreGetDto when calling getById() and store is found', async () => {
    // Arrange
    const mockStore: StoreGetDto = {
      id: 1,
      name: 'Store 1',
      address: '123 Main St',
      city: 'Paris',
      postalCode: '75001',
      gainDeliveries: [],
    };
    prismaService.store.findUnique = jest.fn().mockResolvedValue(mockStore);

    // Act
    const result = await service.getById(1);

    // Assert
    expect(result).toBeInstanceOf(StoreGetDto);
    expect(result.id).toBe(mockStore.id);
  });

  it('should throw an error when calling getById() and store is not found', async () => {
    // Arrange
    prismaService.store.findUnique = jest.fn().mockResolvedValue(null);

    // Act & Assert
    await expect(service.getById(1)).rejects.toThrow('Store not found');
  });

  // CREATE METHOD
  it('should create a new store and return StoreGetDto when calling create()', async () => {
    // Arrange
    const mockCreateData: StoreCreateDto = {
      name: 'New Store',
      address: '789 New St',
      city: 'Marseille',
      postalCode: '13001',
    };
    const mockCreatedStore: StoreGetDto = {
      id: 3,
      name: 'New Store',
      address: '789 New St',
      city: 'Marseille',
      postalCode: '13001',
      gainDeliveries: [],
    };
    prismaService.store.create = jest.fn().mockResolvedValue(mockCreatedStore);

    // Act
    const result = await service.create(mockCreateData);

    // Assert
    expect(result).toBeInstanceOf(StoreGetDto);
    expect(result.name).toBe(mockCreateData.name);
  });

  // UPDATE METHOD
  it('should update a store and return updated StoreGetDto when calling update()', async () => {
    // Arrange
    const mockUpdateData: StoreUpdateDto = {
      name: 'Updated Store',
    };
    const mockUpdatedStore: StoreGetDto = {
      id: 1,
      name: 'Updated Store',
      address: '123 Main St',
      city: 'Paris',
      postalCode: '75001',
      gainDeliveries: [],
    };
    prismaService.store.update = jest.fn().mockResolvedValue(mockUpdatedStore);

    // Act
    const result = await service.update(1, mockUpdateData);

    // Assert
    expect(result).toBeInstanceOf(StoreGetDto);
    expect(result.name).toBe(mockUpdateData.name);
  });

  // DELETE METHOD
  it('should delete a store and return deleted StoreGetDto when calling delete()', async () => {
    // Arrange
    const mockDeletedStore: StoreGetDto = {
      id: 1,
      name: 'Deleted Store',
      address: '123 Main St',
      city: 'Paris',
      postalCode: '75001',
      gainDeliveries: [],
    };
    prismaService.store.delete = jest.fn().mockResolvedValue(mockDeletedStore);

    // Act
    const result = await service.delete(1);

    // Assert
    expect(result).toBeInstanceOf(StoreGetDto);
    expect(result.id).toBe(mockDeletedStore.id);
  });
});
