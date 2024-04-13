import styles from './ChoiceForm.module.css'
import Image from 'next/image';

const ChoiceForm: React.FC = () => {
    function rangeSlide(event: any) {
        const { value } = event.target;
        const rangeValue = document.getElementById("rangeValue") as HTMLSpanElement;
        if (rangeValue) {
            rangeValue.innerHTML = value;
        }
    }
    

    return (
        <div className={styles.app}>
            <div className={styles.textAndImage}> 
                <form className='form'>
                <h2 className={styles.formHeading}>Собери свое Коммерческое Предложение сам</h2>
                    <div className={styles.place}>
                        <label>Где будет стоять 1С:</label>
                        <div className="toggle">
                            <input type="radio" name="place" value="pc" id="pc" defaultChecked />
                            <label htmlFor="pc">На компьютере</label>
                            <input type="radio" name="place" value="server" id="server" />
                            <label htmlFor="server">На сервере</label>
                        </div>
                    </div>
                    <div className={styles.modules}>
                            <label>Какие модули планируете автоматизировать:</label>
                            <div className={styles.twoCols}>
                                <div className={styles.coll}>
                                    <label className="container">Банк и касса
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="container">Бухгалтерия и Финансы
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="container">Склад
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="container">Продажи
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className={styles.coll}>
                                    <label className="container">Кадровый учет
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="container">Производство
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="container">CRM и маркетинг
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="container">Закупки
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    <div className={styles.slide}>
                        <label>Сколько пользователей будут работать в системе:</label>
                        <span className={styles.rangeSlide} id="rangeValue">0</span>
                        <input
                            className={styles.range}
                            type="range"
                            name="users"
                            defaultValue="0"
                            min={0}
                            max={60}
                            onChange={(e) => rangeSlide(e)}
                            onMouseMove={(e) => rangeSlide(e)}
                        />
                    </div>
                    <input className={styles.submit} value="Получить предложение" type="submit" />
                </form>
                <Image width={500} height={400} src="/businessman.png" alt="businessman" />
            </div>
        </div>
    );
};

export default ChoiceForm;
