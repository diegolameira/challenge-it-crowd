import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateMovieDto } from './Movie.dto';
import { Movie } from './Movie.entity';
import { MovieService } from './Movie.service';

@ApiBearerAuth()
@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Movie created',
    type: Movie,
  })
  @ApiOperation({ summary: 'Create movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieService.create(createMovieDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Movie,
  })
  @ApiOperation({ summary: 'Create movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Movie | undefined> {
    return this.movieService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Movie updated',
    type: Movie,
  })
  @ApiOperation({ summary: 'Update movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: CreateMovieDto,
  ): Promise<UpdateResult> {
    return await this.movieService.update(id, updateMovieDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Movie updated',
    type: Movie,
  })
  @ApiOperation({ summary: 'Update movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async patch(
    @Param('id') id: string,
    @Body() updateMovieDto: CreateMovieDto,
  ): Promise<UpdateResult> {
    return await this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Movie deleted (soft)',
    type: Movie,
  })
  @ApiOperation({ summary: 'Delete movie (soft)' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.movieService.delete(id);
  }

  @Delete(':id/force')
  @ApiResponse({
    status: 200,
    description: 'Movie deleted (hard)',
    type: Movie,
  })
  @ApiOperation({ summary: 'Delete movie (hard)' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async forceDelete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.movieService.delete(id, true);
  }

  @Get()
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }
}
