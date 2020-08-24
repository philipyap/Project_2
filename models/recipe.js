'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.recipe.belongsTo(models.user)
      models.recipe.hasMany(models.comment, {
        onDelete: 'CASCADE' //the comments will be deleted when the user deletes the recipe
      })
    }
  };
  recipe.init({
    title: DataTypes.STRING,
    titleOne: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    instruction: DataTypes.TEXT,
    ingredient: DataTypes.STRING,
    measure: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    imgOneUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};