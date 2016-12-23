import Sequelize from 'sequelize';

const db = new Sequelize('cerculdivelor', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Products = db.define('products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: Sequelize.STRING,
    fbid: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    brand: Sequelize.STRING,
    size: Sequelize.STRING,
    category: Sequelize.STRING,
    color: Sequelize.STRING,
    cond: Sequelize.STRING,
    origprice: Sequelize.STRING,
    saleprice: Sequelize.STRING,
    images: Sequelize.STRING,
    timestamp: Sequelize.STRING,
    soldstatus: Sequelize.STRING,
    views: Sequelize.STRING,
    recommended: Sequelize.STRING,
  },
  {
    timestamps: false
  }
);

const Likes = db.define('likes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    prodid: Sequelize.STRING,
    fbid: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

const Comments = db.define('comments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    prodid: Sequelize.STRING,
    name: Sequelize.STRING,
    fbid: Sequelize.STRING,
    comment: Sequelize.STRING,
    imgpath: Sequelize.STRING,
    timestamp: Sequelize.STRING
  },
  {
    timestamps: false
  }
);


const User = db.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    fbid: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isUnique: function (value, next) {
          // TODO: need to validate for email as well in the future!!
          User.find({where: {fbid: value}})
            .then(function (user) {
              // does a user exist with this fbid? If it does, is it empty? - than this is an email registration so we don't validate for duplicates
              if (user && user.fbid != '') {
                  return next('fbid already in use!');
              }
              return next();

            }).catch(function (err) {
              return next(err);
            });
        }
      }
    },
    favorites: Sequelize.STRING,
    regid: Sequelize.STRING,
    timestamp: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

// Products.hasMany(Likes);
// Likes.belongsTo(Products);

export { Products, Likes, Comments, User};


// Products.findAll().then(function(list) {
//   console.log(list[0]);
// });
