import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { GainService } from '../gain.service';
import { GainCreateDto } from '../dtos/gain-create.dto';
import { GainGetDto } from '../dtos/gain-get.dto';
import { GainUpdateDto } from '../dtos/gain-update.dto';

describe('Gain - Unitary Test', () => {
    let service: GainService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GainService,
                {
                    provide: PrismaService,
                    useValue: {
                        gain: {
                            findUnique: jest.fn(),
                            findMany: jest.fn(),
                            create: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                            findFirst: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<GainService>(GainService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    // GETBYID METHOD
    it('should return a GainGetDto when calling getById() and gain is found', async () => {
        // Arrange
        const mockGain: GainGetDto = {
            id: 1,
            name: 'Test Gain',
            desc: 'Description',
            price: 100,
            tickets: [],
        };
        prismaService.gain.findUnique = jest.fn().mockResolvedValue(mockGain);

        // Act
        const result = await service.getById(1);

        // Assert
        expect(result).toBeInstanceOf(GainGetDto);
        expect(result.id).toBe(mockGain.id);
    });

    it('should throw an error when calling getById() and gain is not found', async () => {
        // Arrange
        prismaService.gain.findUnique = jest.fn().mockResolvedValue(null);

        // Act & Assert
        await expect(service.getById(1)).rejects.toThrow('Gain not found');
    });

    // GETALL METHOD
    it('should return an array of GainGetDto when calling getAll()', async () => {
        // Arrange
        const mockGains: GainGetDto[] = [
            {
                id: 1,
                name: 'Gain 1',
                desc: 'Description 1',
                price: 50,
                tickets: [],
            },
            {
                id: 2,
                name: 'Gain 2',
                desc: 'Description 2',
                price: 100,
                tickets: [],
            },
        ];
        prismaService.gain.findMany = jest.fn().mockResolvedValue(mockGains);

        // Act
        const result = await service.getAll();

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(2);
        expect(result[0]).toBeInstanceOf(GainGetDto);
    });

    // CREATE METHOD
    it('should create a new gain and return GainGetDto when calling create()', async () => {
        // Arrange
        const mockCreateData: GainCreateDto = {
            name: 'New Gain',
            description: 'New Description',
            price: 150,
        };
        const mockCreatedGain: GainGetDto = {
            id: 3,
            name: 'New Gain',
            desc: 'New Description',
            price: 150,
            tickets: [],
        };
        prismaService.gain.create = jest.fn().mockResolvedValue(mockCreatedGain);

        // Act
        const result = await service.create(mockCreateData);

        // Assert
        expect(result).toBeInstanceOf(GainGetDto);
        expect(result.name).toBe(mockCreateData.name);
    });

    // UPDATE METHOD
    it('should update a gain and return updated GainGetDto when calling update()', async () => {
        // Arrange
        const mockUpdateData: GainUpdateDto = {
            name: 'Updated Gain',
            description: 'Updated Description',
        };
        const mockUpdatedGain: GainGetDto = {
            id: 1,
            name: 'Updated Gain',
            desc: 'Updated Description',
            price: 100,
            tickets: [],
        };
        prismaService.gain.update = jest.fn().mockResolvedValue(mockUpdatedGain);

        // Act
        const result = await service.update(1, mockUpdateData);

        // Assert
        expect(result).toBeInstanceOf(GainGetDto);
        expect(result.name).toBe(mockUpdateData.name);
    });

    // DELETE METHOD
    it('should delete a gain and return deleted GainGetDto when calling delete()', async () => {
        // Arrange
        const mockDeletedGain: GainGetDto = {
            id: 1,
            name: 'Deleted Gain',
            desc: 'Deleted Description',
            price: 100,
            tickets: [],
        };
        prismaService.gain.delete = jest.fn().mockResolvedValue(mockDeletedGain);

        // Act
        const result = await service.delete(1);

        // Assert
        expect(result).toBeInstanceOf(GainGetDto);
        expect(result.id).toBe(mockDeletedGain.id);
    });
});
