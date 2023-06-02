import {where, fn, col} from 'sequelize'

function whereCaseInsensitive(column) {
    return where(fn('LOWER', col(`${column}`)), 'LIKE', '%' + search + '%')
}

export default whereCaseInsensitive


