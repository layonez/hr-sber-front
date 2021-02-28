import {
  types,
  Instance,
  SnapshotIn,
  getParent,
  destroy,
} from 'mobx-state-tree';

export const Tag = types.model({
  name: types.string,
});

export const Post = types
  .model({
    id: types.string!,
    type: types.string!,
    title: types.string!,
    content: types.string,
    cutContent: types.string,
    image: types.string,
    date: types.Date,
    tags: types.optional(types.array(Tag), []),
  })
  .actions((self) => ({
    changeTitle(title: string) {
      self.title = title;
    },
    changeContent(content: string) {
      self.content = content;
    },
    remove() {
      getParent<typeof Feed>(self, 2).remove(self);
    },
  }));

export const Feed = types
  .model({
    posts: types.optional(types.array(Post), []),
  })
  .actions((self) => ({
    addPost(post: SnapshotIn<typeof Post> | Instance<typeof Post>) {
      // const maxId = Math.max(...self.posts.map((o) => o.id), 0);
      // post.id = maxId;
      post.cutContent = `${post.cutContent.substring(0, 180)}...`;
      self.posts.push(post);
    },
    remove(post: SnapshotIn<typeof Post>) {
      destroy(post);
    },
  }))
  .views((self) => ({
    get totalPosts() {
      return self.posts.length;
    },
  }));
