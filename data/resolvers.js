import { find, filter } from 'lodash';
//import { pubsub } from './subscriptions';
import { Products, Likes, Comments } from './connection.js';


const resolveFunctions = {
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
    }
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
  },
  Products: {
    likes(product) {
    //return Likes.findAndCountAll({where: {prodid: product.id}});
    return Likes.count({where: {prodid: product.id}});
    },
    comments(obj) {
      return Comments.count({where: {prodid: obj.id}});
    }
  },
};

export default resolveFunctions;
