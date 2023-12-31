import React, { createContext, useContext, useState } from 'react';
import { useAuthProvider } from './AuthProvider';
import { getUsersCodes } from '../Api/User/get-users-codes';
import { deleteCheat } from '../Api/User/delete-cheat';
import { CheatCode, UsersCodeContextType } from '../Types';

const UserCodesContext = createContext({} as UsersCodeContextType);

export const UserCodesProvider = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthProvider();
  const [usersCodes, setUsersCodes] = useState<CheatCode[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [consoleFilter, setConsoleFilter] = useState('');

  const fetchCodes = () => {
    if (user) getUsersCodes(user.id).then((codes) => setUsersCodes(codes));
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = event.currentTarget.dataset.id;
    deleteCheat(id).then(() => fetchCodes());
  };

  const filterCodes = (
    codes: CheatCode[],
    searchTerm: string,
    consoleID: string
  ) => {
    if (searchTerm && consoleID) {
      return codes.filter(
        (code: CheatCode) =>
          code.gameTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
          code.consoleId === consoleID
      );
    }
    if (searchTerm) {
      return codes.filter((code: CheatCode) =>
        code.gameTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (consoleID) {
      return codes.filter((code: CheatCode) => code.consoleId === consoleID);
    }
    return codes;
  };

  const filteredCodes = filterCodes(usersCodes, userSearch, consoleFilter);

  return (
    <UserCodesContext.Provider
      value={{
        fetchCodes,
        usersCodes: filteredCodes,
        setUsersCodes,
        handleDelete,
        userSearch,
        setUserSearch,
        consoleFilter,
        setConsoleFilter,
      }}
    >
      {children}
    </UserCodesContext.Provider>
  );
};

export const useUserCodesProvider = () => useContext(UserCodesContext);
