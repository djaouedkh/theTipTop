// gain-delivery.service.spec.ts (test unitaire)
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { GainDeliveryService } from '../gain-delivery.service';
import { GainDeliveryCreateDto } from '../dtos/gain-delivery-create.dto';
import { GainDeliveryGetDto } from '../dtos/gain-delivery-get.dto';
import { GainDeliveryUpdateDto } from '../dtos/gain-delivery-update.dto';


describe('GainDelivery - Unitary Test', () => {
    let service: GainDeliveryService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GainDeliveryService,
                {
                    provide: PrismaService,
                    useValue: {
                        gainDelivery: {
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

        service = module.get<GainDeliveryService>(GainDeliveryService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    // GETBYID METHOD
    it('should return a GainDeliveryGetDto when calling getById() and gain delivery is found', async () => {
        // Arrange
        const mockGainDelivery: GainDeliveryGetDto = {
            id: 1,
            deliveredDate: new Date('2024-01-01'),
            ticketId: 1,
            ticket: undefined,
            storeId: 1,
            store: undefined,
        };
        prismaService.gainDelivery.findUnique = jest.fn().mockResolvedValue(mockGainDelivery);

        // Act
        const result = await service.getById(1);

        // Assert
        expect(result).toBeInstanceOf(GainDeliveryGetDto);
        expect(result.id).toBe(mockGainDelivery.id);
    });

    it('should throw an error when calling getById() and gain delivery is not found', async () => {
        // Arrange
        prismaService.gainDelivery.findUnique = jest.fn().mockResolvedValue(null);

        // Act & Assert
        await expect(service.getById(1)).rejects.toThrow('Gain delivery not found');
    });

    // GETALL METHOD
    it('should return an array of GainDeliveryGetDto when calling getAll()', async () => {
        // Arrange
        const mockGainDeliveries: GainDeliveryGetDto[] = [
            {
                id: 1,
                deliveredDate: new Date('2024-01-01'),
                ticketId: 1,
                ticket: undefined,
                storeId: 1,
                store: undefined,
            },
            {
                id: 2,
                deliveredDate: new Date('2024-03-01'),
                ticketId: 2,
                ticket: undefined,
                storeId: 2,
                store: undefined,
            },
        ];
        prismaService.gainDelivery.findMany = jest.fn().mockResolvedValue(mockGainDeliveries);

        // Act
        const result = await service.getAll();

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(2);
        expect(result[0]).toBeInstanceOf(GainDeliveryGetDto);
    });

    // CREATE METHOD
    it('should create a new gain delivery and return GainDeliveryGetDto when calling create()', async () => {
        // Arrange
        const mockCreateData: GainDeliveryCreateDto = {
            deliveryDate: new Date('2024-05-01'),
            ticketId: 1,
            storeId: 1,
        };
        const mockCreatedGainDelivery: GainDeliveryGetDto = {
            id: 3,
            deliveredDate: new Date('2024-05-01'),
            ticketId: 1,
            ticket: undefined,
            storeId: 1,
            store: undefined,
        };
        prismaService.gainDelivery.create = jest.fn().mockResolvedValue(mockCreatedGainDelivery);

        // Act
        const result = await service.create(mockCreateData);

        // Assert
        expect(result).toBeInstanceOf(GainDeliveryGetDto);
        expect(result.ticketId).toBe(mockCreateData.ticketId);
    });

    // UPDATE METHOD
    it('should update a gain delivery and return updated GainDeliveryGetDto when calling update()', async () => {
        // Arrange
        const mockUpdateData: GainDeliveryUpdateDto = {
            deliveryDate: new Date('2024-06-01'),
            storeId: 2,
        };
        const mockUpdatedGainDelivery: GainDeliveryGetDto = {
            id: 1,
            deliveredDate: new Date('2024-06-01'),
            ticketId: 1,
            ticket: undefined,
            storeId: 2,
            store: undefined,
        };
        prismaService.gainDelivery.update = jest.fn().mockResolvedValue(mockUpdatedGainDelivery);

        // Act
        const result = await service.update(1, mockUpdateData);

        // Assert
        expect(result).toBeInstanceOf(GainDeliveryGetDto);
        expect(result.storeId).toBe(mockUpdateData.storeId);
    });

    // DELETE METHOD
    it('should delete a gain delivery and return deleted GainDeliveryGetDto when calling delete()', async () => {
        // Arrange
        const mockDeletedGainDelivery: GainDeliveryGetDto = {
            id: 1,
            deliveredDate: new Date('2024-01-01'),
            ticketId: 1,
            ticket: undefined,
            storeId: 1,
            store: undefined,
        };
        prismaService.gainDelivery.delete = jest.fn().mockResolvedValue(mockDeletedGainDelivery);

        // Act
        const result = await service.delete(1);

        // Assert
        expect(result).toBeInstanceOf(GainDeliveryGetDto);
        expect(result.id).toBe(mockDeletedGainDelivery.id);
    });
});
