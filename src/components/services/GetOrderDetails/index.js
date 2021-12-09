import axios from 'axios';
import authHeader from '../auth-header';

const getOrderCreateByUser = async (data) => {
    try {
        let result = await api.post(Apis.GetOrderCreateByUser,data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};