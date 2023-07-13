const add = (1,4, (sum) => {
    setTimeout(() =>{
        const data = 1+4;
        sum(data)

    }, 2000);
})
add((datas) =>{
    console.log(datas);
})