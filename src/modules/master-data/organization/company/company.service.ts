import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly database: DatabaseService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return this.database.company.create({
      data: {
        ...createCompanyDto,
        isActive: createCompanyDto.isActive ?? true,
      },
    });
  }

  async findAll() {
    return this.database.company.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const company = await this.database.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    await this.findOne(id);

    return this.database.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.database.company.delete({
      where: { id },
    });
  }
}
