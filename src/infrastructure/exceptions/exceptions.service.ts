import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IException,
  IFormatExceptionMessage,
} from 'src/domain/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException('Method not implemented.');
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException('Method not implemented.');
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException('Method not implemented.');
  }
  UnauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException('Method not implemented.');
  }
}
