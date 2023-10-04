import API from '../../services/API'
import { getStringForKey, keys } from '../../modules/Strings';

class SampleStore {
    getFoodList = async (callback: (status: boolean, result: any) => void) => {
        try {
            let response = await API.get(`/api/json/v1/1/filter.php?c=Seafood`)
            if (response?.data) {
                callback(true, response?.data)
            } else {
                callback(false, response)
            }
        } catch (error) {
            let errorMessage = error.response?.data?.error?.message ? error.response?.data?.error?.message : getStringForKey(keys.kSomethingWrong)
            callback(false, errorMessage)
        }
    }

}

const sampleStore = new SampleStore()
export default sampleStore