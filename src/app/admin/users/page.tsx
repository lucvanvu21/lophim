import AdminTableUser from '@/components/admin/user/table.user';
import { userRequestApi } from '@/requestApi/user/user';
import { IUser } from '@/types/next-auth';
import React from 'react';

interface IDataUser {
  statusCode: number;
  message: string;

  data: {
    meta: {
      total: number;
      currentPage: number;
      totalPages: number;
    };
    result: IUser[];
  };
}

const AdminUser = async () => {

  const res: IDataUser = await userRequestApi.getAllUsers();

  return (
    <>
      <AdminTableUser data={res} />
    </>
  );
};

export default AdminUser;
