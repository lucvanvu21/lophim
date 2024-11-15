import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { userRequestApi } from '@/requestApi/user/user';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface IFormInput {
  email: string;
  name: string;
  password: string;
}
const ModelAddUser = (props: any) => {
  const { data: session } = useSession();
  const { isModelOpen, setModelOpen } = props;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const handleClose = () => setModelOpen(false);

  const handleAddUser = async (datauser: IFormInput, token: any) => {
    const res = await userRequestApi.addUser(datauser, token);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      reset();
      setModelOpen(false);
    }
  };
  return (
    <div>
      <Modal
        open={isModelOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: '20px' }}>
            Thêm User
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onSubmit={handleSubmit(data => handleAddUser(data, session?.access_token))}
          >
            <TextField sx={{ width: '100%', marginY: '10px' }} {...register('email', { required: true })} label="Email" />
            <TextField sx={{ width: '100%', marginY: '10px' }} {...register('name', { required: true })} label="Name" />
            <TextField
              sx={{ width: '100%', marginY: '10px' }}
              {...register('password', { required: true })}
              label="Password"
              type="password"
            />
            <Button
              variant="outlined"
              type="submit"
              sx={{
                marginTop: '20px',
                width: '50%',
              }}
            >
              Tạo mới
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModelAddUser;
