import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
   const {setAuthUser} = useAuthContext()

    const signup = async ({fullName, userName, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, userName, password, confirmPassword, gender})
        if(!success) return;

        setLoading(true);
        try {

            const result = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({fullName, userName, password, confirmPassword, gender})
            })

            const data = await result.json();

            if(data.error) {
                throw new Error(data.error)
            }

            //set to localstorage
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

            
        } catch (error) {
            toast.error(error)
        }
    }
    return {loading, signup}
}

export default useSignup

function handleInputErrors({fullName, userName, password, confirmPassword, gender}) {
    if(!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error('Please fill all the fields!')
        return false;
    }

    if(password !== confirmPassword) {
        toast.error('password do not match')
        return false;
    }

    if(password.length < 6){
        toast.error('password must be atleast 6 characters');
        return false;
    }

    return true;
}