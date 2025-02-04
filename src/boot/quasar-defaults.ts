import { QImg } from 'quasar';
import { boot } from 'quasar/wrappers';

export default boot(() => {
    QImg.props.noSpinner = { type: Boolean, default: true };
    QImg.props.noTransition = { type: Boolean, default: true };
});
