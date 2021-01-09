export class StoreUtility {
  // [{id,name,...},{},{}] -> input
  // entities: {id: {id,name...}} -> normalized output
  static normalize(entities: Entity[]) {
    return entities.reduce((prev, cur) => {
      return { ...prev, ...{ [cur.id]: cur } };
    }, {});
  }

  //
  static unNormalized(entities: { [id: number]: any }) {
    if (!entities) {
      return [];
    } else {
      return Object.keys(entities).map((key) => entities[key]);
    }
  }

  static filterDuplicateIds(ids: number[]) {
    return ids.filter((id, index, self) => index === self.indexOf(id));
  }

  static removeKey(entities: { [id: number]: any }, id: any) {
    const newObj = { ...entities };
    delete newObj[id];
    return newObj;
  }
}

interface Entity {
  id: any;
}
