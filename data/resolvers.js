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
      //return Products.findAll({where: {id: args.id}});
      return Products.findAll({limit: 10});
    },
    comments (_, args) {
      return Comments.findAll({where: {prodid: args.prodid}});
    },
    likes (_, args) {
      return Likes.findAll({where: {prodid: args.prodid, fbid: args.fbid}});
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

  Mutation: {
    likePost(_, {prodid, fbid}) {
      Likes.create({ prodid: prodid, fbid: fbid}).then(function(newLike){
          // like saved succesfuly
      }).catch(function(error){
          console.log("Error inserting like");
      });
      return {"id":postid, "fbid":fbid};
    },

    removeLike(_, args) {
      console.log(args);
      Likes.destroy({where: {prodid: args.prodid, fbid: args.fbid}});
      return {"id":3};
    },

    registerUser(_, {name, email, password, phone, fbid, favorites, regid}) {
      return User.create({ name: name, email: email, password: password, phone: phone, fbid: fbid, favorites: favorites, regid: regid }).then(function(newUser){
          // TODO: case for "fbid already exists!"
          return {name:name, email:email, fbid: fbid, "validation":"1"};
      }).catch(function(error){
        console.log("error while mutating! " + error);
          return {error: error.message};
      });
    },

    addComment(_, args){
      return Comments.create({ name: args.name, fbid: args.fbid, comment: args.comment, imgpath: args.imgpath, prodid: args.prodid }).then(function(newComment){
          // TODO: case for "fbid already exists!"
          return {"validation":"1"};
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


  Products: {
    likes(product) {
    //return Likes.findAndCountAll({where: {prodid: product.id}});
    return Likes.count({where: {prodid: product.id}});
    },
    comments(obj) {
      return Comments.count({where: {prodid: obj.id}});
    }
  },
  // Bc: {
  //   brands (obj){
  //     return obj.brands;
  //
  //   },
  //   categories (obj){
  //     return obj.categories;
  //   }
  // }
};

export default resolveFunctions;
