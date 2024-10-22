// ticket.service.spec.ts (unit tests)
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { TicketService } from '../ticket.service';
import { TicketGetDto } from '../dtos/ticket-get.dto';
import { TicketCreateDto } from '../dtos/ticket-create.dto';
import { TicketUpdateDto } from '../dtos/ticket-update.dto';
import { GainService } from '../../gains/gain.service';

// Mock data for testing
const mockTicket: TicketGetDto = {
  id: 1,
  code: 'TICKET123',
  isDelivered: false,
  contestId: 1,
  gainId: 2,
  userId: 3,
  contest: undefined,
  gain: undefined,
  user: undefined,
};

describe('TicketService - Unit Tests', () => {
  let service: TicketService;
  let prismaService: PrismaService;
  let gainService: GainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: PrismaService,
          useValue: {
            ticket: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              createMany: jest.fn(),
            },
          },
        },
        {
          provide: GainService,
          useValue: {
            associateIdsWithGainTypes: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    prismaService = module.get<PrismaService>(PrismaService);
    gainService = module.get<GainService>(GainService);
  });

  // GETALL METHOD
  it('should return an array of TicketGetDto when calling getAll()', async () => {
    // Arrange
    prismaService.ticket.findMany = jest.fn().mockResolvedValue([mockTicket]);

    // Act
    const result = await service.getAll();

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0]).toBeInstanceOf(TicketGetDto);
  });

  // GETBYID METHOD
  it('should return a TicketGetDto when calling getById() and ticket is found', async () => {
    // Arrange
    prismaService.ticket.findUnique = jest.fn().mockResolvedValue(mockTicket);

    // Act
    const result = await service.getById(1);

    // Assert
    expect(result).toBeInstanceOf(TicketGetDto);
    expect(result.id).toBe(mockTicket.id);
  });

  it('should throw an error when calling getById() and ticket is not found', async () => {
    // Arrange
    prismaService.ticket.findUnique = jest.fn().mockResolvedValue(null);

    // Act & Assert
    await expect(service.getById(1)).rejects.toThrow('Ticket not found');
  });

  // CREATE METHOD
  it('should create a new ticket and return TicketGetDto when calling create()', async () => {
    // Arrange
    const mockCreateData: TicketCreateDto = {
      code: 'TICKET123',
      contestId: 1,
      gainId: 2,
    };
    prismaService.ticket.create = jest.fn().mockResolvedValue(mockTicket);

    // Act
    const result = await service.create(mockCreateData);

    // Assert
    expect(result).toBeInstanceOf(TicketGetDto);
    expect(result.code).toBe(mockCreateData.code);
  });

  // UPDATE METHOD
  it('should update a ticket and return updated TicketGetDto when calling update()', async () => {
    // Arrange
    const mockUpdateData: TicketUpdateDto = {
      code: 'UPDATED123',
      isDelivered: true,
    };
    const updatedTicket = { ...mockTicket, ...mockUpdateData };
    prismaService.ticket.update = jest.fn().mockResolvedValue(updatedTicket);

    // Act
    const result = await service.update(1, mockUpdateData);

    // Assert
    expect(result).toBeInstanceOf(TicketGetDto);
    expect(result.code).toBe(mockUpdateData.code);
    expect(result.isDelivered).toBe(mockUpdateData.isDelivered);
  });

  // DELETE METHOD
  it('should delete a ticket and return deleted TicketGetDto when calling delete()', async () => {
    // Arrange
    prismaService.ticket.delete = jest.fn().mockResolvedValue(mockTicket);

    // Act
    const result = await service.delete(1);

    // Assert
    expect(result).toBeInstanceOf(TicketGetDto);
    expect(result.id).toBe(mockTicket.id);
  });

  // GENERATE TICKETS METHOD
  it('should generate tickets when calling generateTickets()', async () => {
    // Arrange
    prismaService.ticket.createMany = jest.fn().mockResolvedValue({ count: 10 });
    service['generateTicketCode'] = jest.fn().mockReturnValue('GENERATED_CODE');
    gainService.associateIdsWithGainTypes = jest.fn().mockResolvedValue({
      INFUSEUR_THE: 1,
      BOITE_THE_DETOX: 2,
      BOITE_THE_SIGNATURE: 3,
      COFFRET_DECOUVERTE_39: 4,
      COFFRET_DECOUVERTE_69: 5,
    });

    // Act
    await service.generateTickets(10);

    // Assert
    expect(prismaService.ticket.createMany).toHaveBeenCalled();
    expect(prismaService.ticket.createMany).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.any(Array) })
    );
  });
});
