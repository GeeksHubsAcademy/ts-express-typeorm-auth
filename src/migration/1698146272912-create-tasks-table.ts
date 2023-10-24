import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTasksTable1698146272912 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "tasks",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment",
                        },
                        {
                            name: "title",
                            type: "varchar",
                            length: "50", 
                        },
                        {
                            name: "description",
                            type: "varchar",
                            length: "150", 
                        },
                        {
                            name: "status",
                            type: "boolean",
                            default: false,                        
                        },
                        {
                            name: "user_id",
                            type: "int"
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",                        
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            onUpdate: "CURRENT_TIMESTAMP"                 
                        },
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["user_id"],
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            onDelete: "CASCADE",
                        }
                    ]
                }),
                true
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks");
    }

}
