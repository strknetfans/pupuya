import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenerateTaskDto } from './dto/create-generate-task.dto';

@Injectable()
export class GenerateService {
  constructor(private readonly prisma: PrismaService) { }

  async createTask(input: CreateGenerateTaskDto & { userId: string }) {
    // 创建生成任务
    const task = await this.prisma.generationTask.create({
      data: {
        userId: input.userId,
        prompt: input.prompt,
        negativePrompt: input.negativePrompt,
        imageSize: input.width ?? 768,
        seed: input.seed,
        steps: input.steps ?? 20,
        cfgScale: input.cfgScale ?? 7.0,
        model: input.model,
        controlMode: input.controlMode,
        // styles、images 需单独处理
      },
    });
    // styles 关联
    if (input.styles && input.styles.length > 0) {
      await this.prisma.generationTaskStyle.createMany({
        data: input.styles.map(style => ({
          style,
          generationTaskId: task.id,
        })),
      });
    }
    return task;
  }

  async getTask(taskId: string) {
    const task = await this.prisma.generationTask.findUnique({
      where: { id: taskId },
      include: {
        styles: true,
        images: true,
        content: true,
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async getActiveTasks(userId: string) {
    return this.prisma.generationTask.findMany({
      where: {
        userId,
        status: { in: ['PENDING', 'PROCESSING'] },
      },
      orderBy: { createTime: 'desc' },
    });
  }

  async getTaskResults(taskId: string) {
    const task = await this.prisma.generationTask.findUnique({
      where: { id: taskId },
      select: {
        images: true,
        status: true,
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async getHistory(userId: string) {
    return this.prisma.generationTask.findMany({
      where: { userId },
      orderBy: { createTime: 'desc' },
      include: {
        styles: true,
        images: true,
      },
    });
  }

} 