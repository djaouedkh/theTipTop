// role.service.spec.ts (test unitaire)
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { RoleService } from '../role.service';
import { RoleCreateDto, RoleGetDto, RoleUpdateDto } from '../dtos/role.dto';
import 'reflect-metadata';

describe('RoleService - Unitary Test', () => {
    let service: RoleService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleService,
                {
                    provide: PrismaService,
                    useValue: {
                        role: {
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

        service = module.get<RoleService>(RoleService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    // GETALL METHOD
    it('should return an array of RoleGetDto when calling getAll()', async () => {
        // Arrange
        const mockRoles: RoleGetDto[] = [
            { id: 1, name: 'Admin', users: [] },
            { id: 2, name: 'Employee', users: [] },
        ];
        prismaService.role.findMany = jest.fn().mockResolvedValue(mockRoles);

        // Act
        const result = await service.getAll();

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(2);
        expect(result[0]).toBeInstanceOf(RoleGetDto);
    });

    // GETBYID METHOD
    it('should return a RoleGetDto when calling getById() and role is found', async () => {
        // Arrange
        const mockRole: RoleGetDto = { id: 1, name: 'Admin', users: [] };
        prismaService.role.findUnique = jest.fn().mockResolvedValue(mockRole);

        // Act
        const result = await service.getById(1);

        // Assert
        expect(result).toBeInstanceOf(RoleGetDto);
        expect(result.id).toBe(mockRole.id);
    });

    it('should throw an error when calling getById() and role is not found', async () => {
        // Arrange
        prismaService.role.findUnique = jest.fn().mockResolvedValue(null);

        // Act & Assert
        await expect(service.getById(1)).rejects.toThrow('Role not found');
    });

    // CREATE METHOD
    it('should create a new role and return RoleGetDto when calling create()', async () => {
        // Arrange
        const mockCreateData: RoleCreateDto = { name: 'Participant' };
        const mockCreatedRole: RoleGetDto = { id: 3, name: 'Participant', users: [] };
        prismaService.role.create = jest.fn().mockResolvedValue(mockCreatedRole);

        // Act
        const result = await service.create(mockCreateData);

        // Assert
        expect(result).toBeInstanceOf(RoleGetDto);
        expect(result.name).toBe(mockCreateData.name);
    });

    // DELETE METHOD
    it('should delete a role and return deleted RoleGetDto when calling delete()', async () => {
        // Arrange
        const mockDeletedRole: RoleGetDto = { id: 1, name: 'Admin', users: [] };
        prismaService.role.delete = jest.fn().mockResolvedValue(mockDeletedRole);

        // Act
        const result = await service.delete(1);

        // Assert
        expect(result).toBeInstanceOf(RoleGetDto);
        expect(result.id).toBe(mockDeletedRole.id);
    });
});
