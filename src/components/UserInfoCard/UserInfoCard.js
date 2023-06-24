import React, {useEffect} from 'react';
import {useStore} from '../../utils/store';
import spotifyApi from '../../utils/auth';
import './UserInfoCard.css';

export default function UserInfoCard() {
  const {setUser, user} = useStore();

  useEffect(() => {
    spotifyApi.getMe().then((response) => {
      const {display_name, followers} = response;
      const user = {
        name: display_name,
        followers: followers.total,
      };
      setUser(user);
    });
  }, [setUser]);

  return (
    <div className="user__container">
      <div className="user__card">
        <div className="user__profile">
          <h2 className="user__name">
             Hello, {user.name}!
            <p className="user__followers">{user.followers} followers</p>
          </h2>
          <div className="user__animation"></div>
        </div>
      </div>
    </div>
  );
}
