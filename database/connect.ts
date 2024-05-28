import { Sequelize } from "sequelize";

export function getConnection(url: string): Sequelize {
	return new Sequelize(url);
}

export function authenticateSequelize(sequelize: Sequelize): Promise<void> {
	return sequelize.authenticate();
}
