// contest.service.spec.ts (test unitaire)
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { ContestService } from '../contest.service';
import { ContestSearchDto, ContestIncludeDto, ContestGetDto } from '../dtos/contest-get.dto';
import { ContestCreateDto } from '../dtos/contest-create.dto';
import { ContestUpdateDto } from '../dtos/contest-update.dto';

describe('Contest - Unitary Test', () => {
    let service: ContestService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ContestService,
                {
                    provide: PrismaService,
                    useValue: {
                        contest: {
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

        service = module.get<ContestService>(ContestService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    // GETBYID METHOD
    it('should return a ContestGetDto when calling getById() and contest is found', async () => {
        // Arrange
        const mockContest: ContestGetDto = {
            id: 1,
            name: 'Test Contest',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-02-01'),
        };
        prismaService.contest.findUnique = jest.fn().mockResolvedValue(mockContest);

        // Act
        const result = await service.getById(1);

        // Assert
        expect(result).toBeInstanceOf(ContestGetDto);
        expect(result.id).toBe(mockContest.id);
    });

    it('should throw an error when calling getById() and contest is not found', async () => {
        // Arrange
        prismaService.contest.findUnique = jest.fn().mockResolvedValue(null);

        // Act & Assert
        await expect(service.getById(1)).rejects.toThrow('Contest not found');
    });

    // GETALL METHOD
    it('should return an array of ContestGetDto when calling getAll()', async () => {
        // Arrange
        const mockContests: ContestGetDto[] = [
            {
                id: 1,
                name: 'Test Contest 1',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-02-01'),
            },
            {
                id: 2,
                name: 'Test Contest 2',
                startDate: new Date('2024-03-01'),
                endDate: new Date('2024-04-01'),
            },
        ];
        prismaService.contest.findMany = jest.fn().mockResolvedValue(mockContests);

        // Act
        const result = await service.getAll();

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(2);
        expect(result[0]).toBeInstanceOf(ContestGetDto);
    });

    // CREATE METHOD
    it('should create a new contest and return ContestGetDto when calling create()', async () => {
        // Arrange
        const mockCreateData: ContestCreateDto = {
            name: 'New Contest',
            startDate: new Date('2024-05-01'),
            endDate: new Date('2024-06-01'),
        };
        const mockCreatedContest: ContestGetDto = {
            id: 3,
            name: 'New Contest',
            startDate: new Date('2024-05-01'),
            endDate: new Date('2024-06-01'),
        };
        prismaService.contest.create = jest.fn().mockResolvedValue(mockCreatedContest);

        // Act
        const result = await service.create(mockCreateData);

        // Assert
        expect(result).toBeInstanceOf(ContestGetDto);
        expect(result.name).toBe(mockCreateData.name);
    });

    // UPDATE METHOD
    it('should update a contest and return updated ContestGetDto when calling update()', async () => {
        // Arrange
        const mockUpdateData: ContestUpdateDto = {
            name: 'Updated Contest',
        };
        const mockUpdatedContest: ContestGetDto = {
            id: 1,
            name: 'Updated Contest',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-02-01'),
        };
        prismaService.contest.update = jest.fn().mockResolvedValue(mockUpdatedContest);

        // Act
        const result = await service.update(1, mockUpdateData);

        // Assert
        expect(result).toBeInstanceOf(ContestGetDto);
        expect(result.name).toBe(mockUpdateData.name);
    });

    // DELETE METHOD
    it('should delete a contest and return deleted ContestGetDto when calling delete()', async () => {
        // Arrange
        const mockDeletedContest: ContestGetDto = {
            id: 1,
            name: 'Deleted Contest',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-02-01'),
        };
        prismaService.contest.delete = jest.fn().mockResolvedValue(mockDeletedContest);

        // Act
        const result = await service.delete(1);

        // Assert
        expect(result).toBeInstanceOf(ContestGetDto);
        expect(result.id).toBe(mockDeletedContest.id);
    });

    // ISVALID METHOD
    it('should return true if contest is valid when calling isValid()', async () => {
        // Arrange
        const currentDate = new Date();
        const endDate = new Date();
        endDate.setDate(currentDate.getDate() + 15); // L'end date est dans 15 jours

        const mockContest: ContestGetDto = {
            id: 1,
            name: 'Valid Contest',
            startDate: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000), // Started 10 days ago
            endDate: endDate, // Ends in 15 days
        };
        prismaService.contest.findFirst = jest.fn().mockResolvedValue(mockContest);

        // Act
        const result = await service.isValid(mockContest);

        // Assert
        expect(result).toBe(true);
    });

});
