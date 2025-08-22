import { Controller, Post, Get, Put, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { AuthGuard } from '../core/auth.guard';

@UseGuards(AuthGuard)
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) { }

  @Post()
  create(@Body() dto: CreateContentDto, @Req() req) {
    return this.contentService.create({ ...dto, userId: req.user.id });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.contentService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContentDto, @Req() req) {
    return this.contentService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    return this.contentService.delete(id, req.user.id);
  }

  @Post(':id/like')
  like(@Param('id') id: string, @Req() req) {
    return this.contentService.like(id, req.user.id);
  }

  @Post(':id/favorite')
  favorite(@Param('id') id: string, @Req() req) {
    return this.contentService.favorite(id, req.user.id);
  }

  @Post(':id/share')
  share(@Param('id') id: string, @Req() req) {
    return this.contentService.share(id, req.user.id);
  }

  @Get('feed')
  getFeed(@Req() req) {
    return this.contentService.getFeed(req.user.id);
  }
} 