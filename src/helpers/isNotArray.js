function isNotArray(list, key = "name") {
    if (!list || !Array.isArray(list) || list?.length <= 0 || !list[0][key])
        return true

    return false
}

export default isNotArray