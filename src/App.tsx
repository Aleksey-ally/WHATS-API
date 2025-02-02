import s from "@/App.module.scss";
import {useState} from 'react';
import Login from '@/components/Login/Login'
import Chat from '@/components/Chat/Chat';
import {setInstance} from "@/api/base-api.ts";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorResponse, setErrorResponse] = useState<string>('')

    const handleLogin = async (idInstance: string, apiTokenInstance: string) => {
        setInstance(idInstance, apiTokenInstance)
        setIsLoggedIn(true);
    };

    const handleErrorResponse = (error: string) => {
        setErrorResponse(error);
        setIsLoggedIn(false);
    };

    return (
        <div>
            {!isLoggedIn ? (
                <>
                    {errorResponse && <h1 className={s.error}>{errorResponse}</h1>}
                    <Login onLogin={handleLogin}/>
                </>
            ) : (
                <Chat setErrorResponse={handleErrorResponse}/>
            )}
        </div>
    );
};

export default App;