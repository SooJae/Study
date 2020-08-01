const square = function (flag, number) {
  return new Promise(((resolve, reject) => {
    if (flag) {
      resolve(number * number);
    } else {
      reject('실패');
    }
  }));
};

square(true, 2) // async1
  .then((number) => {
    console.log(`First Success : ${number}`);
    return square(true, number); // async2
  })
  .then((number) => {
    console.log(`Second Success : ${number}`);
    return square(false, number); // async3
  })
  .catch((e) => {
    console.log(`First Fail : ${e}`);
    return square(true, 3); // asyncFail1
  })
  .then((number) => {
    console.log(`Third Success : ${number}`);
    return square(true, number); // async4
  })
  .catch((e) => {
    console.log(`Second Fail : ${e}`);
  })
  .then((number) => {
    console.log(`Complete : ${number}`); // complete
  });


function getFirstUser() {
  return getUsers()
    .then((users) => users[0].name);
}

function getFirstUser() {
  return getUsers()
    .then((users) => users[0].name)
    .catch((err) => ({
      name: 'default user',
    }));
}

async function getFirstUser() {
  const users = await getUsers();
  return users[0].name;
}

async function getFirstUser() {
  try {
    const users = await getUsers();
    return users[0].name;
  } catch (err) {
    return {
      name: 'default user',
    };
  }
}
