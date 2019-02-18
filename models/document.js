module.exports = function (sequelize, DataTypes) {
    var Document = sequelize.define("Document", {
        document_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,100]
            }
        },
        docdate: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1,500]
            }
        }
        ,
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    return Document;
};
