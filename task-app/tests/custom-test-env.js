const nodeEnvironment = require('jest-environment-node')

module.exports = class customTestEnvironment extends nodeEnvironment {
    async setup() {
        await super.setup()
        if (typeof this.global.TextEncoder === 'undefined'){
            const { TextEncoder } = require('util')
            this.global.TextEncoder = TextEncoder
        }
    }
}
