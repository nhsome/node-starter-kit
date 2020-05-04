'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "RequestLogs", deps: [Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "init",
    "created": "2020-05-04T14:46:40.674Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName",
                    "allowNull": false
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true,
                    "allowNull": false
                },
                "passwordHash": {
                    "type": Sequelize.STRING,
                    "field": "passwordHash",
                    "allowNull": false
                },
                "role": {
                    "type": Sequelize.ENUM('ADMIN', 'MODERATOR'),
                    "field": "role"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "allowNull": false,
                    "defaultValue": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "RequestLogs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "routePath": {
                    "type": Sequelize.STRING,
                    "field": "routePath",
                    "allowNull": false
                },
                "routeMethod": {
                    "type": Sequelize.STRING,
                    "field": "routeMethod",
                    "allowNull": false
                },
                "params": {
                    "type": Sequelize.JSON,
                    "field": "params"
                },
                "query": {
                    "type": Sequelize.JSON,
                    "field": "query"
                },
                "body": {
                    "type": Sequelize.JSON,
                    "field": "body"
                },
                "isError": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isError",
                    "defaultValue": false,
                    "allowNull": false
                },
                "result": {
                    "type": Sequelize.JSON,
                    "field": "result"
                },
                "ip": {
                    "type": Sequelize.STRING,
                    "field": "ip"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
