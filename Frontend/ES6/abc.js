const category = [
    {
        id:0,
        categoryName:"react"
    },
    {
        id:1,
        categoryName:"javascript"
    },
    {
        id:2,
        categoryName:"typescript",
    }
]

categoryID = 1;

const result = category
                .filter(index => index.id === categoryID)
                .map(value => value.categoryName);

console.log(result);