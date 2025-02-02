import {FC, FormEvent} from 'react';
import s from './Login.module.scss';

type LoginProps = {
    onLogin: (idInstance: string, apiTokenInstance: string) => void;
}

const Login: FC<LoginProps> = ({onLogin}) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const ID = formData.get('inputID') as string
        const Token = formData.get('inputToken') as string

        onLogin(ID, Token);
    };

    return (
        <div className={s.login}>
            <h1>Вход в GREEN-API</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name={"inputID"}
                    type="text"
                    placeholder="idInstance"
                    required
                />
                <input
                    name={"inputToken"}
                    type="text"
                    placeholder="apiTokenInstance"
                    required
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;