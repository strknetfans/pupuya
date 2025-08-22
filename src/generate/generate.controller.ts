import { Controller, Post, Get, Param, Body, Query, Req, UseGuards } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { CreateGenerateTaskDto } from './dto/create-generate-task.dto';
import { AuthGuard } from '../core/auth.guard';

@UseGuards(AuthGuard)
@Controller('generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) { }

  @Post('task')
  createTask(@Body() dto: CreateGenerateTaskDto, @Req() req) {
    return this.generateService.createTask({ ...dto, userId: req.user.id });
  }

  @Get('tasks/:taskId')
  getTask(@Param('taskId') taskId: string) {
    return this.generateService.getTask(taskId);
  }

  @Get('tasks/active')
  getActiveTasks(@Req() req) {
    return this.generateService.getActiveTasks(req.user.id);
  }

  @Get('tasks/:taskId/results')
  getTaskResults(@Param('taskId') taskId: string) {
    return this.generateService.getTaskResults(taskId);
  }

  @Get('history')
  getHistory(@Req() req) {
    return this.generateService.getHistory(req.user.id);
  }
} 