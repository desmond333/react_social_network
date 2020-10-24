import React from 'react';
import Paginator from "./../Common components/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage, totalUsersCount, displayUsersNumber, onPageChanged, usersData, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={displayUsersNumber}/>
        <div>
            {
                usersData.map(u => <User user={u}
                                         followingInProgress={props.followingInProgress}
                                         key={u.id}
                                         unfollowThunk={props.unfollowThunk}
                                         followThunk={props.followThunk}
                    />
                )
            }
        </div>
    </div>
}

export default Users;
