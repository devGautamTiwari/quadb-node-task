import { DataTypes, Sequelize } from "sequelize";

const TopTickers = (sequelize: Sequelize) => {
    return sequelize.define("TopTickers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last: {
            type: DataTypes.STRING
        },
        buy: {
            type: DataTypes.STRING
        },
        sell: {
            type: DataTypes.STRING
        },
        volume: {
            type: DataTypes.STRING
        },
        base_unit: {
            type: DataTypes.STRING
        },
    });
}

export default TopTickers;