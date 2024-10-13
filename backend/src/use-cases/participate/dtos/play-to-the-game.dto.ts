import { GainGetDto } from "../../../gains/dtos/gain-get.dto";

export class PlayToTheGameDto {
    gain?: GainGetDto | null = null;
    isWinner: boolean = false;
}