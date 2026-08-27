import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateEmployeeCommand } from '../mapper/creact-employee.mapper';

@Injectable()
export class CreateEmployeeRepository {
  constructor(private readonly database: DatabaseService) {}

  create(command: CreateEmployeeCommand) {
    return this.database.$transaction(async (tx) => {
      const employee = await tx.employee.create({ data: command.employee });

      if (command.addresses.length) {
        await tx.employeeAddress.createMany({
          data: command.addresses.map((address) => ({
            ...address,
            employeeId: employee.id,
          })),
        });
      }

      return tx.employee.findUniqueOrThrow({
        where: { id: employee.id },
        include: { employeeAddresses: true },
      });
    });
  }
}
