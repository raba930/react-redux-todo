module.exports = {
    'secret': 'fuckingsecret',
    'url' : 'mongodb://localhost/' + (process.env.TD_ENV === 'test' ? 'test': 'firstApp')
}
