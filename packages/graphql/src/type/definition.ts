import {
  GraphQLFieldResolver,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLResolveInfo,
} from 'graphql';

export interface KSqlEntities {
  [key: string]: {
    type: GraphQLObjectType | GraphQLScalarType;
  };
}

export interface Config {
  ksqlUrl: string;
  subscription: any;
}
type KsqlType = 'BIGINT' | 'STRING' | 'INTEGER' | 'ARRAY' | 'VARCHAR' | 'STRUCT';
export interface MemberSchema {
  type: Exclude<'ARRAY' | 'STRUCT', KsqlType>; // TODO - can you have arrays in member schemas?
}

export interface Field {
  name: string;
  schema: {
    type: KsqlType;
    fields: Array<Field> | null;
    memberSchema: MemberSchema | null;
  };
}

export interface KsqlResponse {
  name: string;
  readQueries: Array<any>; // TODO
  writeQueries: Array<any>; // TOOD
  fields: Array<Field>;
  type: 'STREAM' | 'TABLE';
  key: string;
  timestamp: string;
  statistics: string;
  errorStats: string;
  extended: boolean;
  format: 'JSON' | 'AVRO'; // TODO verify this value
  topic: string;
  partitions: number;
  replication: number;
}
export interface Resolver {
  [key: string]: GraphQLFieldResolver<void, void>;
}
export interface SubscriptionResolver {
  [name: string]: {
    subscribe: (
      obj: void,
      args: { [key: string]: string },
      context: void,
      info: GraphQLResolveInfo
    ) => Promise<void>;
  };
}

export type KsqlGraphResolver = GraphQLFieldResolver<void, void, { [argName: string]: string }>;
