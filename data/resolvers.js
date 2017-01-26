import { find, filter } from 'lodash';
//import { pubsub } from './subscriptions';
import { Products, Likes, Comments, User, Categories, Brands } from './connection.js';


const resolveFunctions = {

  /*
  *   ~ Root fields & resolvers ~
  *
  *   These resolver functions accesses the database and then constructs and returns the object we have queried for
  *
  *   @obj - The previous object, which for a field on the root Query type is often not used.
  *   @args - The arguments provided to the field in the GraphQL query.
  *   @context - A value which is provided to every resolver and holds important contextual information like the currently logged in user, or access to a database.
  *
  */


  Query: {
    products (_, args) {
      return Products.findAll({limit: 20, order:[['timestamp', 'DESC']]});
    },
    getProduct (_, args) {
      return Products.findOne({where: {id: args.id}});
    },
    comments (_, args) {
      return Comments.findAll({where: {prodid: args.prodid}});
    },
    likescount (_, args) {
      return Likes.findAll({where: {prodid: args.prodid, fbid: args.userid}});
    },
    likedproducts (_, args){
      return Likes.findAll({where: {userid: args.userid}})
      .then(likes => { return likes.map(like => like.getProduct()) });
    },
    login (_, args) {
      return User.findOne({where: {email: args.email}}).then(function(user){
          if(user && args.password == user.password){
            // passwords match
            return {"user":{"name":user.name, "email":user.email, "fbid":user.fbid}, "validation":"1"};
          } else if(user && args.password != user.password){
            // passwords not matching
            return {"user":{}, "validation":"0"};
          } else if(!user){
            return {"user":{}, "validation":"-1"};
          }
      }).catch(function(error){
          return {validation: "Error while searching for user to login: " + error.message};
      });
    },
    bc (_, args){
      return {brands:Brands.findAll({order: [['brand', 'ASC']]}), categories:Categories.findAll({order: [['category', 'ASC']]})};
    },
  },


  /*
  *   ~ Mutations ~
  *
  */

  Mutation: {
    addLike(_, {prodid, userid}) {
      Likes.create({ prodid: prodid, userid: userid}).then(function(newLike){
      }).catch(function(error){
          console.log("Error inserting like");
      });
      return {"prodid":prodid, "userid":userid};
    },

    removeLike(_, {prodid, userid}) {
      Likes.destroy({where: {prodid: prodid, userid: userid}});
      return {"prodid":prodid, "userid":userid};
    },

    registerUser(_, {name, email, password, phone, fbid, favorites, regid}) {
        return User.findOrCreate({where: {email: email}, defaults: {name: name, email: email, password: password, phone: phone, fbid: fbid, favorites: favorites, regid: regid}
          }).spread(function(user, created) {
              //console.log(created);
              return user.get({plain: true});
          });
      },

    addComment(_, args){
      return Comments.create({ name: args.name, fbid: args.fbid, comment: args.comment, imgpath: args.imgpath, prodid: args.prodid }).then(function(newComment){
          return Comments.findAll({where: {prodid: args.prodid}});
      }).catch(function(error){
        console.log("error while adding comment! " + error);
          return {error: error.message};
      });
    },
    uploadProduct(_, args){
      return Products.create({name: args.name, email: args.email, fbid: args.fbid, title: args.title, description: args.description, category: args.category, brand: args.brand, size: args.size, color: args.color, cond: args.condition, origprice: args.origprice, saleprice: args.saleprice, images: args.images}).then(function(newProduct){
          return {"validation":"1"};
      }).catch(function(error){
          console.log("error while uploading product! " + error);
          return {"validation": error.message};
      });
    }
  },



  /*
  *   ~ Trivial Resolvers ~
  *
  *   If a resolver isn't provided for a field, that a
  *   property of the same name should be read and returned
  *
  */


  Product: {
    likescount (product) {
      return Likes.count({where: {prodid: product.id}});
    },
    comments (obj) {
      return Comments.count({where: {prodid: obj.id}});
    },
    isliked (product, args) {
      return Likes.count({where: {prodid: product.id, userid: args.userid}});
    }
  },
};

export default resolveFunctions;
