import RegistrationForm from "../../../components/RegisterationForm";
import styles from "../../../Styles/RegistrationForm.module.css"
import Navbar from "../../../components/Navbar";
const RegisterPage = () => {
    return (
        <div>
            <Navbar/>
            <div>
                <RegistrationForm />
            </div>
        </div>
    );
};

export default RegisterPage;