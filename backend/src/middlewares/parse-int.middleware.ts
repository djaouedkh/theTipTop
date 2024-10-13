import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ParseIntMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        // Convertit tous les champs en nombre s'ils contiennent une valeur numérique
        Object.keys(req.query).forEach(key => {
            if (!isNaN(req.query[key])) {
                req.query[key] = parseInt(req.query[key], 10);
            }
        });
        next();
    }
}