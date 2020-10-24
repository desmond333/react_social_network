
export const required = value => {
    if (value) return undefined
    return "Field is required" //поле обязательно
}

export const maxLengthCreator = (maxLength) => (value) => { //внутри Creator передаем анонимную f библиотеке redux form для вызова
    if (value && value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    }
}