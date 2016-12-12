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

// Products.hasMany(Likes);
// Likes.belongsTo(Products);

export { Products, Likes, Comments };


// Products.findAll().then(function(list) {
//   console.log(list[0]);
// });
