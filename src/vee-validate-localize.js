import { localize } from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import fa from 'vee-validate/dist/locale/fa.json';

localize({
    en,
    fa
});
localize({
    en: {
        names: {
            userName: 'UserName',
            password: 'Password'
        }
    },
    fa: {
        names: {
            userName: 'شناسه کاربری',
            password: 'کلمه عبور'
        }
    }
});