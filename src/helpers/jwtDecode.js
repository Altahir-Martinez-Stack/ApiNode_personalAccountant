import jwtDecode from 'jwt-decode'

function decodeJwt(token) {
    const { name, email } = jwtDecode(token)
    return { name, email }
}

export default decodeJwt
