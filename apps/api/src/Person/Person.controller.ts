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

import { CreatePersonDto } from './Person.dto';
import { Person } from './Person.entity';
import { PersonService } from './Person.service';

@ApiBearerAuth()
@ApiTags('people')
@Controller('people')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Person created',
    type: Person,
  })
  @ApiOperation({ summary: 'Create person' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return await this.personService.create(createPersonDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Person,
  })
  @ApiOperation({ summary: 'Create person' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Person | undefined> {
    return this.personService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Person updated',
    type: Person,
  })
  @ApiOperation({ summary: 'Update person' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: CreatePersonDto,
  ): Promise<UpdateResult> {
    return await this.personService.update(id, updatePersonDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Person updated',
    type: Person,
  })
  @ApiOperation({ summary: 'Update person' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async patch(
    @Param('id') id: string,
    @Body() updatePersonDto: CreatePersonDto,
  ): Promise<UpdateResult> {
    return await this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Person deleted (soft)',
    type: Person,
  })
  @ApiOperation({ summary: 'Delete person (soft)' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.personService.delete(id);
  }

  @Delete(':id/force')
  @ApiResponse({
    status: 200,
    description: 'Person deleted (hard)',
    type: Person,
  })
  @ApiOperation({ summary: 'Delete person (hard)' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async forceDelete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.personService.delete(id, true);
  }

  @Get()
  findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }
}
