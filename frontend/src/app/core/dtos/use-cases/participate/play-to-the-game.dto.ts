import { GainGetDto } from "../../gains/gain-get.dto";

export class PlayToTheGameDto {
    gain?: GainGetDto | null = null;
    isWinner: boolean = false;
}