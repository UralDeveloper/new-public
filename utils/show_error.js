export default (code, options = {}) => {
    switch (code)  {
        case 404:
            throw({statusCode: 404, message: options?.message || 'Error 404. Page not found'})

            default:
                throw({statusCode: code, message: options?.message || 'Other Error'})
    }

};