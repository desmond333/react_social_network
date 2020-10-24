import React from 'react';
import s from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {//именно класс, потому что react в памяти создает с него объект,у которого есть state
    state = { //localState
        editMode: false,
        status: this.props.userStatus //изначально status = тому, что приходит из мира BLL
    }

    activateEditMode = () => {
        this.setState({ //говорим реакту о том, что надо перерисовывать компоненту, так как изменился state
            editMode: true, //меняем лишь editMode в localState
        })
    }
    deactivateEditMode = () => {
        this.setState({ //говорим реакту о том, что надо перерисовывать компоненту, так как изменился state
            editMode: false, //меняем лишь editMode в localState
        })
        this.props.updateUserStatusThunk(this.state.status) //обновляем userStatus в DAL уровне => отправляем на сервер
    }

    onStatusChange = (e) => { //input засовывает в эту f объект событие(event)
        this.setState({
            status: e.currentTarget.value //target это input
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) { //вызывается сразу же после обновления компоненты
        if (prevProps.userStatus !== this.props.userStatus) { //если то, что приходило !== тому, что приходит
            this.setState({ //без условия нельзя оставлять данный метод (иначе будет достигнута max depth)
                status: this.props.userStatus //синхронизируем local state c пришедшим state
            })
        }
    }

    render() { // перерисовываем компоненту каждый раз, когда меняется local state
        return (
            <div className={s.profileStatus}>
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>
                }
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.userStatus || "-------"}</span>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;