import {FC, FormEvent, useState} from 'react';
import styles from './Login.module.scss';

type LoginProps = {
    onLogin: (idInstance: string, apiTokenInstance: string) => void;
}

const Login: FC<LoginProps> = ({onLogin}) => {
    const [idInstance, setIdInstance] = useState('1103184359');
    const [apiTokenInstance, setApiTokenInstance] = useState('c88783d9c1c644c2ad52714bf4936c4ee859356e8e5841ab8d');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onLogin(idInstance, apiTokenInstance);
    };

    return (
        <div className={styles.login}>
            <h1>Вход в GREEN-API</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="idInstance"
                    value={idInstance}
                    onChange={(e) => setIdInstance(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="apiTokenInstance"
                    value={apiTokenInstance}
                    onChange={(e) => setApiTokenInstance(e.target.value)}
                    required
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;