import { find, filter } from 'lodash';
//import { pubsub } from './subscriptions';
import { Products, Likes, Comments } from './connection.js';


const resolveFunctions = {
  Query: {
    products (_, args) {
      //return Products.findAll({where: {id: args.id}});
      return Products.findAll({limit: 30});
    },
  },
  Products: {
    likes(obj) {
      // return Likes.findAndCountAll({
      //     where: {prodid: obj.id},
      //     attributes: ['prodid'],
      //     group: 'prodid',
      //   }).get('count');

      return Likes.count({where: {prodid: obj.id}});
    },
    comments(obj) {
      return Comments.count({where: {prodid: obj.id}});
    }
  },
  // Mutation: {
  //   upvotePost(_, { postId }) {
  //     const post = find(posts, { id: postId });
  //     if (!post) {
  //       throw new Error(`Couldn't find post with id ${postId}`);
  //     }
  //     post.votes += 1;
  //     pubsub.publish('postUpvoted', post);
  //     return post;
  //   },
  // },
  // Subscription: {
  //   postUpvoted(post) {
  //     return post;
  //   },
  // },
};

export default resolveFunctions;
