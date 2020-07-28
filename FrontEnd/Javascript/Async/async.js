// const getId = (cb) => {
//     setTimeout(() => cb(1), 1);
// };
//
// const getNameById = (id, cb) => {
//     setTimeout(() => cb('chris'), 1);
// };
//
// getId(id => {
//     getNameById(id, (name => {
//         console.log({id, name});
//     }));
// });


const getId = (id) => new Promise((resolve) => {
  setTimeout(() => resolve(id), 1);
});

const getNameById = (name) => new Promise((resolve) => {
  setTimeout(() => resolve(name));
});

/**
 *  첫번째 방법
 */
//
// getId()
//   .then((id) => {
//     getNameById(id).then((name) => {
//       console.log({ id, name });
//     });
//   });


/**
 * 두번째 방법
 */
// let id;
// Promise.resolve()
//   .then(() => getId())
//   .then((_id) => (id = _id, getNameById(id)))
//   .then((name) => console.log({ id, name }));

/**
 * 세번째 방법
 */
// Promise.resolve({ id: 1, name: 'chris' })
//   .then((obj) => getId(obj))
//   .then((obj) => getNameById(obj))
//   .then((obj) => console.log(obj));

/**
 * 네번째 방법
 */
Promise.resolve({ id: 2, name: 'jerry' })
  .then(getId)
  .then(getNameById)
  .then((obj) => console.log(obj));


// https://jeonghwan-kim.github.io/2016/12/15/coroutine.html
