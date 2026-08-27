import { Prisma } from '@prisma/client';
import {
  CreateEmployeeAddressDto,
  CreateEmployeeDto,
} from '../dto/creact-employee.dto';

export interface CreateEmployeeCommand {
  employee: Prisma.EmployeeUncheckedCreateInput;
  addresses: CreateEmployeeAddressDto[];
}

export class CreateEmployeeMapper {
  static toCommand(dto: CreateEmployeeDto): CreateEmployeeCommand {
    const { addresses = [], ...employee } = dto;

    return {
      employee: {
        ...employee,
        isActive: employee.isActive ?? true,
      },
      addresses,
    };
  }
}
