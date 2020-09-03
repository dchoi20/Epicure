
module.exports = function(sequelize) {

    const UserRestaurant = sequelize.define('user_restaurant');
    UserRestaurant.associate = function(models) {
        models.User.belongsToMany(models.Restaurant, { through: UserRestaurant });
        models.Restaurant.belongsToMany(models.User, { through: UserRestaurant });
    
        // models.User.addRestaurant(models.Restaurant, { through: { role: 'manager' }});
    }
      // through is required!
      return UserRestaurant;
    };