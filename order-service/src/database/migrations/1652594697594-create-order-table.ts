import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrderTable1652594697594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "status",
            type: "enum",
            enumName: "orderStatus",
            enum: ['created', 'confirmed', 'cancelled', 'delivered'],
            default: "'created'",
          },
          {
            name: "customerId",
            type: "int",
          },
          {
            name: "totalQuantity",
            type: "int",
          },
          {
            name: "totalAmount",
            type: "int",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }
}
