// user.service.spec.ts (unit tests)
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserGetDto } from '../dtos/user-get.dto';
import { UserCreateDto } from '../dtos/user-create.dto';
import { UpdateUserDto } from '../dtos/user-update.dto';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { plainToInstance } from 'class-transformer';
import { AgeGroup } from '../../use-cases/stats/enums/age-group.enum';
import { Gender } from '../../use-cases/stats/enums/gender.enum';

// Mock data
const mockUser = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  gender: Gender.Male,
  age: 30,
  createdAt: new Date(),
  roleId: 1,
  role: { id: 1, name: 'Participant', users: [] },
  tickets: [],
};

const mockUserGetDto = plainToInstance(UserGetDto, mockUser, { excludeExtraneousValues: true });

// Unit tests
describe('UserService - Unit Tests', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return all users', async () => {
    // Arrange
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([mockUser]);

    // Act
    const result = await service.getAll();

    // Assert
    expect(result).toEqual([mockUserGetDto]);
  });

  it('should return a user by id', async () => {
    // Arrange
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    // Act
    const result = await service.getById(1);

    // Assert
    expect(result).toEqual(mockUserGetDto);
  });

  it('should throw an error if user not found by id', async () => {
    // Arrange
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    // Act & Assert
    await expect(service.getById(999)).rejects.toThrow('User not found');
  });

  it('should create a new user', async () => {
    // Arrange
    const createDto: UserCreateDto = {
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      gender: Gender.Female,
      age: 28,
      roleId: 1,
    };
    jest.spyOn(prismaService.user, 'create').mockResolvedValue({ ...mockUser, ...createDto });

    // Act
    const result = await service.create(createDto);

    // Assert
    expect(result).toEqual(plainToInstance(UserGetDto, { ...mockUser, ...createDto }, { excludeExtraneousValues: true }));
  });

  it('should update a user', async () => {
    // Arrange
    const updateDto: UpdateUserDto = {
      firstname: 'Johnny',
    };
    jest.spyOn(prismaService.user, 'update').mockResolvedValue({ ...mockUser, ...updateDto });

    // Act
    const result = await service.update(1, updateDto);

    // Assert
    expect(result).toEqual(plainToInstance(UserGetDto, { ...mockUser, ...updateDto }, { excludeExtraneousValues: true }));
  });

  it('should delete a user', async () => {
    // Arrange
    jest.spyOn(prismaService.user, 'delete').mockResolvedValue(mockUser);

    // Act
    const result = await service.delete(1);

    // Assert
    expect(result).toEqual(mockUserGetDto);
  });

  it('should filter users by age group', async () => {
    // Arrange
    const filters: UserFilterDto = { ageGroup: AgeGroup.Adult };
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([mockUser]);

    // Act
    const result = await service.filterUsers(filters);

    // Assert
    expect(result).toEqual([mockUserGetDto]);
  });

  it('should filter users by gender', async () => {
    // Arrange
    const filters: UserFilterDto = { gender: Gender.Male };
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([mockUser]);

    // Act
    const result = await service.filterUsers(filters);

    // Assert
    expect(result).toEqual([mockUserGetDto]);
  });

  it('should throw an error if conflicting filters are provided', async () => {
    // Arrange
    const filters: UserFilterDto = { hasUnclaimedTickets: true, hasNeverParticipated: true };

    // Act & Assert
    await expect(service.filterUsers(filters)).rejects.toThrow(
      "Les filtres 'user ayant au moins un ticket non réclamé' et 'user n'ayant jamais participé' ne peuvent pas être combinés."
    );
  });
});
