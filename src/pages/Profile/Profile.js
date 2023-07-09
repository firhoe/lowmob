import React, {useEffect} from 'react';
import {useStore} from '../../utils/store';
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard';
import Widgets from '../../components/Widgets/Widgets';
import MemojiCard from '../../components/MemojiCard/MemojiCard';
import './Profile.css'


export default function Profile() {
  const setIsLoading = useStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [setIsLoading]);

  return (
    <div className="container flex">
      <div className="profile__container">
        <UserInfoCard />
        <MemojiCard />
        <Widgets />
      </div>
    </div>
  );
}

