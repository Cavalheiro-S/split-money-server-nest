import { BadGatewayException, BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, map, throwError } from "rxjs";

export interface Response<T> {
    data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle()
            .pipe(catchError(err => {
                console.log("Error:");
                console.log(err);
                return throwError(() => new BadRequestException(err))
            }))
            .pipe(map(data => ({ data })))
    }

}