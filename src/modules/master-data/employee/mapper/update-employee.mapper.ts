import { Prisma } from '@prisma/client';
import { CreateEmployeeAddressDto } from '../dto/creact-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

export interface UpdateEmployeeCommand {
  employee: Prisma.EmployeeUncheckedUpdateInput;
  addresses?: CreateEmployeeAddressDto[];
}

export class UpdateEmployeeMapper {
  static toCommand(dto: UpdateEmployeeDto): UpdateEmployeeCommand {
    const { addresses, ...employee } = dto;
    return { employee, addresses };
  }
}
