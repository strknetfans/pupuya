import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
	constructor(private readonly prisma: PrismaService) { }

	async create(input: CreateContentDto & { userId: string }) {
		// 创建内容
		const content = await this.prisma.content.create({
			data: {
				userId: input.userId,
				title: input.title,
				description: input.description,
				privacy: input.privacy ?? 'PUBLIC',
				images: {
					create: input.images.map(url => ({ url })),
				},
				tags: input.tags && input.tags.length > 0 ? {
					connectOrCreate: input.tags.map(name => ({
						where: { name },
						create: { name },
					})),
				} : undefined,
			},
			include: {
				images: true,
				tags: true,
			},
		});
		return content;
	}

	async getById(id: string) {
		const content = await this.prisma.content.findUnique({
			where: { id },
			include: {
				images: true,
				tags: true,
				likes: true,
				favorites: true,
				comments: true,
			},
		});
		if (!content) throw new NotFoundException('Content not found');
		return content;
	}

	async update(id: string, userId: string, dto: UpdateContentDto) {
		const content = await this.prisma.content.findUnique({ where: { id } });
		if (!content) throw new NotFoundException('Content not found');
		if (content.userId !== userId) throw new ForbiddenException('No permission');
		return this.prisma.content.update({
			where: { id },
			data: {
				title: dto.title,
				description: dto.description,
				privacy: dto.privacy,
				// images、tags 可扩展
			},
		});
	}

	async delete(id: string, userId: string) {
		const content = await this.prisma.content.findUnique({ where: { id } });
		if (!content) throw new NotFoundException('Content not found');
		if (content.userId !== userId) throw new ForbiddenException('No permission');
		return this.prisma.content.delete({ where: { id } });
	}

	async like(id: string, userId: string) {
		// 点赞（幂等）
		return this.prisma.like.upsert({
			where: { userId_contentId: { userId, contentId: id } },
			update: {},
			create: { userId, contentId: id },
		});
	}

	async favorite(id: string, userId: string) {
		// 收藏（幂等）
		return this.prisma.favorite.upsert({
			where: { userId_contentId: { userId, contentId: id } },
			update: {},
			create: { userId, contentId: id },
		});
	}

	async share(id: string, userId: string) {
		// 分享逻辑可扩展
		return { success: true };
	}

	async getFeed(userId: string) {
		// 简单内容流
		return this.prisma.content.findMany({
			orderBy: { createdAt: 'desc' },
			include: {
				images: true,
				tags: true,
				likes: true,
				favorites: true,
			},
		});
	}
} 