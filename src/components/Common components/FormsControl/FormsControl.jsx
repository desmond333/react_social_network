import React from 'react' //jsx же транспилируется в js с конструкцией React.createElement - поэтому нужен import React,
// даже если явно в jsx'е нет конструкций с React
import styles from "./FormsControl.module.css";

export const Textarea = ({input, meta, ...props}) => { //props теперь содержат всё кроме input и meta
    const hasError = meta.touched && meta.error //если поле тронуто и есть ошибка
    return(
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <textarea {...input} {...props}/> {/*проводим деструктуризацию*/}
            </div>
            <span>{hasError}</span>
        </div>
    )
}

export const Input = ({input, meta, ...props}) => { //props теперь содержат всё кроме input и meta
    const hasError = meta.touched && meta.error //если поле тронуто и есть ошибка
    return(
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input} {...props}/> {/*проводим деструктуризацию*/}
            </div>
            <span>{hasError}</span>
        </div>
    )
}