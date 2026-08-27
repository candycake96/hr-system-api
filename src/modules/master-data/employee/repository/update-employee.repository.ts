import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { UpdateEmployeeCommand } from '../mapper/update-employee.mapper';

@Injectable()
export class UpdateEmployeeRepository {
  constructor(private readonly database: DatabaseService) {}

  update(id: string, command: UpdateEmployeeCommand) {
    return this.database.$transaction(async (tx) => {
      const existing = await tx.employee.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Employee with id ${id} not found`);
      }

      await tx.employee.update({
        where: { id },
        data: command.employee,
      });

      if (command.addresses !== undefined) {
        await tx.employeeAddress.deleteMany({ where: { employeeId: id } });

        if (command.addresses.length) {
          await tx.employeeAddress.createMany({
            data: command.addresses.map((address) => ({
              ...address,
              employeeId: id,
            })),
          });
        }
      }

      return tx.employee.findUniqueOrThrow({
        where: { id },
        include: { employeeAddresses: true },
      });
    });
  }
}
