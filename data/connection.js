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
    userid: Sequelize.INTEGER,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
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
    userid: Sequelize.INTEGER,
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
    // email: {
    //   type: Sequelize.STRING,
    //   unique: true,
    //   validate: {
    //     isUnique: function (value, next) {
    //       User.find({where: {email: value}})
    //         .then(function (user) {
    //           if (user && user.email != '') {
    //               return next('email already in use!');
    //           }
    //           return next();
    //
    //         }).catch(function (err) {
    //           return next(err);
    //         });
    //     }
    //   }
    // },
    email: Sequelize.STRING,
    fbid: Sequelize.STRING,
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    favorites: Sequelize.STRING,
    regid: Sequelize.STRING,
    timestamp: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

const Categories = db.define('categories', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    category: Sequelize.STRING,
    parent: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

const Brands = db.define('brands', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    brand: Sequelize.STRING
  },
  {
    timestamps: false
  }
);


/*
*  Associations can be returned eaither by: include: [Products] or by get() (ex: 'like.getProduct())')
*
*
*
*
*
*/

Likes.belongsTo(Products, {foreignKey: 'prodid'});


export { Products, Likes, Comments, User, Categories, Brands};
