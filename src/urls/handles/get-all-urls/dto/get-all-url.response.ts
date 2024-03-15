import {
  ApiResponseProperty,
  IntersectionType,
  PartialType,
} from '@nestjs/swagger';

class GetAllUrlsRequired {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  url: string;

  @ApiResponseProperty({ type: String })
  lastResolvedIp: string;
}

class GetAllUrlsNullable {
  @ApiResponseProperty({ type: Date })
  lastResolvedAt: Date;

  @ApiResponseProperty({ type: Number })
  lastCheckStaus: number;
}

export class GetAllUrlResponse extends IntersectionType(
  GetAllUrlsRequired,
  PartialType(GetAllUrlsNullable),
) {}
