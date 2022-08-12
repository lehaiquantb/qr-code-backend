import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    InternalServerErrorException,
    Query,
    ParseIntPipe,
    Request,
} from '@nestjs/common';

import {
    HttpStatus,
    BaseController,
    ErrorResponse,
    SuccessResponse,
    DatabaseService,
    IRequest,
    Auth,
} from '~common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '~category/services/category.service';

import {
    CategoryResponseDto,
    CategoryListResponseDto,
} from '~category/dto/response/category.response.dto';
import { CategoryRepository } from '~category/category.repository';
import {
    QueryListCategoryDto,
    CreateCategoryDto,
    UpdateCategoryDto,
} from '~category/dto/request/category.request.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController extends BaseController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly databaseService: DatabaseService,
        private readonly categoryRepository: CategoryRepository,
    ) {
        super();
    }

    @Get(':id')
    @Auth(['read_category'])
    async getCategory(@Param('id', ParseIntPipe) id: number) {
        try {
            const category = await this.categoryService.findById(id);
            if (!category) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'category.error.notFound',
                );
            }
            return new SuccessResponse(new CategoryResponseDto(category));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    @Auth()
    async getCategoryList(
        @Query()
        query: QueryListCategoryDto,
    ) {
        try {
            const categoryList: CategoryListResponseDto =
                await this.categoryService.queryCategoryList(query);
            return new SuccessResponse(categoryList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    @Auth(['create_category'])
    async createCategory(
        @Request() req: IRequest,
        @Body() data: CreateCategoryDto,
    ) {
        try {
            const categoryExist = await this.categoryRepository.isExist({
                name: data.name,
            });
            if (categoryExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'category.error.exist',
                );
            }

            const insertedCategory =
                await this.categoryService.repository.insertAndGet(data);

            return new SuccessResponse(
                new CategoryResponseDto(insertedCategory),
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    @Auth(['update_category'])
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: UpdateCategoryDto,
    ) {
        try {
            const categoryExist = await this.categoryRepository.isExist({ id });
            if (!categoryExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'category.error.notExist',
                );
            }

            const updatedCategory =
                await this.categoryService.repository.updateAndGet(
                    { id },
                    data,
                );

            return new SuccessResponse(
                new CategoryResponseDto(updatedCategory),
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    async deleteCategory(
        @Request() req: IRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const categoryExist = await this.categoryRepository.isExist({ id });
            if (!categoryExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'category.error.notExist',
                );
            }

            const deleteResult = await this.categoryService.softDelete(id);

            return new SuccessResponse({ id }, 'category.success.delete');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
