import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LotteryGame, User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { UserGetDto } from '../users/dtos/user-get.dto';
import { LotteryGameGetDto } from './dtos/lottery-game-get.dto';

@Injectable()
export class LotteryGameService {
    constructor(private prisma: PrismaService) {}

    async get(): Promise<LotteryGameGetDto> {
        const data = this.prisma.lotteryGame.findFirst({
            include: {
                user: true,
            },
        });
        return plainToInstance(LotteryGameGetDto, data, { excludeExtraneousValues: true });
    }
    

    async play(): Promise<LotteryGameGetDto> {
        // Vérifier si un gagnant existe déjà
        const lotteryGame = await this.get();
        if (lotteryGame.userId) {
            throw new Error("Un gagnant a déjà été tiré au sort.");
        }

        // Récupérer tous les utilisateurs ayant au moins un ticket
        const participants = await this.prisma.user.findMany({
            where: {
                tickets: {
                    some: {},
                },
            },
        });

        if (participants.length === 0) {
            throw new Error("Aucun participant n'est éligible.");
        }

        const winnerId = await this.performDraw();

        // update lottery game with winner
        const newLotteryGame = await this.prisma.lotteryGame.update({
            where: { id: lotteryGame.id },
            data: {
                userId: winnerId,
            },
            include: {
                user: true,
            },
        });

        return plainToInstance(LotteryGameGetDto, newLotteryGame, { excludeExtraneousValues: true });
    }

    // New separate method to handle the draw logic
    private async performDraw(): Promise<number> {
        // Récupérer tous les utilisateurs ayant au moins un ticket
        const participants = await this.prisma.user.findMany({
            where: {
                tickets: {
                    some: {}, // Vérifier si l'utilisateur a au moins un ticket
                },
            },
        });

        if (participants.length === 0) {
            throw new Error("Aucun participant n'est éligible.");
        }

        // Tirer un gagnant aléatoire (sans prendre en compte le nombre de tickets)
        // math.floor pour arrondir à l'entier inférieur
        // math.random * participants.length pour générer un nombre aléatoire entre 0 et le nombre de participants
        const winnerIndex = Math.floor(Math.random() * participants.length);
        return participants[winnerIndex].id;
    }
}
