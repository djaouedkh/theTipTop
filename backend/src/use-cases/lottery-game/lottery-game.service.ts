import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { LotteryGame, User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LotteryGameService {
    constructor(private prisma: PrismaService) {}

    async getWinner(): Promise<User | null> {
        const lotteryGame = await this.prisma.lotteryGame.findFirst({
            include: { user: true },
        });
        return lotteryGame ? lotteryGame.user : null;
    }

    async drawWinner(): Promise<User> {
        const existingWinner = await this.getWinner();
        if (existingWinner) {
            throw new Error("Un gagnant a déjà été tiré au sort.");
        }

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

        const winnerIndex = Math.floor(Math.random() * participants.length);
        const winner = participants[winnerIndex];

        await this.prisma.lotteryGame.create({
            data: {
                name: "Gros lot - Un an de thé",
                playDate: new Date(),
                userId: winner.id,
            },
        });

        return winner;
    }
}
