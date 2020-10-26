import React, {useState, useEffect} from "react";
import styles from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {
    let editModeState = useState(false) // useState возвращает массив из двух элементов
    let editMode = editModeState[0] //одиночное значение массива, которое хранится где-то в космосе
    let setEditMode = editModeState[1] //f, которая меняет одиночное значение массива
    // let [editMode, setEditMode] = useState(false) эта строчка заменяет три строчки выше

    let statusState = useState(props.userStatus) // useState возвращает массив из двух элементов
    let status = statusState[0] //одиночное значение массива, которое хранится где-то в космосе
    let setStatus = statusState[1] //f, которая меняет одиночное значение массива
    // let [status, setStatus] = useState(props.userStatus) эта строчка заменяет три строчки выше

    useEffect(  () => { //выполняется вначале после первой отрисовки компоненты и когда приходят пропсы
        setStatus(props.userStatus)
    }, [props.userStatus]) //зависимость от приходящего значения userStatus

    const activateEditMode = () => { //говорим реакту о том, что надо перерисовывать компоненту, так как изменился state
        setEditMode(true)
    }

    const deactivateEditMode = () => { //говорим реакту о том, что надо перерисовывать компоненту, так как изменился state
        setEditMode(false)
        props.updateUserStatusThunk(status) //обновляем userStatus в DAL уровне => отправляем на сервер
    }

    const onStatusChange = (e) => { //input засовывает в эту f объект событие(event)
        setStatus(e.currentTarget.value) //target это input
    }

    const noStatus = () => {
        return (
            <span className={styles.noStatus}>no status</span>
        )
    }

    return (
        <div className={styles.profileStatus}>
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                       value={status}/>
            </div>
            }
            {!editMode &&
            <div onDoubleClick={activateEditMode} className={styles.userText}>
                Status: {props.userStatus != null ? props.userStatus : noStatus()}
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;