/* eslint-disable @typescript-eslint/no-var-requires */

import { Category } from "src/modules/category/database/category.entity";
import { Product } from "src/modules/product/database/product.entity";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const SnakeNamingStrategy =
  require("typeorm-naming-strategies").SnakeNamingStrategy;

const config: MysqlConnectionOptions = {
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  type: "mysql",
  database: process.env.DB_DATABASE || "",
  entities: [Product, Category],
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
