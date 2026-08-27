import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly database: DatabaseService) {}

  findAll() {
    return this.database.employee.findMany({
      include: { employeeAddresses: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const employee = await this.database.employee.findUnique({
      where: { id },
      include: { employeeAddresses: true },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    return employee;
  }

  remove(id: string) {
    return this.database.$transaction(async (tx) => {
      const existing = await tx.employee.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Employee with id ${id} not found`);
      }

      await tx.employeeAddress.deleteMany({ where: { employeeId: id } });
      return tx.employee.delete({ where: { id } });
    });
  }
}
