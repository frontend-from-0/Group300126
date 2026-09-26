'use client';

import { useContext } from 'react'
import {UserContext} from '@/app/context/UserContext';

export default function UserSettingPage () {
  const {email} = useContext(UserContext);

  return (
    <div>
      <h1>Setting page</h1>
      <h2>User information</h2>
      <span>Email: {email}</span>
    </div>
  )
}