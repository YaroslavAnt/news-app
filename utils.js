export const getSlug = (url) => {
  const preparedUrl =
    url[url.length - 1] === "/" ? url.slice(0, -1) : url.slice();
  const [slug] = preparedUrl.split("/").slice(-1);
  return slug;
};
