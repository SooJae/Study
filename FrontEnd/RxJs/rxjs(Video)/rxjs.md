# RXJS를 배워야 하는 이유
```ts
document.addEventListener('click', event => {
      console.log(event);
    });

    let counter = 0;
    setInterval(() => {
      console.log(counter);
      counter++;

    }, 1000);
    setTimeout(() => {
      console.log('finished...');

    }, 3000);
  }
```
