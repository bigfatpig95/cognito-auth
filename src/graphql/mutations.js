/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createListitem = /* GraphQL */ `
  mutation CreateListitem(
    $input: CreateListitemInput!
    $condition: ModelListitemConditionInput
  ) {
    createListitem(input: $input, condition: $condition) {
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
export const updateListitem = /* GraphQL */ `
  mutation UpdateListitem(
    $input: UpdateListitemInput!
    $condition: ModelListitemConditionInput
  ) {
    updateListitem(input: $input, condition: $condition) {
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
export const deleteListitem = /* GraphQL */ `
  mutation DeleteListitem(
    $input: DeleteListitemInput!
    $condition: ModelListitemConditionInput
  ) {
    deleteListitem(input: $input, condition: $condition) {
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
