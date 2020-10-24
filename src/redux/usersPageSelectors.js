import {createSelector} from "reselect"

export const getUsersDataSelector = (state) => { // это более примитивный селектор, который могут использовать Суп Селекторы
    return state.usersPage.usersData
}

//в getUsersDataSuperSelector приходит state автоматически
export const getUsersDataSuperSelector = createSelector(getUsersDataSelector, //из примитивного селектора берем usersData
    (usersData) => { //usersData это зависимость, по которой SuperSelector определяет нужно ли ему перезапускаться
    return usersData //здесь должна быть более сложная логика, но к сожалению пока она в нашем проекте нам не нужна
})

export const getTotalUsersCountSelector = (state) => {
    return state.usersPage.totalUsersCount
}

export const getDisplayUsersNumberSelector = (state) => {
    return state.usersPage.displayUsersNumber
}

export const getCurrentPageSelector = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetchingSelector = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgressSelector = (state) => {
    return state.usersPage.followingInProgress
}

