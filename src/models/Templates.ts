import {
  types,
  Instance,
  SnapshotIn,
  getParent,
  destroy,
} from 'mobx-state-tree';

export const Template = types
  .model({
    id: types.string!,
    type: types.string!,
    name: types.string!,
    data: types.string!,
  })
  .actions((self) => ({
    changeName(name: string) {
      self.name = name;
    },
    changeData(data: string) {
      self.data = data;
    },
    remove() {
      getParent<typeof Templates>(self, 2).remove(self);
    },
  }));

export const Templates = types
  .model({
    templates: types.optional(types.array(Template), []),
  })
  .actions((self) => ({
    addTemplate(
      template: SnapshotIn<typeof Template> | Instance<typeof Template>
    ) {
      self.templates.push(template);
    },
    remove(template: SnapshotIn<typeof Template>) {
      destroy(template);
    },
  }))
  .views((self) => ({
    get totalTemplates() {
      return self.templates.length;
    },
  }));
