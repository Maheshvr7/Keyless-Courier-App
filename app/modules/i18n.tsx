class I18n {
    language: any

    constructor() {
        this.setUpLanguage();
    }

    setUpLanguage() {
        this.language = this.getLanguage()
    }

    getLanguage() {
        return require('../assets/Language/en.json')
    }
}
const i18n = new I18n()
export default i18n