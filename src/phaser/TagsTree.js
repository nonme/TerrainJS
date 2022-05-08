/**
 * Data structure which accepts an array of tags and returns key from predefined
 * list which "matches" the array of tags the most
 * @constructor
 */
function TagsTree(keys) {
  this.spriteKeys = keys;
  this.allTags = [];
  this.tree = {};
}

TagsTree.prototype.constructor = TagsTree;

TagsTree.prototype.addTags = function (tags) {
  this.allTags.push(tags);
  return this;
};

TagsTree.prototype.build = function () {
  for (let spriteKey of this.spriteKeys) {
    let spriteKeyTags = spriteKey.split("_").reverse();

    this.tree = this.insert_(this.tree, 0, spriteKeyTags, spriteKey);
  }
  console.log(this.tree);
};

TagsTree.prototype.insert_ = function (node, cnt, parsedKeys, spriteKey) {
  if (node === undefined) node = {};

  if (cnt >= parsedKeys.length || cnt >= this.allTags.length) {
    node["value"] = spriteKey;

    return node;
  }

  console.log(
    node,
    parsedKeys[cnt],
    this.allTags[cnt],
    parsedKeys[cnt] in this.allTags[cnt]
  );

  if (this.allTags[cnt].includes(parsedKeys[cnt])) {
    let tag = parsedKeys[cnt];
    if (!(tag in node)) node[tag] = {};

    node[tag] = this.insert_(node[tag], cnt + 1, parsedKeys, spriteKey);
  }

  return node;
};

TagsTree.prototype.get = function (tags) {
  let currentNode = this.tree;
  let value = currentNode.value;
  for (let tag of tags) {
    if ("value" in currentNode) value = currentNode.value;

    if (!(tag in currentNode)) {
      if ("value" in currentNode) return value;

      let closest_tag = this.getClosestTag_(tag, currentNode);
      if (closest_tag !== undefined && value === undefined)
        currentNode[tag] = currentNode[closest_tag];
      else
        return value;
    }
    currentNode = currentNode[tag];
  }
  if ("value" in currentNode) value = currentNode.value;

  return value;
};

TagsTree.prototype.getClosestTag_ = function (tag, node) {
  for (let tags of this.allTags) {
    if (tags.includes(tag)) {
      let distance = 1000;
      let closest_tag = undefined;
      let position = tags.indexOf(tag);
      for (let key in node) {
        if (
          tags.includes(key) &&
          Math.abs(tags.indexOf(key) - position) < distance
        ) {
          distance = Math.abs(tags.indexOf(key) - position);
          closest_tag = key;
        }
      }
      return closest_tag;
    }
  }
};

export default TagsTree;
