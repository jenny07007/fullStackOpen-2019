const blogs = [
  {
    title: "HTML is easy",
    author: "Keven Smith",
    url: "helloworld.com",
    likes: 5,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    },
    id: "5a451df7571c224a31b5c8ce"
  },
  {
    title: "Browser can execute only javascript",
    author: "Joe Den",
    url: "https://helloworld.net",
    likes: 11,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    },
    id: "5a451e21e0b8b04a45638211"
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};
const setToken = () => {};
export default { getAll, setToken };
