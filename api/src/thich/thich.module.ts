import { Module } from '@nestjs/common';
import { ThichController } from './thich.controller';
import { ThichService } from './thich.service';

@Module({
  controllers: [ThichController],
  providers: [ThichService]
})
export class ThichModule {}
