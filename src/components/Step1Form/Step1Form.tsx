import styles from "../MultiStepForm/MultiStepForm.module.css";
import React, { useRef, useState } from "react";
import { Step1FormProps } from "@/types";
import {
  handleChangeBirthDate,
  handleChangeConfirmPassword,
  handleChangeInBusinessPhoneNum,
  handleChangeInPhoneNum,
  handleChangePassword,
  handleChangePatronymic,
  handleChangePersonalEmail,
  handleOptionChange,
} from "@/components/utils/formHandlers";
import {
  toggleConfirmPasswordVisibility,
  togglePasswordVisibility,
} from "@/components/utils/formActions";
import UploadImage from "@/components/UploadImage/UploadImage";
import UploadImageNews from "../UploadImageNews/UploadImageNews";
const Step1Form: React.FC<Step1FormProps> = ({
  state,
  dispatch,
  hasErrors,
  changeTab,
}) => {
  const businessPhoneRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState("");

  return (
    <div className={styles.containerStep1}>
      <div className={styles.column}>
        <ul className={styles.ulColumn}>
          <li className={styles.liColumn}>
            <div className={styles.formControll}>
              <div className={styles.formInput}>
                <input
                  readOnly={true}
                  type="text"
                  name="nameStep1"
                  id="nameStep1"
                  required
                  className={styles.formInput}
                />
                <label className={styles.required} htmlFor="nameStep1">
                  Name
                </label>
              </div>
            </div>
          </li>
          <li className={styles.liColumn}>
            <div className={styles.formControll}>
              <div className={styles.formInput}>
                <input
                  readOnly={true}
                  type="text"
                  name="lastNameStep1"
                  id="lastNameStep1"
                  required
                  className={styles.formInput}
                />
                <label className={styles.required} htmlFor="lastNameStep1">
                  Last name
                </label>
              </div>
            </div>
          </li>
          <li className={styles.liColumn}>
            <div className={styles.formControll}>
              <div className={styles.formInput}>
                <input
                  value={state.patronymic}
                  type="text"
                  name="patronymic"
                  id="patronymic"
                  required
                  onChange={(e) => handleChangePatronymic(dispatch, e)}
                  className={`${styles.formInput} ${
                    state.errors.patronymic ? styles.error : ""
                  }`}
                />
                <label className={styles.required} htmlFor="patronymic">
                  Patronymic
                </label>
              </div>
              {state.errors.patronymic && (
                <p className={styles.errorText}>{state.errors.patronymic}</p>
              )}
            </div>
          </li>
          <li className={styles.liColumn}>
            <div className={styles.genderContainer}>
              <div className={styles.genderInnerContainer}>
                <label className={styles.label}>Gender</label>

                <div className={styles.gender}>
                  <input
                    className={styles.genderInput}
                    name="gender"
                    type="radio"
                    id="male"
                    value="male"
                    checked={state.selectedOption === "male"}
                    onChange={(event) => handleOptionChange(event, dispatch)}
                    required
                  />
                  <label className={styles.labelGender} htmlFor="male">
                    Male
                  </label>
                </div>
                <div className={styles.gender}>
                  <input
                    className={styles.genderInput}
                    name="gender"
                    type="radio"
                    value="female"
                    checked={state.selectedOption === "female"}
                    onChange={(event) => handleOptionChange(event, dispatch)}
                    id="female"
                    required
                  />
                  <label className={styles.labelGender} htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
              <p className={styles.errorText}>{state.errors.gender}</p>
            </div>
          </li>
          <li className={styles.liColumn}>
            <div className={`${styles.formControll} ${styles.dateControll}`}>
              <div className={styles.formInput}>
                <input
                  className={styles.formInput}
                  type="date"
                  name="date"
                  id="date"
                  value={state.birthDate}
                  onChange={(e) => handleChangeBirthDate(dispatch, e)}
                  aria-label="Pick a date"
                />
                <label className={styles.required} htmlFor="date">
                  Date of birth
                </label>
              </div>
              <p className={styles.errorText}>{state.errors.birthDate}</p>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.column}>
        <ul className={styles.ulColumn}>
          <li className={styles.liColumn}>
            <div className={styles.formControll}>
              <div className={styles.formInput}>
                <input
                  readOnly={true}
                  type="text"
                  name="emailStep1"
                  id="emailStep1"
                  required
                  className={styles.formInput}
                />
                <label className={styles.required} htmlFor="emailStep1">
                  Email
                </label>
              </div>
            </div>
          </li>
          <li className={styles.liColumn}>
            <div className={styles.formControll}>
              <div className={styles.formInput}>
                <input
                  type="text"
                  name="workEmail"
                  id="workEmail"
                  required
                  value={state.personalEmail}
                  onChange={(e) => handleChangePersonalEmail(dispatch, e)}
                  className={`${styles.formInput} ${
                    state.errors.personalEmail ? styles.error : ""
                  }`}
                />
                <label htmlFor="workEmail">Personal email</label>
              </div>
              {state.errors.personalEmail && (
                <p className={styles.errorText}>{state.errors.personalEmail}</p>
              )}
            </div>
          </li>
          <li className={styles.liColumn}>
            <div className={styles.formControll}>
              <div className={styles.formInput}>
                <div className={styles.phoneInput}>
                  <text className={styles.code}>+994</text>
                  <input
                    type="tel"
                    name="phoneNum"
                    id="phoneNum"
                    required
                    ref={phoneRef}
                    value={state.phoneNumber}
                    onChange={(e) =>
                      handleChangeInPhoneNum(dispatch, phoneRef, e)
                    }
                    className={`${styles.formInput} ${
                      state.errors.phoneNumber ? styles.error : ""
                    }`}
                  />
                  <label
                    className={`${styles.required} ${styles.phoneLabel}`}
                    htmlFor="phoneNum"
                  >
                    Phone number
                  </label>
                </div>
              </div>
              {state.errors.phoneNumber && (
                <p className={styles.errorText}>{state.errors.phoneNumber}</p>
              )}
            </div>
          </li>
          <li className={styles.liColumn}>
            <div className={styles.formControll}>
              <div className={styles.formInput}>
                <div className={styles.phoneInput}>
                  <text className={styles.code}>+994</text>
                  <input
                    type="tel"
                    name="businessPhoneNum"
                    id="businessPhoneNum"
                    required
                    ref={businessPhoneRef}
                    value={state.businessPhoneNumber}
                    onChange={(e) =>
                      handleChangeInBusinessPhoneNum(
                        dispatch,
                        businessPhoneRef,
                        e
                      )
                    }
                    className={`${styles.formInput} ${
                      state.errors.businessPhoneNumber ? styles.error : ""
                    }`}
                  />
                  <label
                    className={`${styles.phoneLabel}`}
                    htmlFor="businessPhoneNum"
                  >
                    Business phone number
                  </label>
                </div>
              </div>
              {state.errors.businessPhoneNumber && (
                <p className={styles.errorText}>
                  {state.errors.businessPhoneNumber}
                </p>
              )}{" "}
            </div>
          </li>
          <li>
            <div className={styles.formControll}>
              <div className={styles.formInput}>
                <input
                  type={state.passwordVisibility ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  className={`${styles.formInput} ${
                    state.errors.password ? styles.error : ""
                  }`}
                  value={state.password}
                  onChange={(e) => handleChangePassword(dispatch, e)}
                />

                <label className={styles.required} htmlFor="password">
                  Create a new password
                </label>

                <div
                  className={styles.passwordShowHide}
                  onClick={() => togglePasswordVisibility(dispatch)}
                >
                  {state.passwordVisibility ? (
                    <svg
                      className={`${styles.icon} ${styles.hidePassword}`}
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 3.375C5.25 3.375 2.0475 5.7075 0.75 9C2.0475 12.2925 5.25 14.625 9 14.625C12.75 14.625 15.9525 12.2925 17.25 9C15.9525 5.7075 12.75 3.375 9 3.375ZM9 12.75C6.93 12.75 5.25 11.07 5.25 9C5.25 6.93 6.93 5.25 9 5.25C11.07 5.25 12.75 6.93 12.75 9C12.75 11.07 11.07 12.75 9 12.75ZM9 6.75C7.755 6.75 6.75 7.755 6.75 9C6.75 10.245 7.755 11.25 9 11.25C10.245 11.25 11.25 10.245 11.25 9C11.25 7.755 10.245 6.75 9 6.75Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      className={`${styles.icon} ${styles.showPassword}`}
                      width="18"
                      height="18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1387 14.526L10.323 12.7091C9.62082 12.9602 8.86179 13.0067 8.13422 12.8432C7.40665 12.6797 6.74047 12.313 6.21317 11.7857C5.68588 11.2584 5.31916 10.5922 5.15568 9.86465C4.99221 9.13708 5.0387 8.37805 5.28975 7.67587L2.97225 5.35838C1.05525 7.06275 0 9 0 9C0 9 3.375 15.1875 9 15.1875C10.0805 15.1837 11.1487 14.9586 12.1387 14.526V14.526ZM5.86125 3.474C6.85131 3.04135 7.91954 2.81622 9 2.8125C14.625 2.8125 18 9 18 9C18 9 16.9436 10.9361 15.0289 12.6427L12.7091 10.323C12.9602 9.62082 13.0067 8.86179 12.8432 8.13422C12.6797 7.40665 12.313 6.74047 11.7857 6.21317C11.2584 5.68588 10.5922 5.31916 9.86465 5.15568C9.13708 4.99221 8.37805 5.0387 7.67587 5.28975L5.86125 3.47512V3.474Z"
                        fill="black"
                      />
                      <path
                        d="M6.21544 8.60156C6.15355 9.03391 6.19321 9.47473 6.33127 9.88909C6.46933 10.3035 6.70199 10.68 7.01083 10.9888C7.31966 11.2976 7.69617 11.5303 8.11053 11.6684C8.52489 11.8064 8.96571 11.8461 9.39806 11.7842L6.21431 8.60156H6.21544ZM11.7842 9.39806L8.60156 6.21431C9.03391 6.15243 9.47473 6.19209 9.88909 6.33015C10.3035 6.4682 10.68 6.70087 10.9888 7.0097C11.2976 7.31853 11.5303 7.69505 11.6684 8.10941C11.8064 8.52377 11.8461 8.96459 11.7842 9.39694V9.39806ZM15.3516 16.1481L1.85156 2.64806L2.64806 1.85156L16.1481 15.3516L15.3516 16.1481Z"
                        fill="black"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <p className={styles.errorText}>{state.errors.password}</p>
            </div>
          </li>
          <li className={styles.liColumn}>
            <div className={styles.formControll}>
              <div className={styles.formInput}>
                <input
                  type={state.confirmPasswordVisibility ? "text" : "password"}
                  name="password_confirmation"
                  id="password_confirmation"
                  required
                  className={`${styles.formInput} ${
                    state.errors.confirmPassword ? styles.error : ""
                  }`}
                  value={state.confirmPassword}
                  onChange={(e) => handleChangeConfirmPassword(dispatch, e)}
                />

                <label
                  className={styles.required}
                  htmlFor="password_confirmation"
                >
                  Confirm password
                </label>
                <div className={styles.passwordShowHide}>
                  <div
                    className={styles.passwordShowHide}
                    onClick={() => toggleConfirmPasswordVisibility(dispatch)}
                  >
                    {state.confirmPasswordVisibility ? (
                      <svg
                        className={`${styles.icon} ${styles.hidePassword}`}
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <svg
                          className={styles.hidePassword}
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 3.375C5.25 3.375 2.0475 5.7075 0.75 9C2.0475 12.2925 5.25 14.625 9 14.625C12.75 14.625 15.9525 12.2925 17.25 9C15.9525 5.7075 12.75 3.375 9 3.375ZM9 12.75C6.93 12.75 5.25 11.07 5.25 9C5.25 6.93 6.93 5.25 9 5.25C11.07 5.25 12.75 6.93 12.75 9C12.75 11.07 11.07 12.75 9 12.75ZM9 6.75C7.755 6.75 6.75 7.755 6.75 9C6.75 10.245 7.755 11.25 9 11.25C10.245 11.25 11.25 10.245 11.25 9C11.25 7.755 10.245 6.75 9 6.75Z"
                            fill="black"
                          />
                        </svg>
                      </svg>
                    ) : (
                      <svg
                        className={`${styles.icon} ${styles.showPassword}`}
                        width="18"
                        height="18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <svg
                          className={styles.showPassword}
                          width="18"
                          height="18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.1387 14.526L10.323 12.7091C9.62082 12.9602 8.86179 13.0067 8.13422 12.8432C7.40665 12.6797 6.74047 12.313 6.21317 11.7857C5.68588 11.2584 5.31916 10.5922 5.15568 9.86465C4.99221 9.13708 5.0387 8.37805 5.28975 7.67587L2.97225 5.35838C1.05525 7.06275 0 9 0 9C0 9 3.375 15.1875 9 15.1875C10.0805 15.1837 11.1487 14.9586 12.1387 14.526V14.526ZM5.86125 3.474C6.85131 3.04135 7.91954 2.81622 9 2.8125C14.625 2.8125 18 9 18 9C18 9 16.9436 10.9361 15.0289 12.6427L12.7091 10.323C12.9602 9.62082 13.0067 8.86179 12.8432 8.13422C12.6797 7.40665 12.313 6.74047 11.7857 6.21317C11.2584 5.68588 10.5922 5.31916 9.86465 5.15568C9.13708 4.99221 8.37805 5.0387 7.67587 5.28975L5.86125 3.47512V3.474Z"
                            fill="black"
                          />
                          <path
                            d="M6.21544 8.60156C6.15355 9.03391 6.19321 9.47473 6.33127 9.88909C6.46933 10.3035 6.70199 10.68 7.01083 10.9888C7.31966 11.2976 7.69617 11.5303 8.11053 11.6684C8.52489 11.8064 8.96571 11.8461 9.39806 11.7842L6.21431 8.60156H6.21544ZM11.7842 9.39806L8.60156 6.21431C9.03391 6.15243 9.47473 6.19209 9.88909 6.33015C10.3035 6.4682 10.68 6.70087 10.9888 7.0097C11.2976 7.31853 11.5303 7.69505 11.6684 8.10941C11.8064 8.52377 11.8461 8.96459 11.7842 9.39694V9.39806ZM15.3516 16.1481L1.85156 2.64806L2.64806 1.85156L16.1481 15.3516L15.3516 16.1481Z"
                            fill="black"
                          />
                        </svg>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <p className={styles.errorText}>{state.errors.confirmPassword}</p>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.column}>
        <ul className={styles.ulColumn}>
          <li className={styles.liColumn}>
            <div className={styles.formInput}>
              <p className={styles.photoLabel}>Photo</p>

              <div className={styles.uploadIn}>
                <UploadImageNews
                  setImg={(newImg: any) => {
                    if (newImg) {
                      setImg(newImg);
                    }
                  }}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Step1Form;
