export const getManager = manager => {
    console.log(manager)
    return {
        type: 'GET_MANAGER',
        manager
    }
}