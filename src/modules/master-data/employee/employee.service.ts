import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/creact-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeMapper } from './mapper/creact-employee.mapper';
import { UpdateEmployeeMapper } from './mapper/update-employee.mapper';
import { CreateEmployeeRepository } from './repository/creact-employee.repository';
import { EmployeeRepository } from './repository/employee.repository';
import { UpdateEmployeeRepository } from './repository/update-employee.repository';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly createEmployeeRepository: CreateEmployeeRepository,
    private readonly updateEmployeeRepository: UpdateEmployeeRepository,
  ) {}

  async create(dto: CreateEmployeeDto) {
    return this.createEmployeeRepository.create(
      CreateEmployeeMapper.toCommand(dto),
    );
  }

  findAll() {
    return this.employeeRepository.findAll();
  }

  async findOne(id: string) {
    return this.employeeRepository.findOne(id);
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    return this.updateEmployeeRepository.update(
      id,
      UpdateEmployeeMapper.toCommand(dto),
    );
  }

  async remove(id: string) {
    return this.employeeRepository.remove(id);
  }
}
