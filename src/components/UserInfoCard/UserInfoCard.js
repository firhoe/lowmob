import React, {useEffect} from 'react';
import {useStore} from '../../utils/store';
import spotifyApi from '../../utils/authorization';
import './UserInfoCard.css';

export default function UserInfoCard() {
  const {setUser, user, spotifyToken} = useStore();

  useEffect(() => {
    spotifyApi.setAccessToken(spotifyToken);

    if (spotifyToken) {
      spotifyApi
        .getMe()
        .then((response) => {
          const {display_name, followers} = response;
          const user = {
            name: display_name,
            followers: followers.total,
          };
          setUser(user);
        })
        .catch((error) => {
          console.error('Error getting user:', error);
        });
    }
  }, [spotifyToken, setUser]);

  return (
    <div className="user__container">
      <div className="user__card">
        <h2 className="user__name">
          hello, {user.name}!
          <p className="user__followers">{user.followers} followers</p>
        </h2>
        <div className="user__animation"></div>
      </div>
    </div>
  );
}
