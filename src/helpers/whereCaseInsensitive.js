import {where, fn, col} from 'sequelize'

function whereCaseInsensitive(column, search) {
    return where(fn('LOWER', col(`${column}`)), 'LIKE', '%' + search + '%')
}

export default whereCaseInsensitive


