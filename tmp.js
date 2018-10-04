const f = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
  }
const  func = async () => {
    console.log(await f());
};
  func();