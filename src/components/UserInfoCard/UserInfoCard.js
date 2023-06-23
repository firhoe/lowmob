import React, { useEffect } from 'react';
import { useStore } from '../../utils/store';
import spotifyApi from '../../utils/auth';
import './UserInfoCard.css';

export default function UserInfoCard() {
  const { setUser, user } = useStore();

  useEffect(() => {
    spotifyApi.getMe().then((response) => {
      const { display_name, followers, images } = response;
      const user = {
        name: display_name,
        followers: followers.total,
        image: images.length > 0 ? images[0].url : null,
      };
      setUser(user);
    });
  }, [setUser]);

  return (
    <div className="user__container">
      <div className="user__card">
        <div className="user__profile">
          <h2 className='user__name'>Hello, {user.name}!</h2>
          <img src='../../images/moving-dot-black.svg' className='user__animation' alt='loop'/>
          {user.image && <img src={user.image} alt="profile" className='user__image' />}
          <p className='user__followers'>{user.followers} followers</p>
        </div>
      </div>
    </div>
  );
}