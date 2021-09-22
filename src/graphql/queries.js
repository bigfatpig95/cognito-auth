/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getListitem = /* GraphQL */ `
  query GetListitem($id: ID!) {
    getListitem(id: $id) {
      id
      image
      category
      condition
      price
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listListitems = /* GraphQL */ `
  query ListListitems(
    $filter: ModelListitemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListitems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        category
        condition
        price
        name
        description
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
