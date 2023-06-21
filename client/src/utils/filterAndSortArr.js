export const filterAndSortArr = (comments, id) => {
  const filteredComments = comments.filter(
    (comment) => comment.nguoi_dung.id === id
  );

  const sortedComments = [
    ...filteredComments,
    ...comments.filter((comment) => comment.nguoi_dung.id !== id),
  ];

  return sortedComments;
};
