import React, {useEffect, useRef, useState} from 'react';
import styles from './Questionnaire.module.css';
import UploadImageQuestionnarie from "@/components/UploadImageQuestionnarie/UploadImage"
import DeleteIcon from "@/icons/DeleteIcon";
import AddIcon from "@/icons/AddIcon";
import { FormErrorsStep1,FormErrorsStep2,FormInputStep3,FormInputErrorStep3 } from "@/types";
import {useAuth} from "@/context/AuthContext";




const Form: React.FC = () => {
    const [birthDate, setBirthDate] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [personalEmail, setPersonalEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [clickedCountStep1, setClickedCountStep1] = useState(0);
    const [clickedCountStep2, setClickedCountStep2] = useState(0);
    const [clickedCountStep3, setClickedCountStep3] = useState(0);
    const [errorsStep2, setErrorsStep2] = useState<FormErrorsStep2>({});
    const [errors, setErrors] = useState<FormErrorsStep1>({});
    const [errorsStep3, setErrorsStep3] = useState<FormInputErrorStep3[]>([
        {}, {}, {}
    ]);

    const handleAddClick = () => {
        setInputs([...inputs, { id: Date.now(), name: '', lastName: '', email: '' }]);
        setErrorsStep3([...errorsStep3, {}]);
    };

    const handleRemoveClick = (index: number) => {
        setInputs(inputs => inputs.filter((_, i) => i !== index));
        setErrorsStep3(errors => errors.filter((_, i) => i !== index));
    };


    const [activeTab, setActiveTab] = useState<string>('step-01');
    const phoneRef = useRef<HTMLInputElement>(null);
    const businessPhoneRef = useRef<HTMLInputElement>(null);
    const changeTab = (tabId: string) => {
        setActiveTab(tabId);
    };
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(false);
    const hasErrors = clickedCountStep1===0 ?  true : Object.keys(errors).length > 0 ;
    const hasErrorsStep2 = clickedCountStep2===0 ?  true : Object.keys(errorsStep2).length > 0 ;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [voen, setVoen] = useState("");
    const [voenIsValid, setVoenIsValid] = useState(true);
    const [inputs, setInputs] = useState<FormInputStep3[]>([
        { id: Date.now(), name: '', lastName: '', email: '' }
    ]);
    const hasErrorsStep3 = errorsStep3.some(errorObject => {
        return Object.values(errorObject).some(value => value !== undefined && value !== '');
    });
    const handleChangeVoen = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setVoen(value);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
    };

    const stepOrder = ['step-01', 'step-02', 'step-03'];

    const goToNextStep = () => {
        const currentIndex = stepOrder.indexOf(activeTab);
        if (currentIndex >= 0 && currentIndex < stepOrder.length - 1) {
            setActiveTab(stepOrder[currentIndex + 1]);
        }
    };

    const goToPreviousStep = () => {
        const currentIndex = stepOrder.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(stepOrder[currentIndex - 1]);
        }
    };
    const handleSubmitStep1 = () => {
        setClickedCountStep1((prevCount) => prevCount + 1)
        if (!hasErrors) {
            changeTab('step-02')}

    };
    const handleSubmitStep2 = () => {
        setClickedCountStep2((prevCount) => prevCount + 1)
        if(!hasErrorsStep2){
            goToNextStep();
        }

    };
    const handleSubmitStep3 = async () => {
        const questionnaryData = {
            email: "programmer2000man@gmail.com",
            personalEmail: "programmer2000man@gmail.com",
            phoneNumber: "+9999999999999",
            businessPhoneNumber: "+9999999",
            image: "",
            patronimic: "programmer2000man@gmail.com",
            birthDate: "2024-04-20T06:58:05.604Z",
            gender: "man",
            age: 20,
            companyName: "BAIM",
            voen: "VOEN",
            typeOfActivity:"Developer" ,
            startDate: "2024-04-20T06:58:05.604Z",
            address:"Xetaiskiy"
        };


        setClickedCountStep3((prevCount) => prevCount + 1)
        validateAllFields();
        if(!hasErrorsStep3){
            setIsSubmitted(true);
            try{
                const response = await fetch("https://localhost:7164/Client/UpdateData", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(questionnaryData),
                })
                const data = await response.json();
                console.log(data)
            }
            catch(err:any){
                console.error(err)
            }
        }

    };











    const validateField = (name: string, value: string, index: number) => {
        const newErrors = { ...errorsStep3[index] };

        if (value.trim() === '') {
            newErrors[name] = 'This field is required';
        } else {
            delete newErrors[name];
        }

        if (name === 'email' && !validateEmail(value)) {
            newErrors.email = 'Please enter a valid email';
        }

        return newErrors;
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setInputs(inputs => inputs.map((input, i) =>
            i === index ? { ...input, [name]: value } : input
        ));


        if (clickedCountStep3 !== 0) {
            const newErrors = validateField(name, value, index);
            setErrorsStep3(currentErrors => currentErrors.map((error, i) =>
                i === index ? newErrors : error
            ));
        }
    };

    const validateAllFields = () => {
        const allNewErrors = inputs.map((input, index) => validateField('name', input.name, index));
        setErrorsStep3(allNewErrors);
    };


    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
    const formatPhoneNumber = (input: string): string => {
        const digits = input.replace(/\D/g, '');
        const match = digits.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
        if (!match) return '';

        return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
    };
    const handleChangeInPhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const digits = value.replace(/\D/g, '');

        if (digits.length <= 9) {
            const formattedInput = formatPhoneNumber(digits);
            setPhoneNumber(formattedInput);

            const cursorPosition = e.target.selectionStart;
            if (cursorPosition !== null) {
                const diff = formattedInput.length - value.length;

                requestAnimationFrame(() => {
                    if (phoneRef.current) {
                        const newCursorPosition = cursorPosition + diff;
                        phoneRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
                    }
                });
            }
        }
    };
    const handleChangeInBusinessPhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const digits = value.replace(/\D/g, '');

        if (digits.length <= 9) {
            const formattedInput = formatPhoneNumber(digits);
            setBusinessPhoneNumber(formattedInput);

            const cursorPosition = e.target.selectionStart;
            if (cursorPosition !== null) {
                const diff = formattedInput.length - value.length;

                requestAnimationFrame(() => {
                    if (businessPhoneRef.current) {
                        const newCursorPosition = cursorPosition + diff;
                        businessPhoneRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
                    }
                });
            }
        }
    };
    const validatePhoneNumber = (input: string): boolean => {
        const prefixRegex = /^(10|50|51|55|99|70|77)/;
        return prefixRegex.test(input);
    };
    const validateEmail = (input: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(input);
    };
    const validateBirthDate = (date: string): boolean => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18 && age <= 130;
    };
    const isFutureDate = (date: string): boolean => {
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate > today;
    };
    const validateFormStep1 = () => {
        let newErrors: FormErrorsStep1 = {};
        if (!phoneNumber) {
            newErrors.phoneNumber = "This field is required";
        }
        if (!validatePhoneNumber(phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        if (businessPhoneNumber){if (!validatePhoneNumber(businessPhoneNumber)) {
            newErrors.businessPhoneNumber = "Please enter a valid phone number";
        }}
        if (!patronymic) {
            newErrors.patronymic = "This field is required";
        }
        if(personalEmail){
            if (!validateEmail(personalEmail)) {
                newErrors.personalEmail = "Please enter a valid email";
            }
        }

        if (!selectedOption) {
            newErrors.gender = "This field is required";

        }
        if (!validatePhoneNumber(phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }
        if (!validatePhoneNumber(phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }
        if (birthDate==="") {
            newErrors.birthDate = "This field is required";
        }
        if (isFutureDate(birthDate)) {
            newErrors.birthDate = "The birth date cannot be in the future";
        } else if (!validateBirthDate(birthDate)) {
            newErrors.birthDate = "The birth date is invalid";
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(!password){
            newErrors.password = "This field is required";
        }
        if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
    }
    const validateFormStep2=()=>{
        let newErrors: FormErrorsStep2 = {};
        // console.log(voen)
        if(voen.length===0){
            newErrors.voen = "VOEN is required";
        }
        else if(!voenIsValid || voen.length !==10){
            newErrors.voen = "VOEN is invalid"
        }
        setErrorsStep2(newErrors);
    }
    useEffect(() => {

        if (clickedCountStep1 != 0) {
            validateFormStep1();
        }
        if(clickedCountStep2 != 0){
            validateFormStep2();
        }
        if(clickedCountStep3 !=0){
            validateAllFields()
        }

    }, [isSubmitted,clickedCountStep1,clickedCountStep2,clickedCountStep3,birthDate, password, confirmPassword, personalEmail, phoneNumber, businessPhoneNumber,selectedOption,voen]);

    return (
        <div className={styles.container}>
            <form action="#" method="POST" className={styles.form}>
                <div className={styles.steps}>
                    <ul className={styles.stepTabItems}>
                        <li className={`${styles.stepItem} ${activeTab === 'step-01' ? styles.active : ''}`}
                            onClick={() => {
                                changeTab('step-02')
                            }}>1
                        </li>
                        <li className={`${styles.stepItem} ${activeTab === 'step-02' ? styles.active : ''}`}
                        >2
                        </li>
                        <li className={`${styles.stepItem} ${activeTab === 'step-03' ? styles.active : ''}`}
                        >3
                        </li>

                    </ul>
                    <div className={styles.stepTabs}>
                        <div className={`${styles.stepTab} ${activeTab === 'step-01' ? styles.active : styles.hidden}`}
                             id="step-01">
                            <h4 className={styles.formTitleSc}>Personal Info</h4>
                            <div className={styles.step1Container}>
                                <div className={styles.step1Left}>
                                    <div className={styles.formControll}>
                                        <div className={styles.formInput}>
                                            <input readOnly={true} type="text" name="nameStep1" id="nameStep1" required
                                                   className={styles.formInput}/>
                                            <label className={styles.required} htmlFor="nameStep1">Name</label>
                                        </div>
                                    </div>
                                    <div className={styles.formControll}>
                                        <div className={styles.formInput}>
                                            <input readOnly={true} type="text" name="lastNameStep1" id="lastNameStep1"
                                                   required
                                                   className={styles.formInput}/>
                                            <label className={styles.required} htmlFor="lastNameStep1">Last name</label>
                                        </div>
                                    </div>
                                    <div className={styles.formControll}>
                                        <div className={styles.formInput}>
                                            <input value={patronymic} type="text" name="patronymic" id="patronymic"
                                                   required
                                                   onChange={(e) => setPatronymic(e.target.value)}
                                                   className={`${styles.formInput} ${errors.patronymic ? styles.error : ''}`}/>
                                            <label className={styles.required} htmlFor="patronymic">Patronymic</label>

                                        </div>
                                        {errors.patronymic && (
                                            <p className={styles.errorText}>{errors.patronymic}</p>
                                        )}
                                    </div>
                                    <div className={styles.formControll}>
                                        <div className={styles.formInput}>
                                            <input readOnly={true} type="text" name="emailStep1" id="emailStep1"
                                                   required
                                                   className={styles.formInput}/>
                                            <label className={styles.required} htmlFor="emailStep1">Email</label>
                                        </div>
                                    </div>

                                    <div className={styles.formControll}>
                                        <div className={styles.formInput}>
                                            <div className={styles.phoneInput}>
                                                <text className={styles.code}>+994</text>
                                                <input type="tel" name="phoneNum" id="phoneNum" required
                                                       ref={phoneRef}
                                                       value={phoneNumber} onChange={handleChangeInPhoneNum}
                                                       className={`${styles.formInput} ${errors.phoneNumber ? styles.error : ''}`}/>
                                                <label className={`${styles.required} ${styles.phoneLabel}`}
                                                       htmlFor="phoneNum">Phone
                                                    number</label>

                                            </div>

                                        </div>
                                        {errors.phoneNumber && (
                                            <p className={styles.errorText}>{errors.phoneNumber}</p>
                                        )}
                                    </div>

                                    <div className={styles.formControll}>
                                        <div className={styles.formInput}>
                                            <div className={styles.phoneInput}>
                                                <text className={styles.code}>+994</text>
                                                <input type="tel" name="businessPhoneNum" id="businessPhoneNum" required
                                                       ref={businessPhoneRef}
                                                       value={businessPhoneNumber}
                                                       onChange={handleChangeInBusinessPhoneNum}
                                                       className={`${styles.formInput} ${errors.businessPhoneNumber ? styles.error : ''}`}/>
                                                <label className={`${styles.phoneLabel}`}
                                                       htmlFor="businessPhoneNum">Business phone number
                                                </label>

                                            </div>

                                        </div>
                                        {errors.businessPhoneNumber && (
                                            <p className={styles.errorText}>{errors.businessPhoneNumber}</p>
                                        )}                                    </div>

                                    <div className={styles.formControll}>
                                        <div className={styles.formInput}>
                                            <input type="text" name="workEmail" id="workEmail" required
                                                   value={personalEmail}
                                                   onChange={(e) => setPersonalEmail(e.target.value)}
                                                   className={`${styles.formInput} ${errors.personalEmail ? styles.error : ''}`}/>
                                            <label htmlFor="workEmail">Personal email</label>
                                        </div>
                                        {errors.personalEmail && (
                                            <p className={styles.errorText}>{errors.personalEmail}</p>
                                        )}
                                    </div>


                                </div>
                                <div className={styles.step1Right}>
                                    <div className={styles.formInput}><p className={styles.photoLabel}>Photo</p>

                                        <div className={styles.uploadIn}><UploadImageQuestionnarie/></div>
                                    </div>


                                    <div className={styles.genderContainer}>
                                        <div className={styles.genderInnerContainer}>

                                            <label className={styles.label}>Gender</label>

                                            <div className={styles.gender}>
                                                <input className={styles.genderInput} name="gender" type="radio"
                                                       id="male" value="male"
                                                       checked={selectedOption === 'male'}
                                                       onChange={handleOptionChange}
                                                       required/>
                                                <label className={styles.labelGender} htmlFor="male">Male</label>
                                            </div>
                                            <div className={styles.gender}>
                                                <input className={styles.genderInput} name="gender" type="radio"
                                                       value="female"
                                                       checked={selectedOption === 'female'}
                                                       onChange={handleOptionChange} id="female"
                                                       required/>
                                                <label className={styles.labelGender} htmlFor="female">Female</label>
                                            </div>

                                        </div>
                                        <p className={styles.errorText}>{errors.gender}</p>

                                    </div>

                                    <div className={`${styles.formControll} ${styles.dateControll}`}>
                                        <div className={styles.formInput}>
                                            <input className={styles.formInput} type="date" name="date" id="date"
                                                   value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                                                   aria-label="Pick a date"/>
                                            <label className={styles.required} htmlFor="date">Date of birth</label>

                                        </div>
                                        <p className={styles.errorText}>{errors.birthDate}</p>

                                    </div>


                                    <div className={styles.formControll}>
                                        <div className={styles.formInput}>
                                            <input type={passwordVisibility ? 'text' : 'password'} name="password"
                                                   id="password"
                                                   required
                                                   className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
                                                   value={password}
                                                   onChange={(e) => setPassword(e.target.value)}
                                            />

                                            <label className={styles.required} htmlFor="password">Create a new
                                                password</label>

                                            <div className={styles.passwordShowHide} onClick={togglePasswordVisibility}>
                                                {passwordVisibility ? (
                                                    <svg className={`${styles.icon} ${styles.hidePassword}`} width="18"
                                                         height="18"
                                                         viewBox="0 0 18 18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9 3.375C5.25 3.375 2.0475 5.7075 0.75 9C2.0475 12.2925 5.25 14.625 9 14.625C12.75 14.625 15.9525 12.2925 17.25 9C15.9525 5.7075 12.75 3.375 9 3.375ZM9 12.75C6.93 12.75 5.25 11.07 5.25 9C5.25 6.93 6.93 5.25 9 5.25C11.07 5.25 12.75 6.93 12.75 9C12.75 11.07 11.07 12.75 9 12.75ZM9 6.75C7.755 6.75 6.75 7.755 6.75 9C6.75 10.245 7.755 11.25 9 11.25C10.245 11.25 11.25 10.245 11.25 9C11.25 7.755 10.245 6.75 9 6.75Z"
                                                            fill="black"/>
                                                    </svg>
                                                ) : (
                                                    <svg className={`${styles.icon} ${styles.showPassword}`} width="18"
                                                         height="18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.1387 14.526L10.323 12.7091C9.62082 12.9602 8.86179 13.0067 8.13422 12.8432C7.40665 12.6797 6.74047 12.313 6.21317 11.7857C5.68588 11.2584 5.31916 10.5922 5.15568 9.86465C4.99221 9.13708 5.0387 8.37805 5.28975 7.67587L2.97225 5.35838C1.05525 7.06275 0 9 0 9C0 9 3.375 15.1875 9 15.1875C10.0805 15.1837 11.1487 14.9586 12.1387 14.526V14.526ZM5.86125 3.474C6.85131 3.04135 7.91954 2.81622 9 2.8125C14.625 2.8125 18 9 18 9C18 9 16.9436 10.9361 15.0289 12.6427L12.7091 10.323C12.9602 9.62082 13.0067 8.86179 12.8432 8.13422C12.6797 7.40665 12.313 6.74047 11.7857 6.21317C11.2584 5.68588 10.5922 5.31916 9.86465 5.15568C9.13708 4.99221 8.37805 5.0387 7.67587 5.28975L5.86125 3.47512V3.474Z"
                                                            fill="black"/>
                                                        <path
                                                            d="M6.21544 8.60156C6.15355 9.03391 6.19321 9.47473 6.33127 9.88909C6.46933 10.3035 6.70199 10.68 7.01083 10.9888C7.31966 11.2976 7.69617 11.5303 8.11053 11.6684C8.52489 11.8064 8.96571 11.8461 9.39806 11.7842L6.21431 8.60156H6.21544ZM11.7842 9.39806L8.60156 6.21431C9.03391 6.15243 9.47473 6.19209 9.88909 6.33015C10.3035 6.4682 10.68 6.70087 10.9888 7.0097C11.2976 7.31853 11.5303 7.69505 11.6684 8.10941C11.8064 8.52377 11.8461 8.96459 11.7842 9.39694V9.39806ZM15.3516 16.1481L1.85156 2.64806L2.64806 1.85156L16.1481 15.3516L15.3516 16.1481Z"
                                                            fill="black"/>
                                                    </svg>
                                                )}
                                            </div>

                                        </div>
                                        <p className={styles.errorText}>{errors.password}</p>

                                    </div>
                                    <div className={styles.formControll}>
                                        <div className={styles.formInput}>
                                            <input type={confirmPasswordVisibility ? 'text' : 'password'}
                                                   name="password_confirmation" id="password_confirmation" required
                                                   className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
                                                   value={confirmPassword}
                                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                            />

                                            <label className={styles.required} htmlFor="password_confirmation">Confirm
                                                password</label>
                                            <div className={styles.passwordShowHide}>
                                                <div className={styles.passwordShowHide}
                                                     onClick={toggleConfirmPasswordVisibility}>
                                                    {confirmPasswordVisibility ? (
                                                        <svg className={`${styles.icon} ${styles.hidePassword}`}
                                                             width="18" height="18"
                                                             viewBox="0 0 18 18" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <svg className={styles.hidePassword} width="18" height="18"
                                                                 viewBox="0 0 18 18" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M9 3.375C5.25 3.375 2.0475 5.7075 0.75 9C2.0475 12.2925 5.25 14.625 9 14.625C12.75 14.625 15.9525 12.2925 17.25 9C15.9525 5.7075 12.75 3.375 9 3.375ZM9 12.75C6.93 12.75 5.25 11.07 5.25 9C5.25 6.93 6.93 5.25 9 5.25C11.07 5.25 12.75 6.93 12.75 9C12.75 11.07 11.07 12.75 9 12.75ZM9 6.75C7.755 6.75 6.75 7.755 6.75 9C6.75 10.245 7.755 11.25 9 11.25C10.245 11.25 11.25 10.245 11.25 9C11.25 7.755 10.245 6.75 9 6.75Z"
                                                                    fill="black"/>
                                                            </svg>
                                                        </svg>
                                                    ) : (
                                                        <svg className={`${styles.icon} ${styles.showPassword}`}
                                                             width="18" height="18" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <svg className={styles.showPassword} width="18" height="18"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M12.1387 14.526L10.323 12.7091C9.62082 12.9602 8.86179 13.0067 8.13422 12.8432C7.40665 12.6797 6.74047 12.313 6.21317 11.7857C5.68588 11.2584 5.31916 10.5922 5.15568 9.86465C4.99221 9.13708 5.0387 8.37805 5.28975 7.67587L2.97225 5.35838C1.05525 7.06275 0 9 0 9C0 9 3.375 15.1875 9 15.1875C10.0805 15.1837 11.1487 14.9586 12.1387 14.526V14.526ZM5.86125 3.474C6.85131 3.04135 7.91954 2.81622 9 2.8125C14.625 2.8125 18 9 18 9C18 9 16.9436 10.9361 15.0289 12.6427L12.7091 10.323C12.9602 9.62082 13.0067 8.86179 12.8432 8.13422C12.6797 7.40665 12.313 6.74047 11.7857 6.21317C11.2584 5.68588 10.5922 5.31916 9.86465 5.15568C9.13708 4.99221 8.37805 5.0387 7.67587 5.28975L5.86125 3.47512V3.474Z"
                                                                    fill="black"/>
                                                                <path
                                                                    d="M6.21544 8.60156C6.15355 9.03391 6.19321 9.47473 6.33127 9.88909C6.46933 10.3035 6.70199 10.68 7.01083 10.9888C7.31966 11.2976 7.69617 11.5303 8.11053 11.6684C8.52489 11.8064 8.96571 11.8461 9.39806 11.7842L6.21431 8.60156H6.21544ZM11.7842 9.39806L8.60156 6.21431C9.03391 6.15243 9.47473 6.19209 9.88909 6.33015C10.3035 6.4682 10.68 6.70087 10.9888 7.0097C11.2976 7.31853 11.5303 7.69505 11.6684 8.10941C11.8064 8.52377 11.8461 8.96459 11.7842 9.39694V9.39806ZM15.3516 16.1481L1.85156 2.64806L2.64806 1.85156L16.1481 15.3516L15.3516 16.1481Z"
                                                                    fill="black"/>
                                                            </svg>
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                        <p className={styles.errorText}>{errors.confirmPassword}</p>

                                    </div>

                                </div>

                            </div>
                            <div className={styles.formSubmit}>
                                <button className={styles.formBtn} type="button"
                                        onClick={handleSubmitStep1}>Next
                                </button>
                            </div>
                        </div>
                        {/* Additional steps omitted for brevity */}
                        <div className={styles.container}>
                            <div
                                className={`${styles.stepTab} ${activeTab === 'step-02' ? styles.active : styles.hidden}`}
                                id="step-02">
                                <h4 className={styles.formTitleSc}>Company Info</h4>
                                <div className={styles.step2Container}></div>
                                <div className={styles.formControll}>
                                    <div className={styles.formInput}>
                                        <input type="text" name="voen" id="voen" required value={voen}
                                               onChange={handleChangeVoen}
                                               className={styles.formInputField}/>
                                        <label className={styles.required} htmlFor="voen">VOEN</label>
                                    </div>
                                    <p className={styles.errorText}>{errorsStep2.voen}</p>

                                </div>

                                <div className={styles.formSubmit}>
                                    <button className={styles.findBtn} type="button"
                                            onClick={() => {
                                            }}>Find Details
                                    </button>
                                </div>
                                <div className={styles.formControll}>
                                    <div className={styles.formInput}>
                                        <input type="text" name="companyName" id="companyName" required
                                               className={styles.formInputField}/>
                                        <label htmlFor="companyName">Name of company </label>
                                    </div>
                                </div>
                                <div className={styles.formControll}>
                                    <div className={styles.formInput}>
                                        <input type="text" name="activity" id="activity" required
                                               className={styles.formInputField}/>
                                        <label htmlFor="voen">Type of activity</label>
                                    </div>
                                </div>


                                <div className={styles.formControll}>
                                    <div className={styles.formInput}>
                                        <input type="tel" name="tel" id="tel" required
                                               className={styles.formInputField}/>
                                        <label htmlFor="tel">Name of director</label>

                                    </div>
                                </div>

                                <div className={`${styles.formSubmit} ${styles.grid2}`}>
                                    <button type="button" className={styles.formBtn} onClick={goToPreviousStep}>Previous
                                    </button>
                                    <button type="button" className={styles.formBtn} onClick={handleSubmitStep2}>Next
                                    </button>
                                </div>
                            </div>
                            <div
                                className={`${styles.stepTab} ${activeTab === 'step-03' ? styles.active : styles.hidden}`}
                                id="step-03">
                                {!isSubmitted &&( <div><h4 className={styles.formTitleSc}>Invite new users</h4>
                                    <div className={styles.inputsContainer}>

                                        {inputs.map((input, index) => (
                                            <div className={styles.inputsInnerContainer} key={input.id}>
                                                <div className={styles.inputsStep3}>
                                                    <div className={styles.formControll}>
                                                        <div className={styles.formInput}>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={input.name}
                                                                required
                                                                onChange={(event) => handleInputChange(index, event)}
                                                                className={styles.formInput}
                                                            />

                                                            <label className={styles.required}
                                                                   htmlFor="nameStep3">Name</label>

                                                        </div>
                                                        {errorsStep3[index]?.name &&
                                                            <p className={styles.errorText}>{errorsStep3[index].name}</p>}

                                                    </div>

                                                    <div className={styles.formControll}>
                                                        <div className={styles.formInput}>
                                                            <input
                                                                type="text"
                                                                name="lastName"
                                                                value={input.lastName}
                                                                required
                                                                onChange={(event) => handleInputChange(index, event)}
                                                                className={styles.formInput}
                                                            />
                                                            <label className={styles.required} htmlFor="lastNameStep3">Last
                                                                name</label>
                                                        </div>
                                                        {errorsStep3[index]?.lastName &&
                                                            <p className={styles.errorText}>{errorsStep3[index].lastName}</p>}

                                                    </div>

                                                    <div className={styles.formControll}>
                                                        <div className={styles.formInput}>
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                value={input.email}
                                                                required
                                                                onChange={(event) => handleInputChange(index, event)}
                                                                className={styles.formInput}
                                                            />
                                                            <label className={styles.required}
                                                                   htmlFor="emailStep3">Email</label>

                                                        </div>
                                                        {errorsStep3[index]?.email &&
                                                            <p className={styles.errorText}>{errorsStep3[index].email}</p>}
                                                    </div>

                                                </div>


                                                <button onClick={() => handleRemoveClick(index)}
                                                        className={styles.btnDelete}>
                                                    <DeleteIcon/>
                                                </button>

                                            </div>
                                        ))}
                                        <div>
                                            <div className={`${styles.formSubmit} ${styles.grid2}`}>
                                                <button onClick={handleAddClick} className={styles.formBtn}>
                                                    <AddIcon/>
                                                    <span className={styles.labelAdd}>Add more</span>
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    <div className={`${styles.formSubmit} ${styles.grid2}`}>
                                        <button type="button" className={styles.formBtn}
                                                onClick={goToPreviousStep}>Previous
                                        </button>
                                        <button type="button" className={styles.formBtn}
                                                onClick={handleSubmitStep3}>Submit
                                        </button>
                                    </div>
                                </div>)}
                                {isSubmitted && (<div className={styles.containerConfetti}>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                    <div className={styles.confetti}></div>
                                </div>)}
                            </div>

                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Form;