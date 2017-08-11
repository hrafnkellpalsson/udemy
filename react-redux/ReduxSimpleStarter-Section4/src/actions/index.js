// selectBook is an Action Creater, it needs to return an Action, an object
// with a type property.
export function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}
