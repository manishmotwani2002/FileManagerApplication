export const getPhotos = async (folderName: string) => {
  return await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${folderName}&per_page=15&client_id=MlzQou45gX_zcr8E-lC46IXwKNQtcqh33UQ7Zlv6nlk`
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
};
