class Logger {
    constructor(name) {
        this.count = 0
        this.name = name
    }

    log(message) {
        this.count++
        console.log(`[${this.name}] ${message}`)
    }

    info(message) {
        this.log(`info: ${message}`)
    }

    verbose(message) {
        this.log(`verbose: ${message}`)
    }
}

module.exports = new Logger('DEFAULT')