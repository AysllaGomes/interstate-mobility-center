import Toast from 'react-native-root-toast';
import { theme } from '../../../App.style';


const ToastMessage = (errorMessage) => {
    Toast.show(errorMessage, {
        duration: Toast.durations.LONG,
        animation: true,
        position: 40,
        backgroundColor: theme.toastErrorMensage.background,
        textColor: theme.toastErrorMensage.dangerTextColor,

    })
}
export default ToastMessage;