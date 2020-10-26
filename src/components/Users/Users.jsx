import React from 'react';
import Paginator from "./../Common components/Paginator/Paginator";
import User from "./User";
import styles from './Users.module.css'

let Users = ({currentPage, totalUsersCount, displayUsersNumber, onPageChanged, usersData, ...props}) => {
    return <div className={styles.usersPage}>
        <div className={styles.pagination}>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={displayUsersNumber}/>
        </div>
        <div className={styles.users}>
            {
                usersData.map(u => <User user={u}
                                         followingInProgress={props.followingInProgress}
                                         key={u.id}
                                         unfollowThunk={props.unfollowThunk}
                                         followThunk={props.followThunk}/>)
            }
        </div>
        <a className={styles.backToTop} onClick={ () => {
            if (window.pageYOffset > 0) {
                window.scrollBy(0, -2000);
            }
        }}>^</a>
    </div>
}

export default Users;
