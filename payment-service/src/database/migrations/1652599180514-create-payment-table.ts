import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPaymentTable1652599180514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "payments",
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
                  enumName: "paymentStatus",
                  enum: ['confirmed', 'declined']
                },
                {
                  name: "orderId",
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
        await queryRunner.dropTable('payments');
    }

}
