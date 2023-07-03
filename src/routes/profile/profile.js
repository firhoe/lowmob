import React from 'react'
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard';
import Widgets from '../../components/Widgets/Widgets';
import './profile.css'


export default function Profile() {
  return (
    <div className="container flex">
      <div className="profile__container">
        <UserInfoCard />
        <Widgets />
      </div>
    </div>
  );
}

