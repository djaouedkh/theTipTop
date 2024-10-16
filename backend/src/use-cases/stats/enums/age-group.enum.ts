export enum AgeGroup {
    YoungAdult = '18-25',
    Adult = '26-35',
    MiddleAged = '36-45',
    Senior = '46-55',
    Elder = '56+'
}

export type AgeGroupCount = {
    [key in AgeGroup]: number;
};
