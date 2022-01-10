const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'John',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Doe'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    timestamps:true,
  });

  const ContactInfo = sequelize.define('ContactInfo', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    freezeTableName: true,
    timestamps:true,
  });

  const Book = sequelize.define('Book', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
    timestamps:true,
  });

  //hasOne, belognsTo, hasMany, belongsToMany

  //one-to-one => hasOne, belognsTo
  User.hasOne(ContactInfo, {
    foriegnKey: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  ContactInfo.belongsTo(User);

  //one-to-many => hasMany, belognsTo
  User.hasMany(Book, {
    foriegnKey: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  Book.belongsTo(User);

  //many-to-many => belongsToMany
  User.belongsToMany(User, {as: "User", foreignKey: "UserId", through: "Follow"});
  User.belongsToMany(User, {as: "Followed", foreignKey: "FollowedId", through: "Follow"});

  sequelize.sync({alter: true}); //force: true
}