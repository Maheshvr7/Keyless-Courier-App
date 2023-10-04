import i18n from '../i18n'

 export const keys        ={
  kSomethingWrong      : "kSomethingWrong",
  kAddtoCart           : "kAddtoCart",
  kCart                : "kCart"

 }

export const getStringForKey = (key: string): string => {
    return i18n.language[key]
}

export const getDynamicStringForKey = (key: string,replaceArray: string[]) => {
    let fullTexts = i18n.language[key]
    replaceArray.forEach(data => {
       fullTexts =  fullTexts.replace('{%s}',data)
    })
    return fullTexts
}