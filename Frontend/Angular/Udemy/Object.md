키 값을 갖고 객체를 탐색할때는
hasOwnProperty를 사용해서 방어코드를 작성하는게 좋다. 

```js
map(responseData => {
      let postsArray: Post[] = [];
      Object.keys(responseData)
        .filter(key => responseData.hasOwnProperty(key))
        .forEach(key =>
          postsArray = [...postsArray, {...responseData[key], id: key}]
        );
      return postsArray;
})
```
