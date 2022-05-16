"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderTable1652594697594 = void 0;
const typeorm_1 = require("typeorm");
class createOrderTable1652594697594 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("orders");
    }
}
exports.createOrderTable1652594697594 = createOrderTable1652594697594;
//# sourceMappingURL=1652594697594-create-order-table.js.map