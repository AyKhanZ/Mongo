import React, {Dispatch} from 'react';
import {Step3FormProps} from "@/types";
import AddIcon from "@/icons/AddIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import styles from '../MultiStepForm/MultiStepForm.module.css'
const Step3Form: React.FC<Step3FormProps> = ({
                                                 state,
                                                 dispatch,
                                                 errorsStep3,
                                                 setErrorsStep3,
                                                 handleInputChange,
                                                 handleAddClick,
                                                 handleRemoveClick,
                                                 handleSubmitStep3,
                                                 goToPreviousStep
                                             }) => {
    return (
        <div className={styles.inputsContainer}>
            {state.inputs.map((input, index) => (
                <div className={styles.inputsInnerContainer} key={input.id}>
                    <div className={styles.inputsStep3}>
                        <div className={styles.formControll}>
                            <div className={styles.formInput}>
                                <input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    required
                                    onChange={(event) => handleInputChange(index, event, dispatch, state, setErrorsStep3, errorsStep3)}
                                    className={styles.formInput}
                                />

                                <label className={styles.required}
                                       htmlFor="name">Name</label>

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
                                    onChange={(event) => handleInputChange(index, event, dispatch, state, setErrorsStep3, errorsStep3)}
                                    className={styles.formInput}
                                />
                                <label className={styles.required}
                                       htmlFor="lastName">Last
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
                                    onChange={(event) => handleInputChange(index, event, dispatch, state, setErrorsStep3, errorsStep3)}
                                    className={styles.formInput}
                                />
                                <label className={styles.required}
                                       htmlFor="email">Email</label>

                            </div>
                            {errorsStep3[index]?.email &&
                                <p className={styles.errorText}>{errorsStep3[index].email}</p>}
                        </div>

                    </div>


                    <button onClick={() => handleRemoveClick(index, dispatch)}
                            className={styles.btnDelete}>
                        <DeleteIcon/>
                    </button>

                </div>
            ))}
            <div>
                <div className={`${styles.formSubmit} ${styles.grid2}`}>
                    <button onClick={() => handleAddClick(dispatch)} className={styles.formBtn}>
                        <AddIcon/>
                        <span className={styles.labelAdd}>Add more</span>
                    </button>
                </div>

            </div>
            <div className={`${styles.formSubmit} ${styles.grid2}`}>
                <button type="button" className={styles.formBtn}
                        onClick={() => goToPreviousStep(dispatch)}>Previous
                </button>
                <button type="button" className={styles.formBtn}
                        onClick={() => handleSubmitStep3(state, dispatch, setErrorsStep3)}
                >Submit
                </button>
            </div>
        </div>


    );
};

export default Step3Form;
