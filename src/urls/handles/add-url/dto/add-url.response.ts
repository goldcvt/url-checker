import { ApiResponseProperty } from '@nestjs/swagger';

export class AddUrlResponse {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  url: string;

  @ApiResponseProperty({ type: String })
  lastResolvedIp: string;
}
