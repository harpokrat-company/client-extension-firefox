import {Links} from './links';
import {Relationships} from './relationships';
import {ResourceIdentifier} from './resource-identifier';
import {Meta} from './meta';

export class Resource<T = any> extends ResourceIdentifier {

  attributes?: T;

  relationships?: Relationships;

  links?: Links;

  constructor(type: string, id: string, meta?: Meta, attributes?: T, relationships?: Relationships, links?: Links) {
    super(type, id, meta);
    this.attributes = attributes;
    this.relationships = relationships;
    this.links = links;
  }

  static of<T = any>(attributes: T, resourceType: string = undefined, relationships?: Relationships): Resource<T> {
    return new Resource<T>(resourceType, undefined, undefined, attributes, relationships);
  }
}
