'use client';
import { IUser } from '@/types/next-auth';
import { Box, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { userRequestApi } from '@/requestApi/user/user';
import { red } from '@mui/material/colors';
import ModelDialog from '../../dialog';
// import AddUser from './modelAdd.user';
import ModelAddUser from './modelAdd.user';
import { toast } from 'react-toastify';

interface Column {
  id: 'id' | 'name' | 'email' | 'role' | 'createdAt' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'STT', minWidth: 80 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 180 },
  {
    id: 'role',
    label: 'Role',
    minWidth: 80,
    // align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 170,
    // align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'actions',
    label: 'actions',
    minWidth: 170,
    // align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
];

interface IProps {
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

const AdminTableUser = ({ data }: { data: IProps }) => {
  // console.log('data user',data.data.result)
  // const { data } = props;

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const users = data?.data?.result;

  const handleDelete = async (id: string) => {
    // console.log('ok', id);

    setSelectedUserId(id);
    setOpen(true);

    // <ModelEditUser isModelOpen={open} setModelOpen={setOpen}></ModelEditUser>;
  };
  const handleSubmit = async (id: string, token: any) => {
    // console.log('ok', token);
    const res = await userRequestApi.deleteUser(id, token);
    // console.log('---->res---dellte:', res);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success('Xóa thành công');
    }

    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button variant="contained" onClick={() => setOpenCreate(true)}>
          Create User
        </Button>
      </Box>
      <Paper sx={{ minWidth: '60%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, index) => {
                const formattedDate = new Date(user.createdAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                });
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                    <TableCell key={user._id}>{index + 1}</TableCell>
                    <TableCell key={user._id}>{user.name}</TableCell>
                    <TableCell key={user._id}>{user.email}</TableCell>
                    <TableCell key={user._id}>{user.role}</TableCell>
                    <TableCell key={user._id}>{formattedDate}</TableCell>
                    <TableCell key={user._id}>
                      <Button
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                        sx={{ ':hover': { backgroundColor: 'transparent' } }}
                      >
                        <DeleteIcon sx={{ ':hover': { color: red[500] } }}></DeleteIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {open && selectedUserId && (
        <ModelDialog isModelOpen={open} setModelOpen={setOpen} id={selectedUserId} onSubmit={handleSubmit} />
      )}
      {openCreate && <ModelAddUser isModelOpen={openCreate} setModelOpen={setOpenCreate}></ModelAddUser>}
    </>
  );
};

export default AdminTableUser;
