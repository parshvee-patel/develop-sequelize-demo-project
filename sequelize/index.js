import * as config from "../config";
import { Sequelize, DataTypes } from "sequelize";

// Initilize Sequelize for Staff DB
const orm = new Sequelize({
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_NAME,
    username: config.DB_USER,
    password: config.DB_PASS,
    dialect: "mariadb",
    dialectOptions: {
        connectionTimeout: 1000,
    },
    //   logging: (process.enc.NODE_ENV = "development" ? true : false),
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

//Testing the Connection
orm
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

// Staff Details Modal
const StaffDetails = orm.define("Staff_Details", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    contactNo: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    zipCode: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    profileImage: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    createdOn: {
        type: DataTypes.DATE,
    },
    modifiedOn: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: true,
    createdAt: "createdOn",
    updatedAt: "modifiedOn",
    deletedAt: false,
});

export default {
    StaffDetails,
};